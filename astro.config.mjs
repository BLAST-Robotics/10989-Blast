// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import vercel from '@astrojs/vercel';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://team10989.org',
  prefetch: false,
  output: 'static',

  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [sitemap(), partytown(), compressor()],
  adapter: vercel(),
});