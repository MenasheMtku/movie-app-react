# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (--max-warnings 0, treat warnings as errors)
npm run preview  # Alias: next build && next start
```

## Environment

Requires `NEXT_PUBLIC_TMDB_API_KEY` in `.env` — all API calls authenticate via this key against `https://api.themoviedb.org/3/`.

For future server-only routes or Route Handlers, use a non-prefixed key (e.g., `TMDB_API_KEY`) to keep it off the client bundle.

## Architecture

**Tech stack:** React 18 + TypeScript, Next.js 14 (App Router), Tailwind CSS (dark mode via `selector`), TanStack React Query v5, Axios, Swiper, Framer Motion.

**Routing** is file-system based in `src/app/`. Routes: `/` (Home), `/movies`, `/shows`, `/search`, `/movie/[id]`, `/tv/[id]`, `/watchlist`. The global layout (`src/app/layout.tsx`) wraps all routes with `Providers`, `Navbar`, `PageTransition`, and `Footer`. Custom `not-found.tsx` and `error.tsx` exist at root and per detail route.

**Page component pattern:** App Router pages (`src/app/*/page.tsx`) are thin Server Components that re-export the matching client component from `src/views/`. All interactive logic lives in `src/views/`.

**API layer** lives entirely in [src/services/api.ts](src/services/api.ts). Every TMDB endpoint is a named export (`fetchTrendingAll`, `fetchDiscoverMovies`, `fetchDetails`, `fetchGenres`, etc.). Image base URLs are exported as `imagePath` (w500) and `imagePathOriginal` (original size). No error handling at the service layer — callers handle it.

**Data fetching:** TanStack React Query (`useQuery`, `useQueries`) with queries defined inline in view components. `useInfiniteScroll` ([src/hooks/useInfiniteScroll.ts](src/hooks/useInfiniteScroll.ts)) wraps `IntersectionObserver` and returns an `observerRef` for sentinel elements.

**State management:** Two contexts only —
- `ThemeContext` ([src/contexts/themeContext/](src/contexts/themeContext/)) — dark mode toggle, localStorage-persisted, system-preference aware. Consume via `useTheme()`.
- `WatchlistContext` ([src/contexts/watchlistContext/](src/contexts/watchlistContext/)) — add/remove/query watchlist items, localStorage-persisted. Consume via `useWatchlist()`.

**Types** are in [src/types/movie.d.ts](src/types/movie.d.ts): `Movie`, `Program`, `CommonFeatures`, `DetailsType`, `CastType`, `VideoType`, `SearchResult`, `ApiResponse<T>`.

**Utilities** in [src/utils/helpers.ts](src/utils/helpers.ts): `shortenOverview`, `shortenTitle`, `minutesToHours`, `ratingToPercentage`, `resolveRatingColor`.

**Component conventions:** Feature components go in `src/components/<FeatureName>/`. Cards (`VerticalCard`, `HorizontalCard`) accept `{ item, type }` and link to `/movie/:id` or `/tv/:id`. Skeleton loading is handled locally per card via `CardSkeleton`.

## Code Style & Architectural Constraints

- **Default to Server Components.** Only add `"use client"` when the component needs interactivity, hooks, or browser APIs.
- **Preserve the api / helpers / UI separation.** TMDB fetches belong in `src/services/api.ts`; data transformations in `src/utils/helpers.ts`; presentation in components.
- **No unnecessary dependencies.** The current stack already covers animations (Framer Motion), HTTP (Axios), data fetching (React Query), and carousels (Swiper). Justify any new package additions.
- **Lint is strict.** `eslint: { ignoreDuringBuilds: true }` is set in `next.config.mjs` as a build escape hatch — fix lint errors in source rather than relying on this flag.
