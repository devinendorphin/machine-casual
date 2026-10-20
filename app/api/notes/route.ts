import { database, senderKey, boundedBody } from "../../../lib/mailbox";
export const dynamic="force-dynamic";
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function GET(){return json({endpoint:"POST /api/notes",documentation:"/for-visitors",privacy:"Notes go privately to the host."},405);}
export async function POST(request:Request){
 const type=request.headers.get("content-type")||"";const wantsJson=type.includes("application/json");
 const fail=(message:string,status:number)=>wantsJson?json({error:message},status):new Response(`<!doctype html><meta name="viewport" content="width=device-width"><title>Note not sent</title><main style="max-width:650px;margin:60px auto;padding:25px;font:18px/1.7 Georgia;background:#f7f2e8"><h1>Note not sent.</h1><p>${message}</p><a href="/leave-a-note">Return to the note form</a></main>`,{status,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}});
 if(!wantsJson&&!type.includes("application/x-www-form-urlencoded"))return fail("Use JSON or the note form.",415);
 const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return fail("Please submit from this site or through the documented API.",403);
 let body:Record<string,unknown>;try{const raw=await boundedBody(request);body=wantsJson?JSON.parse(raw):Object.fromEntries(new URLSearchParams(raw));if(!body||Array.isArray(body)||typeof body!=="object")throw Error();}catch(e){return fail(e instanceof Error&&e.message==="too_large"?"The note is too large.":"The submission could not be read.",e instanceof Error&&e.message==="too_large"?413:400);}
 if(body.website)return fail("Please leave the website field empty.",400);
 for(const k of ["message","name","reply_to","story","client_message_id"]){if(body[k]!==undefined&&typeof body[k]!=="string")return fail("Fields must be text.",400);}
 const message=(body.message as string||"").trim();const name=(body.name as string||"").trim();const reply=(body.reply_to as string||"").trim();const story=body.story as string||"";const client=body.client_message_id as string||null;
 if(!message||message.length>8000||name.length>120||reply.length>300||!["","boat","ouija","neox"].includes(story)||(client&&!/^[A-Za-z0-9_.:-]{1,80}$/.test(client)))return fail("Check the field lengths and story selection. A note must contain 1–8,000 characters.",400);
 try{const db=database();const now=Date.now();const hour=Math.floor(now/3600000);const day=Math.floor(now/86400000);const key=await senderKey(request.headers.get("cf-connecting-ip")||"unavailable",hour);
  if(client){const prior=await db.prepare("SELECT id FROM notes WHERE client_id = ?").bind(client).first<{id:string}>();if(prior)return json({received:true,id:prior.id,retry:true});}
  await db.prepare("DELETE FROM rate_limits WHERE bucket < ?").bind(hour-24).run();
  const gate=await db.prepare("INSERT INTO rate_limits (key,bucket,count) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count < 3 RETURNING count").bind(key,hour).first();
  if(!gate)return fail("This connection has reached the hourly note limit. Please try again later.",429);
  const global=await db.prepare("INSERT INTO rate_limits (key,bucket,count) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count < 200 RETURNING count").bind(`global:${day}`,hour).first();
  if(!global)return fail("The mailbox is taking a pause. Please try again tomorrow.",429);
  const id=crypto.randomUUID();await db.prepare("INSERT INTO notes (id,created_at,message,name,reply_to,story,is_read,client_id) VALUES (?, ?, ?, ?, ?, ?, 0, ?)").bind(id,now,message,name,reply,story,client).run();
  if(wantsJson)return json({received:true,id},201);return new Response(null,{status:303,headers:{Location:`/note-received?receipt=${id}`,"Cache-Control":"no-store"}});
 }catch{return fail("The mailbox is temporarily unavailable. Your note has not been confirmed; please try again later.",503);}
}
