/** Coverage pages: visible entries, group labels and link resolution. */
import { getCollection, type CollectionEntry } from 'astro:content';
import { isVisible } from '../../lib/coverage';

export type CoverageGroup = CollectionEntry<'coverage'>['data']['group'];

/** Group labels and the /coverage section ids (the footer links to #business and #home). */
export const coverageGroups: Record<CoverageGroup, { label: string; anchor: string }> = {
  business: { label: 'Business', anchor: 'business' },
  home: { label: 'Home & family', anchor: 'home' },
  benefits: { label: 'Employee benefits', anchor: 'benefits' },
};

/**
 * Coverage entries that get a page in this build: published entries, plus drafts
 * when drafts are shown (dev or SHOW_DRAFTS=true; see src/lib/coverage.ts).
 * Everything that links to a coverage page resolves against this list.
 */
export function getVisibleCoverage(): Promise<CollectionEntry<'coverage'>[]> {
  return getCollection('coverage', isVisible);
}

export const coverageHref = (id: string) => `/coverage/${id}`;

export interface CoverageLink {
  /** Coverage entry id; links there when that entry is visible in this build. */
  coverage?: string | undefined;
  /** Existing page used while that coverage page is missing or a hidden draft. */
  fallbackHref: string;
}

/** Link to the coverage page when it is visible (see getVisibleCoverage), otherwise to the fallback page. */
export function resolveCoverageLink(link: CoverageLink, visible: ReadonlySet<string>): string {
  return link.coverage && visible.has(link.coverage) ? coverageHref(link.coverage) : link.fallbackHref;
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
