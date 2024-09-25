import { useEffect, useState } from "react";
import { Program, ApiResponse } from "../types/movie";

const useFetchData = <T>(
  fetchFunction: (page: number, sort: string) => Promise<ApiResponse<T>>,
  initialType = "movie",
  initialQuery = "",
  initialSortBy = "popularity.desc"
) => {
  const [data, setData] = useState<T[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadData = (page: number, sort: string) => {
    if (page > totalPages) return;

    setIsLoading(page === 1);
    setLoadingMore(page > 1);

    fetchFunction(page, sort)
      .then((res: ApiResponse<T>) => {
        setData(prevData => [...prevData, ...res.results]);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.error(err, "error loading data");
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false);
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
