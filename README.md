# reclaim-app.dev

The website for [Reclaim](https://github.com/allwiine/Reclaim), the macOS app
that finds and cleans wasted developer storage. Three pages: `/` (landing),
`/support` and `/privacy`.

Built with [Astro](https://astro.build) and nothing else — no other runtime or
UI dependencies, and the built pages ship **zero JavaScript**.

## Commands

| Command           | Action                                     |
| ----------------- | ------------------------------------------ |
| `npm install`     | Install dependencies (Astro only)          |
| `npm run dev`     | Dev server at `localhost:4321`             |
| `npm run build`   | Production build to `dist/`                |
| `npm run preview` | Serve the production build locally         |

Requires Node ≥ 22.12 (see `engines` in package.json).

## Layout

```
src/
  data/        Content and site-wide facts, typed. Copy lives here, not in markup.
    site.ts      Name, repository URLs, navigation — a URL only ever changes here.
    landing.ts / support.ts / privacy.ts   Per-page content.
  styles/
    global.css   Design tokens (colors, layout, motion) and the few shared utilities.
  layouts/
    Base.astro   <head> (meta, canonical, Open Graph, icons, font preloads), header, footer.
  components/    One file per repeated visual structure, styles scoped inside.
  pages/
    index.astro, support.astro, privacy.astro
  assets/
    app-icon.png   The app's real icon (from the Reclaim repo); every size on the
                   site — header mark, download badge, favicon, touch icon, the
                   Open Graph image — is derived from it at build time.
    fonts/         Vendored woff2 subsets, see below.
public/          robots.txt — served as-is.
```

## Decisions worth knowing about

**Zero JavaScript.** The FAQ accordion is native `<details name="faq">` —
the shared `name` gives exclusive-open behavior in the browser, and
`::details-content` transitions animate it in browsers that support
`interpolate-size`. The hero entrance is a CSS animation. Both are disabled
under `prefers-reduced-motion`.

**Fonts are vendored, not fetched.** The two woff2 latin subsets live in the
repository so builds are deterministic and never call Google. Astro's fonts
API (`fontProviders.local()` in `astro.config.mjs`) generates the
`@font-face` rules, preload links and metric-adjusted fallback fonts, which
is what keeps layout shift at zero while the real fonts load. Body text uses
the system font stack and costs nothing.

**All CSS is inlined** (`build.inlineStylesheets: 'always'`), so first paint
needs only the HTML document; the fonts are the page's only other requests.

**Content mirrors the app.** Every claim in the `src/data/` files is checked
against the app's behavior in the Reclaim repository (the 25 GB notification
threshold, Trash-first cleaning, Safe-only preselection, the Sparkle update
check, and so on). When the app changes, those files are what needs updating.

**One deliberate token deviation:** `--ink-3` is `#7f7f7a` instead of the
mock's `#6e6e69`, because 12 px text needs 4.5:1 contrast for WCAG AA.

## Quality bar

Lighthouse 100/100 in every category (performance, accessibility, best
practices, SEO) on every page, on both mobile and desktop presets, and
`html-validate` passes clean. Please keep it that way:

```bash
npm run build && npm run preview &
npx lighthouse http://localhost:4321/ --chrome-flags="--headless=new"
npx html-validate dist/index.html dist/support/index.html dist/privacy/index.html
```
