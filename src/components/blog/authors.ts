import { getCollection, type CollectionEntry } from 'astro:content';

export type Author = CollectionEntry<'team'>;

/** All team members keyed by id, for resolving blog `author` references in bulk. */
export async function getAuthorMap(): Promise<Map<string, Author>> {
  const team = await getCollection('team');
  return new Map(team.map((m) => [m.id, m]));
}

/** Team page URL for an author, or undefined when they have no page. */
export function authorHref(author: Author): string | undefined {
  return author.data.hasTeamPage ? `/team/${author.id}` : undefined;
}
