const url = "https://api.themoviedb.org/3/";
const key = "7eb14e2aa5d667f8734de2a0f7d2e322";
const imageUrl = "https://image.tmdb.org/t/p/w500/";

const moviesReq = {
  // reqTrending: `${url}/movie/trending?api_key=${key}&language=en-US&page=1`,
  reqTrending: `${url}trending/movie/day?api_key=${key}&language=en-US`,
  reqPopular: `${url}/movie/popular?api_key=${key}&language=en-US&page=1`,
  reqUpComing: `${url}/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

const tvShowsReq = {
  reqPopularTv: `${url}/tv/popular?api_key=${key}&language=en-US&page=1`,
};

const defaultImage =
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export { url, key, imageUrl, defaultImage, moviesReq, tvShowsReq };
