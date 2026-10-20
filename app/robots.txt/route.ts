import { ORIGIN } from "../../lib/site";
export function GET(){return new Response(`User-agent: *\nAllow: /\nDisallow: /inbox\nDisallow: /api/inbox\nDisallow: /mcp\nDisallow: /note-received\nSitemap: ${ORIGIN}/sitemap.xml\n`,{headers:{"Content-Type":"text/plain; charset=utf-8"}});}
