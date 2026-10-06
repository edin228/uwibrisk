/**
 * Coverage page visibility. The only place that decides whether a coverage entry
 * gets a route, hub link, gap-card link and sitemap entry.
 *
 * Drafts (`draft: true`) are shown in `astro dev`, or in a build run with
 * SHOW_DRAFTS=true (preview deployments, read at build time). A shown draft
 * renders a "Draft, not published" ribbon and is noindex. Every other build
 * leaves drafts out, so links to them use their fallbackHref.
 */
import type { CollectionEntry } from 'astro:content';

/** True in dev, or when the build runs with SHOW_DRAFTS=true. */
export const showDrafts: boolean = import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';

/** Whether a coverage entry is part of this build. */
export function isVisible(entry: CollectionEntry<'coverage'>): boolean {
  return !entry.data.draft || showDrafts;
}
