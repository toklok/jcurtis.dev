import path from 'path';
import { fileURLToPath } from 'url';
import { astroImageTools } from "astro-imagetools";
import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check


// https://astro.build/config
export default defineConfig( /** @type {import('astro').AstroUserConfig} */{
  // Comment out "renderers: []" to enable Astro's default component support.
  site: 'https://jcurtis.dev/',
  sitemap: true,
  integrations: [lit(), astroImageTools]
});