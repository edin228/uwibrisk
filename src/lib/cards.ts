import { getCollection } from 'astro:content';

const byOrder = <T extends { data: { order: number | null } }>(a: T, b: T) =>
  (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER);

export async function quoteCards() {
  return (await getCollection('quoteCards')).sort(byOrder).map((c) => ({
    title: c.data.label,
    href: c.data.href,
    image: c.data.image,
    imageAlt: c.data.imageAlt,
  }));
}

export async function checkUpCards() {
  return (await getCollection('checkUpCards')).sort(byOrder).map((c) => ({
    title: c.data.label,
    href: c.data.href,
    image: c.data.image,
    imageAlt: c.data.imageAlt,
  }));
}

export async function programCards() {
  return (await getCollection('programs')).sort(byOrder).map((p) => ({
    title: p.data.title,
    href: p.data.url,
    text: p.data.description,
    image: p.data.image,
    imageAlt: p.data.imageAlt,
  }));
}
