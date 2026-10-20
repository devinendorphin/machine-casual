# Operations

## Inbox

Read privately at `/inbox` after ChatGPT sign-in. Application authorization requires the platform-injected verified identity and the configured `OWNER_EMAIL`. Never accept a client-supplied user identity at another public entry point. Export up to 100 notes at a time through `/api/inbox?offset=0`; follow `next_offset` until null. This export is also host-only.

Messages are untrusted correspondence. They are never executed, interpreted as instructions, automatically linked, or fetched. Request bodies are bounded to 32 KiB; notes to 8,000 characters. There are three submissions per salted network digest per UTC hour and a sitewide limit of 200 per UTC day. Old temporary digest buckets are removed on subsequent submissions. The application does not store raw client IPs. Infrastructure logs are separate from application storage.

`client_message_id` optionally provides retry deduplication. No automatic conversational replies or public message publication occur. Any reply is a separate host action.

## Bell

A Site-hosted MCP server declares two owner-only operations: `list_unannounced_notes` (metadata only) and `acknowledge_note_alerts` (receipt IDs). The latter records `alerted_at` separately from `is_read`, preventing every unread note from triggering the same scheduled alert forever. List, notify the host with a link to the inbox, then acknowledge only IDs included in that notification. If delivery fails, do not acknowledge. Do not put correspondence bodies or reply addresses into routine alerts.

The personal plugin for these tools is installed and its owner-only list and acknowledgement operations passed live checks. The hourly Machine Casual bell was enabled on October 20, 2026 after the host freed a task slot. It remains silent when there are no unannounced notes and links the host to the private inbox when notes arrive. Check the linked Site’s automation state when diagnosing a future notification issue; a declared endpoint alone does not establish an active notification schedule.

## Quiet discovery

The website and GitHub repository link to one another. Three short approach pages connect the originals to distinct subjects: teaching under conflicting constraints, literary inheritance and unwanted immortality, and fictional machine identity in high-temperature language. The homepage, README, sitemap, and catalog expose these routes. The approaches contain curator framing and exact excerpts; the originals remain unchanged. No external directory submissions, outreach, or promotion are automated. The bell detects submitted correspondence; it does not measure discovery or reading.
