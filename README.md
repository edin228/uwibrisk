# uwibrisk.com (Astro)

Static-first Astro site for UWIB Risk & Insurance Solutions. Content lives in this repo
(migrated from Hygraph); only the form API routes render on demand (`@astrojs/node`, standalone).

```bash
npm install
npm run dev              # local dev server
npm run build            # astro check + astro build -> dist/
npm start                # run the built standalone server
npm run export:hygraph   # re-export content from Hygraph (read-only; needs .env, see .env.example)
```

- Content collections: `src/content.config.ts` (blog, team, pages, data collections in `src/data/`).
- Design tokens: `src/styles/tokens.css`.
- Migration notes: `docs/migration-report.md`.

## Search

`npm run build` runs [Pagefind](https://pagefind.app) after `astro build` to index `dist/client`;
`/search` uses the Pagefind UI. Only pages rendered with `searchable` on `BaseLayout`
(`data-pagefind-body`) are indexed; form/embed pages are excluded.

## Form submissions (`POST /api/submit`)

The only on-demand route. Same request contract as the old Next.js API: a JSON body
`{ id, ...fields, Source }` (sent as text, no Content-Type needed), honeypot field `website`
(returns 204), 32 KB body limit, max 50 fields, field names <= 100 chars, values <= 5,000 chars.
Each submission is emailed through [Resend](https://resend.com); there is no other storage, so a
failed email returns `502` and the visitor is asked to retry.

Environment variables (runtime, on the Node server):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key |
| `FORM_FROM_EMAIL` | yes | Sender, e.g. `web@uwib.com` or `UWIB Website <web@uwib.com>` |
| `FORM_NOTIFICATION_TO` | yes | Comma-separated default recipients (sources in `SOURCE_RECIPIENTS` go to their own contact) |
| `RESEND_API_URL` | no | Override the Resend endpoint (local testing with a mock server only) |
| `PORT`, `HOST` | no | Standalone server address (defaults 4321 / localhost) |

Astro rejects cross-site form POSTs (`security.checkOrigin`): requests must come from the
site's own origin. Behind a proxy, make sure the forwarded host matches the public domain.

## Content rules

See `docs/copy-guidelines.md`. Alt text for every image lives in `src/data/alt-text.json`
(review list: `docs/alt-text-review.md`). Owner decisions that change Hygraph content
(redirects, dropped posts, link fixes) live in `scripts/export-config.mjs` so they survive
re-exports.
