"use client";

import "@/index.css";
import { useMemo, useState } from "react";

import CardSkeleton from "@/components/CardSkeleton";
import GenreChips from "@/components/GenreChips";
import LoadMoreButton from "@/components/LoadMoreButton";
import Menu from "@/components/Menu/Menu";
import PosterTitle from "@/components/PosterTitle";
import VerticalCard from "@/components/CardVertical/VerticalCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { fetchDiscoverShows, fetchGenres } from "@/services/api";
import { Program } from "@/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const Shows = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data: genresData } = useQuery({
    queryKey: ["genres", "tv"],
    queryFn: () => fetchGenres("tv"),
    staleTime: Infinity,
  });

  const genres = genresData?.genres ?? [];

  const toggleGenre = (id: number) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["shows", sortBy, selectedGenres],
    queryFn: ({ pageParam }) =>
      fetchDiscoverShows(pageParam as number, sortBy, selectedGenres),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  const shows: Program[] = data?.pages.flatMap(page => page.results) ?? [];

  const filteredShows = useMemo(
    () => shows.filter(item => item?.backdrop_path !== null),
    [shows]
  );

  const observerRef = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasMore: !!hasNextPage,
    onLoadMore: fetchNextPage,
  });

  return (
    <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14">
      <Menu
        handleSort={setSortBy}
        header="TV Shows"
        opt1="Popular"
        opt2="Top Rated"
      />

      {genres.length > 0 && (
        <div className="mb-4">
          <GenreChips
            genres={genres}
            selected={selectedGenres}
            onToggle={toggleGenre}
          />
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        aria-label={isLoading ? "Loading shows" : `${filteredShows.length} shows loaded`}
        className="sr-only"
      />
      <div className="movie-grid" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          : filteredShows.map(item => (
              <div
                key={item.id}
                className="bg-bkg_alt p-2 rounded-lg overflow-hidden text-center"
              >
                <VerticalCard item={item} type="tv" />
                <PosterTitle title={item.name} />
              </div>
            ))}
      </div>
      {!isLoading && hasNextPage && (
        <div ref={observerRef} className="flex justify-center mt-6">
          <LoadMoreButton loading={isFetchingNextPage} onClick={fetchNextPage}>
            Load More
          </LoadMoreButton>
        </div>
      )}
    </div>
  );
};

export default Shows;
