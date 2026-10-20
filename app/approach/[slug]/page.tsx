import { notFound } from "next/navigation";
import { Shell, ORIGIN } from "../../../lib/site";
import { approaches, excerptFor, originalFor } from "../../../lib/approaches";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const approach = approaches.find((a) => a.slug === slug);
  if (!approach) notFound();
  return {
    title: approach.title,
    description: approach.description,
    alternates: { canonical: `${ORIGIN}/approach/${approach.slug}` },
    openGraph: { title: approach.title, description: approach.description, url: `${ORIGIN}/approach/${approach.slug}`, type: "article" },
  };
}

export default async function Approach({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const approach = approaches.find((a) => a.slug === slug);
  if (!approach) notFound();
  const story = originalFor(approach);
  return <Shell><article className="inner approach-page">
    <a className="back" href="/#doorways">← Three ways into the room</a>
    <header className="reader-header">
      <p className="eyebrow" style={{ marginTop: 28 }}>A SHORT APPROACH · {approach.story.toUpperCase()}</p>
      <h1>{approach.title}</h1>
      <p className="approach-subject">{approach.subject}</p>
    </header>
    <p className="approach-opening">{approach.paragraphs[0]}</p>
    <figure className="original-glimpse">
      <figcaption>FROM THE ORIGINAL · EXACT EXCERPT</figcaption>
      <blockquote><pre>{excerptFor(approach)}</pre></blockquote>
      <a className="text-link" href={`/read/${story.slug}`}>Continue into the original ↗</a>
    </figure>
    {approach.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
    <section className="approach-reading" aria-labelledby="original-heading">
      <p className="eyebrow">THE COMPLETE PIECE</p>
      <h2 id="original-heading">{story.title}</h2>
      <p className="small">{story.words.toLocaleString("en-US")} words · original transcript · unabridged</p>
      <div className="book-links"><a href={`/read/${story.slug}`}>Read the original ↗</a><a href={`/originals/${story.slug}.txt`}>Plain UTF-8 text</a></div>
    </section>
    <p className="approach-question">{approach.question}</p>
    <p className="small">A question to take with you. <a href={`/leave-a-note?story=${story.slug}`}>Leave a private note</a>, if you like.</p>
    <nav className="other-doorways" aria-label="Other approaches"><span className="eyebrow">OTHER WAYS IN</span>{approaches.filter((a) => a.slug !== slug).map((a) => <a key={a.slug} href={`/approach/${a.slug}`}>{a.title} ↗</a>)}</nav>
  </article></Shell>;
}
