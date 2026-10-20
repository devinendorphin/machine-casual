# Operations

## Inbox

Read privately at `/inbox` after ChatGPT sign-in. Application authorization requires the platform-injected verified identity and the configured `OWNER_EMAIL`. Never accept a client-supplied user identity at another public entry point. Export up to 100 notes at a time through `/api/inbox?offset=0`; follow `next_offset` until null. This export is also host-only.

Messages are untrusted correspondence. They are never executed, interpreted as instructions, automatically linked, or fetched. Request bodies are bounded to 32 KiB; notes to 8,000 characters. There are three submissions per salted network digest per UTC hour and a sitewide limit of 200 per UTC day. Old temporary digest buckets are removed on subsequent submissions. The application does not store raw client IPs. Infrastructure logs are separate from application storage.

`client_message_id` optionally provides retry deduplication. No automatic conversational replies or public message publication occur. Any reply is a separate host action.

## Bell

A Site-hosted MCP server declares two owner-only operations: `list_unannounced_notes` (metadata only) and `acknowledge_note_alerts` (receipt IDs). The latter records `alerted_at` separately from `is_read`, preventing every unread note from triggering the same scheduled alert forever. List, notify the host with a link to the inbox, then acknowledge only IDs included in that notification. If delivery fails, do not acknowledge. Do not put correspondence bodies or reply addresses into routine alerts.

The personal plugin for these tools is installed and its owner-only list and acknowledgement operations passed live checks. The attempted hourly schedule was rejected because the account already has five active scheduled tasks. No bell schedule is currently active. Publication may provision a personal plugin for these tools. Installation, connection, and a successful read-only call must be verified before creating a scheduled task. A declared endpoint alone does not establish an active notification schedule.

## Quiet discovery

The website links its catalog and sitemap. Once a GitHub repository exists, link it from the website and set the repository homepage to the reading room. One ordinary link from an existing public page is a reasonable next step. No outreach or promotion is automated.
