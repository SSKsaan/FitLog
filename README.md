# FitLog

A workout tracker built with Next.js. Browse a list of lifts, add the ones you want to do to today's plan, and tick them off as you go. There is no login and no database — the plan is saved in your browser.

![FitLog home](public/hero.webp)

## Technologies

| | |
| --- | --- |
| Framework | Next.js 16.3.6 (App Router) with React 19.2.8 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Toasts | react-toastify |
| Fonts | next/font (Oswald, Inter) |
| Data | Workout REST API, with a bundled snapshot as fallback |
| Storage | Browser `localStorage` |
| Hosting | Vercel |

Live site: [fitlog-nextscript.vercel.app](https://fitlog-nextscript.vercel.app/)

## Key features

1. **Workout library** — responsive card grid of all twelve lifts, showing muscle groups, equipment, duration, calories burned and rating.
2. **Today's plan** — add up to five workouts. Once it is full the add buttons are disabled, so the list cannot grow forever.
3. **Saved workouts** — a second list for lifts you want to keep for later.
4. **Search and sort** — filter by name or muscle group, then sort by duration, calories burned or rating. Works the same on the library and the plan page.
5. **Workout detail pages** — full stats, step-by-step instructions, and buttons to add to the plan or save.
6. **Saved in the browser** — the plan and saved lists are kept in `localStorage`, so they survive a refresh.
7. **Loading and error states** — toasts on every action, a loading state while data is fetched, a 404 page and an error boundary.

## Getting started

Needs Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

On PowerShell use `Copy-Item .env.example .env.local` instead of `cp`. Then open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

`NEXT_PUBLIC_API_URL` — the workout API. It is required and has no default in the code. Set it in `.env.local` for local work, and in the Vercel project's environment variables for the live site (redeploy afterwards). If it is missing, the app falls back to the snapshot in `src/data/workouts.ts`.

## Notes

- Workout data is fetched from the API on page load. The bundled snapshot is only used if that request fails.
- Clearing site data resets the plan and the saved list.
