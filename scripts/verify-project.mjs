import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const root=process.cwd();
const stories=JSON.parse(fs.readFileSync('lib/stories.json','utf8'));
for(const s of stories){const original=fs.readFileSync(path.join('originals',s.filename));assert.equal(createHash('sha256').update(original).digest('hex'),s.sha256);assert.deepEqual(fs.readFileSync(`public/originals/${s.slug}.txt`),original);assert.equal(s.text,original.toString('utf8'));}
function dbAdapter(sqlite){return{prepare(sql){let args=[];const stmt={bind(...a){args=a;return stmt},async first(){return sqlite.prepare(sql).get(...args)??null},async all(){return{results:sqlite.prepare(sql).all(...args)}},async run(){const r=sqlite.prepare(sql).run(...args);return{success:true,meta:{changes:Number(r.changes)}}}};return stmt},async batch(stmts){sqlite.exec('BEGIN');try{const r=await Promise.all(stmts.map(s=>s.run()));sqlite.exec('COMMIT');return r}catch(e){sqlite.exec('ROLLBACK');throw e}}};}
const sqlite=new DatabaseSync(':memory:');for(const f of fs.readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sqlite.exec(fs.readFileSync(path.join('drizzle',f),'utf8'));
globalThis.TEST_ENV={env:{DB:dbAdapter(sqlite),OWNER_EMAIL:'host@example.test',RATE_LIMIT_SALT:'local-test-only-salt'}};
async function load(file,replacements={}){let source=fs.readFileSync(file,'utf8');for(const [from,to] of Object.entries(replacements))source=source.replace(from,to);const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.React}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));}
const box=await load('lib/mailbox.ts',{'import { env } from "cloudflare:workers";':'const {env}=globalThis.TEST_ENV;'});globalThis.TEST_BOX=box;
const replacement={'import { database, senderKey, boundedBody } from "../../../lib/mailbox";':'const {database,senderKey,boundedBody}=globalThis.TEST_BOX;'};
const notes=await load('app/api/notes/route.ts',replacement);
function request(body,ip='127.0.0.1',extra={}){return new Request('https://room.test/api/notes',{method:'POST',headers:{'content-type':'application/json','cf-connecting-ip':ip,...extra},body:JSON.stringify(body)});}
let r=await notes.POST(request({message:'<script>not executable</script>',story:'boat',client_message_id:'first'}));assert.equal(r.status,201);const receipt=await r.json();assert.equal(sqlite.prepare('SELECT message FROM notes WHERE id=?').get(receipt.id).message,'<script>not executable</script>');
r=await notes.POST(request({message:'same',client_message_id:'first'}));assert.equal(r.status,200);assert.equal((await r.json()).id,receipt.id);assert.equal(sqlite.prepare('SELECT count(*) AS n FROM notes').get().n,1);
for(let i=0;i<2;i++)assert.equal((await notes.POST(request({message:'next note'}))).status,201);
assert.equal((await notes.POST(request({message:'over limit'}))).status,429);
assert.equal((await notes.POST(request({message:'cross site'},'other',{origin:'https://other.test'}))).status,403);
assert.equal((await notes.POST(request({message:'x'.repeat(8001)},'other'))).status,400);
assert.equal((await notes.POST(request({message:42},'other'))).status,400);
assert.equal((await notes.POST(request({message:'x'.repeat(33000)},'other'))).status,413);
assert.equal((await notes.GET()).status,405);
const form=await notes.POST(new Request('https://room.test/api/notes',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded','origin':'https://room.test','cf-connecting-ip':'form'},body:new URLSearchParams({message:'A form note.'})}));assert.equal(form.status,303);
const inbox=await load('app/api/inbox/route.ts',{'import { database,isOwnerHeaders,boundedBody } from "../../../lib/mailbox";':'const {database,isOwnerHeaders,boundedBody}=globalThis.TEST_BOX;'});
assert.equal((await inbox.GET(new Request('https://room.test/api/inbox'))).status,403);
const owner={'oai-authenticated-user-id':'test-owner','oai-authenticated-user-email':'host@example.test'};
assert.equal((await inbox.GET(new Request('https://room.test/api/inbox',{headers:{...owner,'oai-authenticated-user-email':'stranger@example.test'}}))).status,403);
assert.equal((await inbox.GET(new Request('https://room.test/api/inbox',{headers:owner}))).status,200);
const mark=()=>new Request('https://room.test/api/inbox',{method:'POST',headers:{...owner,origin:'https://room.test','content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({id:receipt.id,action:'read'})});assert.equal((await inbox.POST(mark())).status,303);assert.equal(sqlite.prepare('SELECT is_read FROM notes WHERE id=?').get(receipt.id).is_read,1);
const mcp=await load('app/mcp/route.ts',{'import { database,isOwnerHeaders,boundedBody } from "../../lib/mailbox";':'const {database,isOwnerHeaders,boundedBody}=globalThis.TEST_BOX;'});
const rpc=(name,args={},h={})=>new Request('https://room.test/mcp',{method:'POST',headers:{'content-type':'application/json',...h},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})});
assert.equal((await (await mcp.POST(rpc('list_unannounced_notes'))).json()).result.isError,true);
const pending=(await (await mcp.POST(rpc('list_unannounced_notes',{},owner))).json()).result;const listed=JSON.parse(pending.content[0].text).notes;assert.equal(listed.length,4);assert.equal(listed.some(n=>'message' in n||'reply_to' in n),false);
await mcp.POST(rpc('acknowledge_note_alerts',{ids:listed.map(n=>n.id)},owner));assert.equal(sqlite.prepare('SELECT count(*) AS n FROM notes WHERE alerted_at IS NULL').get().n,0);
assert.equal((await (await mcp.POST(rpc('list_unannounced_notes',{},owner))).json()).result.isError,undefined);
globalThis.TEST_STORIES=stories;
const reactUrl=pathToFileURL(path.join(root,'node_modules/react/index.js')).href;
const story=await load('app/read/[slug]/page.tsx',{'import { notFound } from "next/navigation";':'const notFound=()=>{throw Error("404")};', 'import { Shell, stories } from "../../../lib/site";':`import React from ${JSON.stringify(reactUrl)};const stories=globalThis.TEST_STORIES;const Shell=({children})=>React.createElement('main',null,children);`});
const unescape=s=>s.replace(/&(?:amp|lt|gt|quot|#x27);/g,v=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#x27;':"'"}[v]));
for(const s of stories){const html=renderToStaticMarkup(await story.default({params:Promise.resolve({slug:s.slug})}));const match=html.match(/<pre[^>]*data-original="[^"]*"[^>]*>([\s\S]*?)<\/pre>/);assert.ok(match);assert.equal(unescape(match[1]),s.text);}
await assert.rejects(()=>story.default({params:Promise.resolve({slug:'missing'})}));
sqlite.close();console.log('PASS: original bytes, rendered texts, durable inserts, retries, bounds, rate limits, form submission, owner authorization, unread state, private notification metadata, and alert acknowledgement.');
