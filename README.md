# Akinyosola Emmanuel — Portfolio

Full-stack developer and AI MVP builder. Ships production web apps and AI
products with **Claude Code (in VS Code), Lovable, Base44 and Replit**.
Available on Upwork and Fiverr.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build (run before deploying)
```

Node 20.9+ required.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(CSS-first — tokens live in `src/app/globals.css` under `@theme`) · Motion ·
React Three Fiber 9 + Drei 10 · ESLint (flat config, `eslint-config-next`).

## Design system

| | |
|---|---|
| Headings | Sora — hero 72/700, section 48/700 |
| Body | Inter — 18/400, nav 16/500 |
| Primary | `#071D49` |
| Accent | `#FF7A00` |
| Background | `#F8FAFC` |
| Hero gradient | `#071D49 → #0A3475 → #103F91` |
| Radius | 12–14px |

## The two 3D scenes

| Scene | File | What it does |
|---|---|---|
| Hero desk | `components/three/WorkspaceScene.tsx` | Monochrome studio desk with a code editor on screen (blinking cursor). Continuous turntable + damped mouse-driven yaw/pitch + a slow float. |
| Platform orbit | `components/three/OrbitScene.tsx` | Claude Code, Lovable, Base44 and Replit on four tilted elliptical orbits (drawn as faint rings) around an orange core. Hover/tap a logo → it slows, scales, its ring lights up, and a card explains what it's for. |

All geometry is procedural — no `.glb` files, no HDR downloads. Both canvases
lazy-load, cap at 1.75× DPR, switch to `frameloop="never"` when scrolled off
screen (GPU fully idle), and fall back to zero-WebGL versions under
`prefers-reduced-motion`. Keyboard keys are instanced (1 draw call); the
contact shadow is baked once.

## What to edit

| I want to… | Edit |
|---|---|
| Name, email, Upwork/Fiverr/X links, nav, stats | `src/lib/site.ts` |
| Add a design concept | `src/data/designs.ts` + a WebP in `public/designs/` (exact width/height). Shows on the home Design section (`featured: true`) and at `/design`. |
| Add a project | `src/data/projects.ts` — home showcase, `/portfolio`, filters, search and case-study pages all read from this one array. `featured: true` for the home page. |
| Change services | `src/data/services.ts` (`tier: "build"` shows first) |
| Platform copy | `src/data/platforms.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Review screenshots | `src/data/reviews.ts` + `public/reviews/` |
| FAQ | `src/data/faq.ts` |
| Process steps | `src/data/process.ts` |
| Colours, fonts, type scale | `@theme` in `src/app/globals.css` |

## Before launch — checklist

1. **Links.** In `src/lib/site.ts`, replace the `TODO` URLs (Fiverr, X, GitHub, LinkedIn).
2. **Your photo.** Replace `src/assets/portrait.jpg` with a 4:5 portrait (~1200×1500). It is a static import, so the URL is content-hashed and a new photo can never be served stale from the image cache.
3. **Contact form.** Get a free key at web3forms.com, put it in `.env.local` as
   `NEXT_PUBLIC_WEB3FORMS_KEY` (see `.env.example`), and add the same variable on
   Vercel. Until then the form falls back to a pre-filled `mailto:`.
4. **Site URL.** Set `NEXT_PUBLIC_SITE_URL` to your real domain so OpenGraph,
   sitemap and robots point at it.
5. **Real content.** `projects.ts` holds the 8 real sites (confirm `platform` and add real numbers to `results`). `testimonials.ts` and `public/reviews/` are still clearly-marked examples — swap in real quotes and review screenshots.
6. `npm run check` must pass clean.
