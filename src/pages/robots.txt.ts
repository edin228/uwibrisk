import type { APIRoute } from 'astro';

/** Preview deployments (PREVIEW=true at build time) block all crawlers. */
export const GET: APIRoute = ({ site }) => {
  const body =
    process.env.PREVIEW === 'true'
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
