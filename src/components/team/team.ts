/** Helpers for the team listing, bio pages and contact cards. */
import type { CollectionEntry } from 'astro:content';

type Member = CollectionEntry<'team'>;
type Category = Member['data']['category'];

/** Listing groups in display order (as in the "Team — Desktop" mockup). */
export const TEAM_GROUPS: { id: string; label: string; categories: Category[] }[] = [
  { id: 'leadership', label: 'Leadership', categories: ['Management'] },
  { id: 'account-executives', label: 'Account executives', categories: ['Sales'] },
  { id: 'client-service', label: 'Client service', categories: ['Service'] },
  { id: 'operations', label: 'Operations', categories: ['AccountingOperationsManagement', 'Operations'] },
];

/**
 * Split members (already in getTeam() order) into the listing groups. Within a
 * group, members keep category order first (so Operations lists agency operations
 * before the rest), then team order. Empty groups are dropped.
 */
export function groupTeam(members: Member[]) {
  return TEAM_GROUPS.map((group) => ({
    ...group,
    members: group.categories.flatMap((c) => members.filter((m) => m.data.category === c)),
  })).filter((g) => g.members.length > 0);
}

export const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? name;

/** "208-600-6229" / " 626-204-6989" -> "(208) 600-6229". Leaves other formats alone. */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return digits.length === 10 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}` : phone.trim();
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${digits}`;
}

/** First sentence of a paragraph (used for the short lead on bio pages). */
export function firstSentence(text: string): string {
  return text.trim().split(/(?<=[.!?])\s+(?=[A-Z“"])/)[0] ?? text;
}

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/** Spell out 0-99 ("eighteen", "twenty-four"); larger numbers stay as digits. */
export function numberWord(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 99) return String(n);
  if (n < 20) return WORDS[n] ?? String(n);
  const tens = TENS[Math.floor(n / 10)] ?? '';
  return n % 10 ? `${tens}-${WORDS[n % 10]}` : tens;
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "A, B and C" */
export function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

/** Typographic apostrophes for display ("Coeur d'Alene" -> "Coeur d’Alene"). */
export const curly = (s: string) => s.replace(/'/g, '’');
