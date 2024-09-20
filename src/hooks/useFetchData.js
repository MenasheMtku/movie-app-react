import { useEffect, useState } from "react";

const useFetchData = (
  fetchFunction,
  initialType = "movie",
  initialQuery = "",
  initialSortBy = "popularity.desc"
) => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadData = (page, sort) => {
    if (page > totalPages) return;

    setIsLoading(page === 1); // Show main loader for first load
    setLoadingMore(page > 1); // Show "load more" spinner for subsequent loads

    fetchFunction(page, sort)
      .then(res => {
        setData(prevData => [...prevData, ...res?.results]); // Append new data to existing ones
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.error(err, "error loading data");
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false); // Disable loading states
      });
  };

  useEffect(() => {
    setData([]); // Clear previous data when sort changes
    setActivePage(1); // Reset to first page on sort change
    loadData(1, sortBy); // Fetch data for the first page
  }, [sortBy]);

  const loadMoreData = () => {
    loadData(activePage + 1, sortBy); // Load the next page
  };

  return {
    data,
    isLoading,
    loadingMore,
    loadMoreData,
    setSortBy,
    activePage,
    totalPages,
  };
};

export default useFetchData;
