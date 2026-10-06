/** Coverage pages: published entries, group labels and link resolution. */
import { getCollection, type CollectionEntry } from 'astro:content';

export type CoverageGroup = CollectionEntry<'coverage'>['data']['group'];

/** Group labels and the /coverage section ids (the footer links to #business and #home). */
export const coverageGroups: Record<CoverageGroup, { label: string; anchor: string }> = {
  business: { label: 'Business', anchor: 'business' },
  home: { label: 'Home & family', anchor: 'home' },
  benefits: { label: 'Employee benefits', anchor: 'benefits' },
};

/** Coverage entries that get a page: everything but drafts (drafts are previewable in dev). */
export function getPublishedCoverage(): Promise<CollectionEntry<'coverage'>[]> {
  return getCollection('coverage', ({ data }) => import.meta.env.DEV || !data.draft);
}

export const coverageHref = (id: string) => `/coverage/${id}`;

export interface CoverageLink {
  /** Coverage entry id; links there when it is published. */
  coverage?: string | undefined;
  /** Existing page used until that coverage page is published. */
  fallbackHref: string;
}

/** Link to the coverage page when it is published, otherwise to the fallback page. */
export function resolveCoverageLink(link: CoverageLink, published: ReadonlySet<string>): string {
  return link.coverage && published.has(link.coverage) ? coverageHref(link.coverage) : link.fallbackHref;
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
