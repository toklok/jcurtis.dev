import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap';

import preact from '@astrojs/preact';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
  output: 'static',
  site: 'https://jcurtis.dev/',
  integrations: [preact(), astroImageTools,sitemap()],
})
