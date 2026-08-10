// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://reclaim-app.dev',

  // The site's CSS is small; inlining it removes the only render-blocking
  // request, so first paint needs nothing but the HTML itself.
  build: { inlineStylesheets: 'always' },
});
