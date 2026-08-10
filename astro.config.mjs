// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://reclaim-app.dev',

  // The site's CSS is small; inlining it removes the only render-blocking
  // request, so first paint needs nothing but the HTML itself.
  build: { inlineStylesheets: 'always' },

  // Fonts are vendored in src/assets/fonts so builds are deterministic and
  // never reach out to Google. Astro generates the @font-face rules, preload
  // links and metric-adjusted fallbacks (zero layout shift on swap).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            weight: '400 600',
            style: 'normal',
            src: ['./src/assets/fonts/bricolage-grotesque-latin.woff2'],
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Spline Sans Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/spline-sans-mono-latin-400.woff2'],
            display: 'swap',
          },
        ],
      },
    },
  ],
});
