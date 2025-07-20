// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://team10989.org',
  prefetch: true,

  vite: {
      plugins: [tailwindcss(), sitemap()],
    },

  integrations: [partytown()],
  adapter: vercel(),
});