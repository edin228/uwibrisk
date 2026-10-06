// @ts-check
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://uwibrisk.com',
  // Static-first: every route is prerendered unless it opts out with
  // `export const prerender = false` (only the form API routes will).
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
});
