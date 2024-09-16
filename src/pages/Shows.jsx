import { useEffect, useState } from "react";

import VerticalCard from "../components/CardVertical/VerticalCard.jsx";
import Menu from "../components/Menu/Menu.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Title from "../components/PosterTitle.jsx";
import "../index.css";
import { fetchDiscoverShows } from "../services/api.js";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // New state for loading more

  // Function to fetch TV shows and append data
  const loadShows = page => {
    if (page > totalPages) return; // Stop loading if all pages are loaded
    setLoading(page === 1); // Set loading state for the first page
    setLoadingMore(page > 1); // Set loadingMore state for subsequent pages

    fetchDiscoverShows(page, sortBy)
      .then(res => {
        setShows(prevShows => [...prevShows, ...res?.results]); // Append new shows
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };
  // Fetch shows when the page or sorting criteria changes
  useEffect(() => {
    setShows([]); // Clear previous data
    loadShows(1); // Fetch the first page of shows
  }, [sortBy]);

  // Function to handle loading more results
  const loadMoreShows = () => {
    loadShows(activePage + 1); // Load the next page of results
  };

  return (
    <>
      <div className="min-h-full bg-gray-800/40 pb-8">
        <div className="mx-auto min-h-screen max-w-[1400px]">
          <Menu
            handlePage={setActivePage}
            handleSort={setSortBy}
            header="TV Shows"
            opt1="Popular"
            opt2="Top Rated"
          />
          {loading && <ProgressBar />}
          <div className="movie-grid">
            {shows &&
              shows
                .filter(item => item?.backdrop_path !== null)
                .map(item => (
                  <div key={item.id} className="flex-col flex-grow">
                    <VerticalCard item={item} type="tv" />
                    <Title title={item.name} />
                  </div>
                ))}
          </div>
          {/* Load More Button */}
          {!loading && activePage < totalPages && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={loadMoreShows}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shows;
