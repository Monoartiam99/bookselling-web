# BooksSelling

A responsive digital-book storefront prototype for **The Complete Earn Money Online**, a Hindi + English, 10-part PDF guide. Browse and preview the chapter roadmap, search and filter topics, get locally personalized recommendations, and try the sample cart and checkout flow.

> **Prototype notice:** Checkout, payment confirmation, order tracking, and delivery are simulated in the browser. There is no payment gateway, backend, email/WhatsApp delivery, or server-side order storage. Do not use this app to collect real payment or customer information.

## What’s included

- Product overview, sample excerpt, chapter previews, reader reviews, and PDF preview/download.
- Search across chapter titles, summaries, excerpts, tags, and tools, with track, roadmap phase, and sort filters.
- A deterministic recommendation engine that adapts to viewed chapters, searches, selected tracks, and purchase state.
- A cart and demo checkout with UPI, card, and net banking options, plus `READER10` and `LAUNCH15` sample coupon codes.
- Demo order lookup, fulfillment milestones, and a PDF download vault.
- Cart, reading signals, and demo orders saved in the current browser’s `localStorage`.

The order tracker starts with a sample order (`KM-2026-4819`) so the screen can be explored without completing checkout.

## Tech stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React icons and Motion animations

## Run locally

**Prerequisites:** Node.js and npm. Use a Node.js release supported by the installed Vite version.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (the development server is configured for port `3000`).

GitHub Pages deployments are built with Vite by the workflow in `.github/workflows/vite-gh-pages.yml`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000. |
| `npm run lint` | Run the TypeScript compiler without emitting files. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Serve the built app locally for a production-build check. |

## Project structure

```text
.
├── public/
│   └── assets/                 # Static images and the downloadable PDF
├── src/
│   ├── components/             # Book preview, checkout, order tracking, sharing
│   ├── data/books.ts           # Book details, chapter content, and reviews
│   ├── types/bookstore.ts      # Storefront domain types
│   ├── utils/
│   │   ├── recommendations.ts  # Local chapter recommendation scoring
│   │   └── storage.ts          # Browser localStorage persistence
│   ├── App.tsx                 # Storefront page and application state
│   ├── index.css               # Global styles
│   └── main.tsx                # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Catalog and assets

- Update the book, its ten chapters, sample excerpt, and reviews in `src/data/books.ts`.
- The guide PDF is referenced by `FLAGSHIP_PDF_URL` in that file and served from `public/assets/aistudio/`. Keep the URL and the actual asset path in sync.
- Vite copies `src/assets/` into the production output for existing root-relative asset references. Preserve the `copy-unbundled-src-assets` plugin in `vite.config.ts` if those assets are used.
- The `@` import alias points to the project root.

## Configuration

The current frontend does not read environment variables or make Gemini API requests. `.env.example` contains `GEMINI_API_KEY` and `APP_URL` placeholders from the AI Studio template; they are not required to run this app as it currently exists. Never put private credentials in client-side code or expose them through a `VITE_*` variable.

## Production considerations

Before using this as a real storefront, replace the simulated checkout and local order state with a trusted server-side payment integration and persistent backend. Add authenticated order access, validate and authorize PDF downloads on the server, and implement actual email/WhatsApp delivery. `localStorage` is per browser and is not secure or shared across devices.
