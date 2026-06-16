// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

import vercel from '@astrojs/vercel';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://team10989.org',
  prefetch: true,
  output: 'static',

  image: {
    service: passthroughImageService(),
  },

  vite: {
      plugins: [tailwindcss()],
    },

  integrations: [sitemap(), partytown(), compressor()],
  adapter: vercel({ imageService: false }),
});