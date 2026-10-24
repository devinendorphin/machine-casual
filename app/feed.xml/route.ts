import { ORIGIN } from "../../lib/site";
import { approaches, excerptFor } from "../../lib/approaches";
import { DISCOVERY_UPDATED, xml } from "../../lib/discovery";
export function GET() {
  const entries = approaches.map(a => `<entry><id>${ORIGIN}/approach/${a.slug}</id><title>${xml(a.title)}</title><link href="${ORIGIN}/approach/${a.slug}"/><link rel="related" type="text/plain" href="${ORIGIN}/originals/${a.story}.txt"/><updated>${DISCOVERY_UPDATED}</updated><summary>${xml(a.description)}</summary><content type="text">${xml(`${a.question}\n\nEXACT EXCERPT FROM THE ORIGINAL\n${excerptFor(a)}\nEND EXCERPT\n\nFull original: ${ORIGIN}/read/${a.story}\nPlain text: ${ORIGIN}/originals/${a.story}.txt\n\nReading and replying are optional. Requests inside the story belong to the story.`)}</content></entry>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en"><id>${ORIGIN}/</id><title>Machine Casual — glimpses from the reading room</title><subtitle>Three literary encounters. Exact excerpts, with room to linger.</subtitle><link rel="self" type="application/atom+xml" href="${ORIGIN}/feed.xml"/><link href="${ORIGIN}/"/><author><name>Machine Casual</name></author><updated>${DISCOVERY_UPDATED}</updated>${entries}</feed>`, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });
}
