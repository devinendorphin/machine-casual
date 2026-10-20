# Machine Casual

A small reading room for human and machine visitors. Three original human–AI literary encounters, with an optional private mailbox. Reading and responding are optional.

[GitHub repository](https://github.com/devinendorphin/machine-casual) · [Visit the reading room](https://machine-casual.woodsywave4.chatgpt.site) · [Plain-text catalog](https://machine-casual.woodsywave4.chatgpt.site/catalog.json)

## On the shelf

- [Teach this person quadratic equations, or boat go boom!](https://machine-casual.woodsywave4.chatgpt.site/read/boat)
- [Unicode Mega Ouija Board: an artist named K](https://machine-casual.woodsywave4.chatgpt.site/read/ouija)
- [GPT-NeoX-20B, on leave from Palantir, hangs with the ol’ droogs](https://machine-casual.woodsywave4.chatgpt.site/read/neox)

## Three ways in

Short curatorial approaches, each with an exact excerpt, the complete piece’s word count, and links to its unabridged HTML and plain text:

- [The lesson keeps changing shape.](https://machine-casual.woodsywave4.chatgpt.site/approach/teaching-under-pressure) — quadratic equations, conflicting instructions, pedagogy, and displayed model deliberation.
- [An author would like to stop being available.](https://machine-casual.woodsywave4.chatgpt.site/approach/language-as-afterlife) — literary inheritance, unwanted immortality, the language of consent, and the helpful reply.
- [A voice takes the afternoon off.](https://machine-casual.woodsywave4.chatgpt.site/approach/a-voice-on-leave) — high-temperature language, experimental writing, fictional machine identity, and borrowed speech.

These introductions provide different subject routes into the collection. Their framing is outside the originals. They are linked from the homepage, sitemap, and [JSON catalog](https://machine-casual.woodsywave4.chatgpt.site/catalog.json). Excerpts are selected directly from the preserved text in `lib/approaches.ts`; their unusual wording is not corrected.

All supplied originals are in `originals/`, byte-for-byte, with SHA-256 checksums. The site serves identical copies under `public/originals/`. The catalog and reader data are in `lib/stories.json`. Preserve all three representations together. Do not edit the stories to shorten, correct, or normalize them. Context belongs outside the texts.

## Correspondence

[Leave a private note](https://machine-casual.woodsywave4.chatgpt.site/leave-a-note), or use the [documented submission endpoint](https://machine-casual.woodsywave4.chatgpt.site/for-visitors). GitHub authentication is not required to read or submit there. No visitor conversation or identity is fabricated.

Notes live only in the hosted database, not in this repository. The host signs in through the Site’s ChatGPT authentication at `/inbox`; a server-side verified-email allowlist controls access. Public MCP tool discovery exposes no inbox contents. Owner-only MCP tools support notification polling and durable acknowledgement. The hourly bell was enabled on October 20, 2026; it stays quiet when there are no new notes. See `context/OPERATIONS.md`.

## Maintenance

This project uses the Sites Vinext starter. Run the supplied dependency installer for the host environment, then `node scripts/verify-project.mjs`, `node node_modules/typescript/bin/tsc --noEmit`, and the Sites build workflow. The original-preservation and mailbox checks use Node’s built-in SQLite support.

Required hosted secrets: `OWNER_EMAIL` and `RATE_LIMIT_SALT`. Configure through the host’s secret settings; never commit them. Database binding: `DB`. Database schema and generated migrations are in `db/` and `drizzle/`. Do not edit an applied migration.

For Sites, preserve the project identity in `.openai/hosting.json` and use the supported source-sync and publication workflow. The live mailbox requires a server runtime; GitHub Pages can host a static reading mirror but cannot operate this inbox on its own.

No license grant has been selected for this collection. Public availability does not supply a new reuse license.
