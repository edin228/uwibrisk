/**
 * Blog topics. Hygraph only had one category ("Education"), so topics are derived
 * from post titles with RULES (first match wins, otherwise Business). Override a
 * post with TOPIC_OVERRIDES (keyed by post id) when the rules get it wrong.
 */
import type { CollectionEntry } from 'astro:content';

/** Topic chips on /blog, in display order. `name` is the short label printed on cards. */
export const TOPICS = [
  { slug: 'business', name: 'Business', label: 'Business' },
  { slug: 'home', name: 'Home', label: 'Home & family' },
  { slug: 'cyber', name: 'Cyber', label: 'Cyber' },
  { slug: 'workers-comp', name: 'Workers’ comp', label: 'Workers’ comp' },
  { slug: 'leadership', name: 'Leadership', label: 'Leadership' },
] as const;

export type TopicInfo = (typeof TOPICS)[number];
/** Short topic name shown on cards ("Home", "Cyber", ...). */
export type Topic = TopicInfo['name'];

const RULES: [Topic, RegExp][] = [
  // Culture, leadership and agency-of-the-future essays.
  [
    'Leadership',
    /strongest people|good leaders|internal barriers|technology serves people|2030 insurance agency|leveraging technology/i,
  ],
  ['Workers’ comp', /workers[’']? ?comp|safety committee/i],
  ['Cyber', /cyber|\bdata\b|froze my credit|wire fraud/i],
  // Personal lines: home, personal auto, umbrella, high net worth, disasters.
  [
    'Home',
    /\bhomes?\b|homeowner|house|condo|umbrella|jewelry|living expense|wildfire|natural disaster|disaster preparedness|household|millennials|luxury|high net worth|wealth manager|market value|state farm|major carrier|teen driver|collector car|electric vehicle|liability limits on auto|rideshare|new year, new coverage|start 2025 strong/i,
  ],
];

const TOPIC_OVERRIDES: Record<string, Topic> = {
  // A homeowner's fire story; the title doesn't say so.
  'reality-hit-and-i-was-caught-totally-off-guard': 'Home',
};

/** Full topic record (slug, chip label, short name) for a post. */
export function topicInfo(post: CollectionEntry<'blog'>): TopicInfo {
  const name = topicFor(post);
  return TOPICS.find((t) => t.name === name) ?? TOPICS[0];
}

/** Short topic name for a post ("Home", "Cyber", ...). */
export function topicFor(post: CollectionEntry<'blog'>): Topic {
  const override = TOPIC_OVERRIDES[post.id];
  if (override) return override;
  return RULES.find(([, re]) => re.test(post.data.title))?.[0] ?? 'Business';
}

/** Short date used on cards: "Sep 2, 2026". */
export function shortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
