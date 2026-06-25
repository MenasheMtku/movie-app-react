"use client";

import { useState } from "react";
import MovieCard from "@/components/CardVertical/VerticalCard";
import ProgressBar from "@/components/ProgressBar";
import "@/index.css";
import { fetchSearchQuery } from "@/services/api";
import LoadMoreButton from "@/components/LoadMoreButton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { SearchResult } from "@/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";

const Search = () => {
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [searchValue, setSearchValue] = useState<string>("");
  const [tempSearchValue, setTempSearchValue] = useState<string>("");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", searchValue, type],
    queryFn: ({ pageParam }) =>
      fetchSearchQuery(searchValue, pageParam as number, type),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!searchValue,
  });

  const results: SearchResult[] =
    data?.pages.flatMap(page => page.results) ?? [];

  const observerRef = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasMore: !!hasNextPage,
    onLoadMore: fetchNextPage,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };

  return (
    <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14">
      <form
        onSubmit={handleSearch}
        className="mx-auto flex place-content-center pt-10"
      >
        <input
          className="clamp-width-input rounded-s-lg bg-bkg border-2 border-content text-content px-6 py-2 text-center outline-0 focus:outline-none"
          placeholder="Type here"
          value={tempSearchValue}
          onChange={e => setTempSearchValue(e.target.value)}
        />
        <select
          className="w-[120px] rounded-e-lg bg-content text-bkg px-3 outline-none"
          onChange={e => {
            setType(e.target.value as "movie" | "tv");
          }}
          defaultValue={"DEFAULT"}
        >
          <option value="tv">TV Show</option>
          <option value="movie">Movie</option>
        </select>
      </form>

      {isLoading && <ProgressBar />}
      <div className="movie-grid h-full mt-8">
        {results.map(item => (
          <MovieCard key={item.id} item={item} type={type} />
        ))}
      </div>
      {!isLoading && hasNextPage && (
        <div ref={observerRef} className="flex justify-center mt-6">
          <LoadMoreButton loading={isFetchingNextPage} onClick={fetchNextPage}>
            Load More
          </LoadMoreButton>
        </div>
      )}
      {results.length === 0 && !isLoading && (
        <h3 className="text-center text-sm font-medium">Type To search</h3>
      )}
    </div>
  );
};

export default Search;
