import axios from "axios";

// -------- TMDB API --------
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const baseUrl = "https://api.themoviedb.org/3/";
// images
export const imagePath = "https://image.tmdb.org/t/p/w500/";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original/";

export const fetchTrendingAll = async (timeWindow = "day") => {
  const res = await axios.get(
    `${baseUrl}trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return res?.data;
};
// -------- MOVIES --------
export const fetchUpcomingMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`);
  return res?.data;
};
export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
  return res?.data;
};
export const fetchPopularMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
  return res?.data;
};
// -------- DISCOVER MOVIES & SHOWS --------
export const fetchDiscoverMovies = async (page: number, sortBy: string) => {
  console.log("discover endponit called..");
  const res = await axios.get(
    `${baseUrl}discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );

  return res?.data;
};
export const fetchDiscoverShows = async (page: number, sortBy: string) => {
  const res = await axios.get(
    `${baseUrl}discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

// -------- SHOWS --------
export const fetchPopularShows = async () => {
  const res = await axios.get(`${baseUrl}tv/popular?api_key=${apiKey}`);
  return res?.data;
};
export const fetchTrendingShows = async () => {
  const res = await axios.get(`${baseUrl}trending/tv/week?api_key=${apiKey}`);
  return res?.data;
};

// -------- DETAILS MOVIES & SHOWS --------
export const fetchDetails = async (type: string, id: string) => {
  const res = await axios.get(`${baseUrl}${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// MOVIES & SERIES - Credits

export const fetchCredits = async (type: string, id: string) => {
  const res = await axios.get(
    `${baseUrl}${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// MOVIES & SERIES - Videos

export const fetchVideos = async (type: string, id: string) => {
  const res = await axios.get(
    `${baseUrl}${type}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};

// -------- MULTI SEARCH --------

export const fetchSearchQuery = async (
  query: string,
  page: number,
  type: string
) => {
  const res = await axios.get(
    `${baseUrl}search/${type}?api_key=${apiKey}&query=${query}&page=${page}`
  );

  return res?.data;
};

export const defaultImage =
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
