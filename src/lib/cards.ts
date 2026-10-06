import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

export interface Card {
  title: string;
  href: string;
  text?: string | null | undefined;
  image?: ImageMetadata | undefined;
  imageAlt?: string | undefined;
}

const byOrder = <T extends { data: { order: number | null } }>(a: T, b: T) =>
  (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER);

/** True for links that leave the site. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Drops sentences that promise savings ("Gain up to 25% in premium credit.") from
 * migrated descriptions, per docs/copy-guidelines.md. The source data still has them
 * (see docs/migration-report.md, "Copy to revise").
 */
const COST_PROMISE = /premium credit|save money|savings of|lower (?:your )?premiums?|cut costs|reduce your costs/i;
export function withoutCostPromises(text: string | null | undefined): string | null {
  if (!text) return null;
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  return sentences.filter((s) => !COST_PROMISE.test(s)).join('').trim() || null;
}

export async function quoteCards(): Promise<Card[]> {
  return (await getCollection('quoteCards')).sort(byOrder).map((c) => ({
    title: c.data.label,
    href: c.data.href,
    image: c.data.image,
    imageAlt: c.data.imageAlt,
  }));
}

export async function checkUpCards(): Promise<Card[]> {
  return (await getCollection('checkUpCards')).sort(byOrder).map((c) => ({
    title: c.data.label,
    href: c.data.href,
    image: c.data.image,
    imageAlt: c.data.imageAlt,
  }));
}

/** Industry programs (src/data/programs.json), in CMS order then by title. */
export async function programCards(): Promise<Card[]> {
  return (await getCollection('programs'))
    .sort((a, b) => byOrder(a, b) || a.data.title.localeCompare(b.data.title))
    .map((p) => ({
      title: p.data.title,
      href: p.data.url,
      text: withoutCostPromises(p.data.description),
      image: p.data.image,
      imageAlt: p.data.imageAlt,
    }));
}
