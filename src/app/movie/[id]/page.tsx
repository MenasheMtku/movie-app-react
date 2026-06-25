import type { Metadata } from "next";
import DetailsPage from "@/views/DetailsPage";

export const revalidate = 43200; // 12 hours

const TMDB_BASE = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getMovieDetails(id: string) {
  try {
    const res = await fetch(`${TMDB_BASE}/movie/${id}?api_key=${apiKey}`, {
      next: { revalidate: 43200 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const details = await getMovieDetails(params.id);
  if (!details) return { title: "Movie — MovieApp" };

  return {
    title: `${details.title} — MovieApp`,
    description: details.overview?.substring(0, 160),
    openGraph: {
      title: details.title,
      description: details.overview?.substring(0, 160),
      images: details.backdrop_path
        ? [
            {
              url: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
              width: 1280,
              height: 720,
            },
          ]
        : undefined,
    },
  };
}

export default function MovieDetailPage() {
  return <DetailsPage type="movie" />;
}
