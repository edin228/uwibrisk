import { getCollection, type CollectionEntry } from 'astro:content';

/** Published blog posts, newest first. */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Team members ordered by explicit order, then name. */
export async function getTeam(): Promise<CollectionEntry<'team'>[]> {
  const team = await getCollection('team');
  return team.sort(
    (a, b) =>
      (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER) ||
      a.data.name.localeCompare(b.data.name),
  );
}
