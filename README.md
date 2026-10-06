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
