import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://movieapp.vercel.app";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB = "https://api.themoviedb.org/3";

async function fetchPopular(type: "movie" | "tv"): Promise<{ id: number }[]> {
  try {
    const res = await fetch(`${TMDB}/${type}/popular?api_key=${API_KEY}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [movies, shows] = await Promise.all([
    fetchPopular("movie"),
    fetchPopular("tv"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/movies`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/shows`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const movieEntries: MetadataRoute.Sitemap = movies.map(m => ({
    url: `${SITE_URL}/movie/${m.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const showEntries: MetadataRoute.Sitemap = shows.map(s => ({
    url: `${SITE_URL}/tv/${s.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...movieEntries, ...showEntries];
}
