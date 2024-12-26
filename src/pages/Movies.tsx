import "../index.css";

import VerticalCard from "../components/CardVertical/VerticalCard";
import LoadMoreButton from "../components/LoadMoreButton";
import Menu from "../components/Menu/Menu";
import PosterTitle from "../components/PosterTitle";
import ProgressBar from "../components/ProgressBar";
// hooks
import useFetchData from "../hooks/useFetchData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { fetchDiscoverMovies } from "../services/api";
// types
import { Movie } from "../types/movie";

const Movies = () => {
  const {
    data: movies,
    isLoading,
    loadingMore,
    loadMoreData: loadMoreMovies,
    setSortBy,
    activePage,
    totalPages,
  } = useFetchData<Movie>(fetchDiscoverMovies);

  const observerRef = useInfiniteScroll({
    loading: loadingMore,
    hasMore: activePage < totalPages,
    onLoadMore: loadMoreMovies,
  });

  console.log(...movies);

  return (
    <>
      {/* <div className="min-h-full pb-8"> */}
      <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14">
        <Menu
          handlePage={() => activePage}
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
                <div
                  key={item.id}
                  className="bg-bkg_alt p-2 rounded-lg overflow-hidden text-center"
                >
                  <VerticalCard item={item} type="movie" />
                  <PosterTitle title={item.title} />
                </div>
              ))}
        </div>
        {!isLoading && activePage < totalPages && (
          <div ref={observerRef} className="flex justify-center mt-6">
            <LoadMoreButton loading={loadingMore} onClick={loadMoreMovies}>
              Load More
            </LoadMoreButton>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default Movies;
