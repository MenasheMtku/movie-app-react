import { useEffect, useState } from "react";
import MovieCard from "../../components/CardVertical/VerticalCard";
import "../../index.css";
import { fetchDiscoverMovies } from "../../services/api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";

const Movies = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDiscoverMovies(activePage, sortBy)
      .then(res => {
        console.log(res, "res");
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, sortBy]);

  return (
    <>
      <div className="min-h-full  pb-8">
        <div className="mx-auto min-h-screen max-w-screen-xl">
          <Menu
            handlePage={setActivePage}
            handleSort={setSortBy}
            header="Discover Movies"
            opt1="Popular"
            opt2="Top Rated"
          />
          {data?.length > 0 && !isLoading && (
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          )}
          {isLoading && <ProgressBar />}
          <div className="movie-grid">
            {data &&
              data?.map(item => (
                <MovieCard key={item.id} item={item} type="movie" />
              ))}
          </div>
          {/* <div className="bg-blue-500 items-center w-60 mx-auto p-1 justify-center">
            <button>
              <p>Load more</p>
            </button>
          </div> */}
          {data?.length > 0 && !isLoading && (
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
