# Zero Build Lab — portfolio site

Single-page portfolio. TanStack Start + React 19 + Tailwind v4, built by Nitro
for the Cloudflare **Workers** runtime.

## Before you deploy — change these

All identity values live at the top of `src/routes/index.tsx`:

```ts
const SITE_URL = "https://zerobuildlab.dev";   // final custom domain
const EMAIL    = "zerobuildlab@gmail.com";      // confirm this is the one you want public
const GITHUB   = "https://github.com/winduadiprabowo-pixel";
```

`SITE_URL` is used for the canonical link, Open Graph tags and the JSON-LD
profile. If it is wrong, link previews on WhatsApp, X and LinkedIn will break.

## Deploying

**This is not a static site.** `npm run build` produces `.output/` containing a
Cloudflare Worker plus static assets — there is no `dist/` and no `index.html`.
A Cloudflare **Pages** project pointed at `dist` will fail.

Use **Cloudflare Workers** instead:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Worker config | `.output/server/wrangler.json` (generated at build time) |

Local preview of a production build:

```bash
npm run build
npx vite preview
```

### If you would rather host it as plain static files

TanStack Start can prerender to HTML, which would let you use Cloudflare Pages.
Add this to `vite.config.ts` inside `tanstackStart`:

```ts
prerender: { enabled: true, crawlLinks: true },
pages: [{ path: "/", prerender: { enabled: true } }],
```

This was **not verified** — the prerenderer needs to bind a local server, which
could not run in the environment where these edits were made. Build it locally
first and confirm an `index.html` appears before relying on it.

## Content rules

The client on case study 01 is referred to **only** as "a UK children's play
brand". Do not add the company name, the licensor name, logos or screenshots
without written permission from the client.

## Commands

```bash
npm install
npm run dev      # local dev
npm run build    # production build into .output/
npm run lint
npm run format
```
