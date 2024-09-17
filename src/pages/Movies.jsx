import { useEffect, useState } from "react";

import "../index.css";

import VerticalCard from "../components/CardVertical/VerticalCard";
import Menu from "../components/Menu/Menu";
import ProgressBar from "../components/ProgressBar";
import Title from "../components/PosterTitle";
import { fetchDiscoverMovies } from "../services/api";
import LoadMoreButton from "../components/LoadMoreButton";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = (page, sort) => {
    if (page > totalPages) return; // If you've fetched all pages, stop
    setIsLoading(page === 1); // Show main loader for the first load
    setLoadingMore(page > 1); // Show "load more" spinner for subsequent loads

    fetchDiscoverMovies(page, sort)
      .then(res => {
        setMovies(prevData => [...prevData, ...res?.results]); // Append new movies to the existing ones
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false); // Disable "loading more" state
      });
  };

  useEffect(() => {
    setMovies([]); // Clear previous data when sort changes
    setActivePage(1); // Reset to first page on sort change
    loadMovies(1, sortBy); // Fetch movies for the first page
  }, [sortBy]);

  const loadMoreMovies = () => {
    loadMovies(activePage + 1, sortBy); // Load the next page
  };

  return (
    <>
      <div className="min-h-full pb-8">
        <div className="mx-auto min-h-screen max-w-[1440px]">
          <Menu
            handlePage={setActivePage}
            handleSort={setSortBy}
            header="Discover Movies"
            opt1="Popular"
            opt2="Top Rated"
          />

          {isLoading && <ProgressBar />}
          <div className="movie-grid">
            {movies &&
              movies
                ?.filter(item => item?.backdrop_path !== null)
                .map(item => (
                  <div className="flex flex-col" key={item.id}>
                    <VerticalCard item={item} type="movie" />
                    <Title title={item.title} />
                  </div>
                ))}
          </div>
          {!isLoading && activePage < totalPages && (
            <div className="flex justify-center mt-6">
              <LoadMoreButton loading={loadingMore} onClick={loadMoreMovies}>
                Load More
              </LoadMoreButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
