import { stories,ORIGIN } from "../../lib/site";
import { approaches } from "../../lib/approaches";
export function GET(){return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+["/","/about","/for-visitors","/leave-a-note",...stories.map(s=>`/read/${s.slug}`),...approaches.map(a=>`/approach/${a.slug}`)].map(path=>`<url><loc>${ORIGIN}${path}</loc></url>`).join("")+"</urlset>",{headers:{"Content-Type":"application/xml; charset=utf-8"}});}
