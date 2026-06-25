import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
});

// No trailing slash — TMDB poster_path values start with "/"
export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

export const fetchTrendingAll = async (timeWindow = "day") => {
  const res = await tmdb.get(`trending/all/${timeWindow}`);
  return res.data;
};

// -------- MOVIES --------
export const fetchUpcomingMovies = async () => {
  const res = await tmdb.get("movie/upcoming");
  return res.data;
};

export const fetchPopularMovies = async () => {
  const res = await tmdb.get("movie/popular");
  return res.data;
};

// -------- DISCOVER MOVIES & SHOWS --------
export const fetchDiscoverMovies = async (
  page: number,
  sortBy: string,
  genreIds: number[] = [],
) => {
  const res = await tmdb.get("discover/movie", {
    params: {
      page,
      sort_by: sortBy,
      ...(genreIds.length ? { with_genres: genreIds.join(",") } : {}),
    },
  });
  return res.data;
};

export const fetchDiscoverShows = async (
  page: number,
  sortBy: string,
  genreIds: number[] = [],
) => {
  const res = await tmdb.get("discover/tv", {
    params: {
      page,
      sort_by: sortBy,
      ...(genreIds.length ? { with_genres: genreIds.join(",") } : {}),
    },
  });
  return res.data;
};

// -------- GENRES --------
export const fetchGenres = async (type: "movie" | "tv") => {
  const res = await tmdb.get(`genre/${type}/list`);
  return res.data as { genres: Array<{ id: number; name: string }> };
};

// -------- SHOWS --------
export const fetchPopularShows = async () => {
  const res = await tmdb.get("tv/popular");
  return res.data;
};

export const fetchTrendingShows = async () => {
  const res = await tmdb.get("trending/tv/week");
  return res.data;
};

// -------- DETAILS --------
export const fetchDetails = async (type: string, id: string) => {
  const res = await tmdb.get(`${type}/${id}`);
  return res.data;
};

export const fetchCredits = async (type: string, id: string) => {
  const res = await tmdb.get(`${type}/${id}/credits`);
  return res.data;
};

export const fetchVideos = async (type: string, id: string) => {
  const res = await tmdb.get(`${type}/${id}/videos`);
  return res.data;
};

// -------- SEARCH --------
export const fetchSearchQuery = async (
  query: string,
  page: number,
  type: string,
) => {
  const res = await tmdb.get(`search/${type}`, { params: { query, page } });
  return res.data;
};

export const defaultImage =
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
