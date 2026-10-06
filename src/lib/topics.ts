/**
 * Blog topics. Hygraph only had one category ("Education"), so topics are derived
 * from post titles. Override a post with TOPIC_OVERRIDES when the rule gets it wrong.
 */
import type { CollectionEntry } from 'astro:content';

export const TOPICS = ['Business', 'Cyber', 'Home', 'Auto', 'Workers’ comp', 'Benefits', 'Market'] as const;
export type Topic = (typeof TOPICS)[number];

const RULES: [Topic, RegExp][] = [
  ['Cyber', /cyber|\bdata\b|kidnapping|froze my credit|wire fraud/i],
  ['Workers’ comp', /workers[’']? ?comp/i],
  ['Benefits', /benefit|labor shortage|\bhr\b|key person/i],
  ['Auto', /\bauto\b|vehicle|\bcars?\b|driver|rideshare|towing|drone/i],
  [
    'Home',
    /\bhomes?\b|homeowner|house|condo|umbrella|jewelry|living expense|wildfire|high net worth|natural disaster|household|millennials|luxury/i,
  ],
  ['Market', /hard market|state farm|major carrier|renewal mistakes|2030 insurance agency|what we're seeing/i],
];

const TOPIC_OVERRIDES: Record<string, Topic> = {};

export function topicFor(post: CollectionEntry<'blog'>): Topic {
  const override = TOPIC_OVERRIDES[post.id];
  if (override) return override;
  return RULES.find(([, re]) => re.test(post.data.title))?.[0] ?? 'Business';
}

/** Short date used on cards: "Sep 2, 2026". */
export function shortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
