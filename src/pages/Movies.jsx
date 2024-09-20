import "../index.css";

import VerticalCard from "../components/CardVertical/VerticalCard";
import LoadMoreButton from "../components/LoadMoreButton";
import Menu from "../components/Menu/Menu";
import PosterTitle from "../components/PosterTitle";
import ProgressBar from "../components/ProgressBar";
import useFetchData from "../hooks/useFetchData";
import { fetchDiscoverMovies } from "../services/api";
const Movies = () => {
  const {
    data: movies,
    isLoading,
    loadingMore,
    loadMoreData: loadMoreMovies,
    setSortBy,
    activePage,
    totalPages,
  } = useFetchData(fetchDiscoverMovies);

  return (
    <>
      {/* <div className="min-h-full pb-8"> */}
      <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4">
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
                  className="bg-black/30 p-2 rounded-lg overflow-hidden text-center"
                >
                  <VerticalCard item={item} type="movie" />
                  <PosterTitle title={item.title} />
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
      {/* </div> */}
    </>
  );
};

export default Movies;
