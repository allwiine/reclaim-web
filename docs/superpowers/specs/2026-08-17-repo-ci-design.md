# Repo CI and hygiene design

Date: 2026-08-17
Status: approved

## Context

reclaim-app.dev is a zero-JS Astro 7 static site with two dependencies (astro,
wrangler). Deploys are automatic: Cloudflare Workers Builds runs `npm run build`
and `npx wrangler deploy` on every push to main. The repo (public, GitHub
allwiine/reclaim-web) has no `.github/` directory, so nothing checks a pull
request before merge, and a broken merge deploys straight to production. The
site's quality bar (clean build, clean html-validate, Lighthouse 100) is
enforced entirely by hand.

## Goal

A PR safety net: no change reaches main (and therefore production) without a
passing build and clean html-validate. Dependency updates arrive as PRs that
the same net vets.

## Non-goals

- No deploy workflow. Workers Builds owns deploys; a GitHub Actions deploy
  would create a second, competing deploy path.
- No Lighthouse CI. Score-flaky and slow in CI; Lighthouse 100 stays a manual
  pre-ship check.
- No CODEOWNERS, PR/issue templates, or SHA-pinned actions. Solo repo, only
  first-party actions.

## Design

### 1. CI workflow — `.github/workflows/ci.yml`

- Triggers: `pull_request`, and `push` to `main` (post-merge verification).
- Top-level `permissions: contents: read`.
- Concurrency group keyed on workflow + ref with `cancel-in-progress: true`.
- One job, `build-and-validate`, on `ubuntu-latest`:
  1. `actions/checkout`
  2. `actions/setup-node` with `node-version-file: package.json` (reads
     `engines.node`, currently >=22.12.0) and `cache: npm`
  3. `npm ci`
  4. `npm run build`
  5. `npm run validate`
- Actions referenced by major version tag; Dependabot keeps them current.

### 2. html-validate wiring

- `html-validate` added as a devDependency so CI and local runs agree via the
  lockfile.
- `.htmlvalidate.json` extending `html-validate:recommended`.
- `"validate": "html-validate \"dist/**/*.html\""` script in package.json
  (assumes a prior build, matching how CI orders the steps).
- Gate is born green: run `npm run build && npm run validate` locally against
  the current site and fix any findings before the check becomes required.

### 3. Branch protection

- A repository ruleset on `main` requiring the `build-and-validate` status
  check to pass, applied via `gh api`.
- Accepted implication: direct pushes to main are rejected; all changes flow
  through branches/PRs with passing checks. This formalizes the existing
  `feat/`/`fix/` branch workflow.

### 4. Dependabot — `.github/dependabot.yml`

- `package-ecosystem: npm`, monthly, minor and patch updates grouped into a
  single PR.
- `package-ecosystem: github-actions`, monthly.

## Verification

1. Locally: `npm ci`, `npm run build`, `npm run validate` all pass.
2. Push the branch, open a PR, and confirm the `build-and-validate` check runs
   and passes.
3. After merge: confirm the ruleset blocks a direct push to main and that the
   check is listed as required on the next PR.
