import VerticalCard from "../components/CardVertical/VerticalCard.jsx";
import LoadMoreButton from "../components/LoadMoreButton";
import Menu from "../components/Menu/Menu.jsx";
import PosterTitle from "../components/PosterTitle.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
// hooks
import useFetchData from "../hooks/useFetchData";
import useInfiniteScroll from "../hooks/useInfiniteScroll.js";
import "../index.css";
import { fetchDiscoverShows } from "../services/api.js";
import { Program } from "../types/movie";

const Shows = () => {
  const {
    data: shows,
    isLoading,
    loadingMore,
    loadMoreData: loadMoreShows,
    setSortBy,
    activePage,
    totalPages,
  } = useFetchData<Program>(fetchDiscoverShows);

  const observerRef = useInfiniteScroll({
    loading: loadingMore,
    hasMore: activePage < totalPages,
    onLoadMore: loadMoreShows,
  });

  console.log(...shows);

  return (
    <>
      {/* <div className="min-h-full pb-8 "> */}
      <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14">
        <Menu
          handlePage={() => activePage}
          handleSort={setSortBy}
          header="TV Shows"
          opt1="Popular"
          opt2="Top Rated"
        />
        {isLoading && <ProgressBar />}
        <div className="movie-grid">
          {shows &&
            shows
              .filter(item => item?.backdrop_path !== null)
              .map(item => (
                <div
                  key={item.id}
                  className="bg-bkg_alt p-2 rounded-lg overflow-hidden text-center"
                >
                  <VerticalCard item={item} type="tv" />

                  <PosterTitle title={item.name} />
                </div>
              ))}
        </div>
        {/* Load More Button */}
        {!isLoading && activePage < totalPages && (
          <div ref={observerRef} className="flex justify-center mt-6">
            <LoadMoreButton loading={loadingMore} onClick={loadMoreShows}>
              Load More
            </LoadMoreButton>
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default Shows;
