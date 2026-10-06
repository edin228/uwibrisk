/**
 * /team/<slug>.vcf: downloadable contact card (vCard 3.0) for the bio page's
 * "Download contact card" button. Only for members with a page and an email or phone.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { phoneHref } from '../../components/team/team';
import { company } from '../../data/site';
import { getTeam } from '../../lib/content';

export const getStaticPaths = (async () => {
  const team = await getTeam();
  return team
    .filter((m) => m.data.hasTeamPage && (m.data.email || m.data.phone))
    .map((member) => ({ params: { slug: member.id }, props: { member } }));
}) satisfies GetStaticPaths;

/** Escape vCard text values (RFC 6350 §3.4). */
const esc = (value: string) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

export const GET: APIRoute = ({ props, site }) => {
  const { data, id } = (props as { member: CollectionEntry<'team'> }).member;
  const parts = data.name.trim().split(/\s+/);
  const given = parts[0] ?? data.name;
  const family = parts.slice(1).join(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(family)};${esc(given)};;;`,
    `FN:${esc(data.name)}`,
    `ORG:${esc(company.name)}`,
    `TITLE:${esc(data.role)}`,
    data.email && `EMAIL;TYPE=INTERNET,WORK:${data.email}`,
    data.phone && `TEL;TYPE=WORK,VOICE:${phoneHref(data.phone).replace(/^tel:/, '')}`,
    `URL:${new URL(`/team/${id}`, site).href}`,
    'END:VCARD',
  ].filter(Boolean);
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${id}.vcf"`,
    },
  });
};
