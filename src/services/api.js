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
  const { data } = await axios.get(
    `${baseUrl}movie/upcoming?api_key=${apiKey}`
  );
  return data?.results;
};
export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
  return data?.results;
};
export const fetchPopularMovies = async () => {
  const res = await axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`);
  return res?.data;
};
// -------- DISCOVER MOVIES & SHOWS --------
export const fetchDiscoverMovies = async (page, sortBy) => {
  console.log("discover endponit called..");
  const res = await axios.get(
    `${baseUrl}discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );

  return res?.data;
};
export const fetchDiscoverShows = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

// -------- SHOWS --------
export const fetchPopularShows = async () => {
  const { data } = await axios.get(`${baseUrl}tv/popular?api_key=${apiKey}`);
  return data?.results;
};

// -------- DETAILS MOVIES & SHOWS --------
export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// MOVIES & SERIES - Credits

export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// MOVIES & SERIES - Videos

export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}${type}/${id}/videos?api_key=${apiKey}`
  );
  return res?.data;
};

// -------- MULTI SEARCH --------

export const fetchSearchQuery = async (query, page, type) => {
  const res = await axios.get(
    `${baseUrl}search/${type}?api_key=${apiKey}&query=${query}&page=${page}`
  );

  return res?.data;
};

export const defaultImage =
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
