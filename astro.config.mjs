import path from 'path';
import { imagetools } from 'vite-imagetools'

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Comment out "renderers: []" to enable Astro's default component support.
  renderers: ['@astrojs/renderer-preact'],
  buildOptions: {
    sitemap: true,
    site: 'https://jcurtis.dev/',
  },
  vite: {
    resolve: {
      alias: {
        $src: path.resolve('./src'),
        $components: path.resolve('./src/components'),
        $layouts: path.resolve('./src/layouts'),
      },
    },
    plugins: [imagetools()]
  },
});
