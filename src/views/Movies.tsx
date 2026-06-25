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
import { fetchDiscoverMovies, fetchGenres } from "@/services/api";
import { Movie } from "@/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const Movies = () => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data: genresData } = useQuery({
    queryKey: ["genres", "movie"],
    queryFn: () => fetchGenres("movie"),
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
    queryKey: ["movies", sortBy, selectedGenres],
    queryFn: ({ pageParam }) =>
      fetchDiscoverMovies(pageParam as number, sortBy, selectedGenres),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  const movies: Movie[] = data?.pages.flatMap(page => page.results) ?? [];

  const filteredMovies = useMemo(
    () => movies.filter(item => item?.backdrop_path !== null),
    [movies]
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
        header="Discover Movies"
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
        aria-label={isLoading ? "Loading movies" : `${filteredMovies.length} movies loaded`}
        className="sr-only"
      />
      <div className="movie-grid" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          : filteredMovies.map(item => (
              <div
                key={item.id}
                className="bg-bkg_alt p-2 rounded-lg overflow-hidden text-center"
              >
                <VerticalCard item={item} type="movie" />
                <PosterTitle title={item.title} />
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

export default Movies;
