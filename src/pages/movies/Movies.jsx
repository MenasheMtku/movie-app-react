import { useEffect, useState } from "react";
import CardItem from "../../components/CardItem/CardItem";
import "../../index.css";
import { fetchDiscoverMovies } from "../../services/api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Pagination from "../../components/Pagination/Pagination";

const Movies = () => {
  // const { data, isLoading, activePage, totalPages } = useFetch(
  //     fetchDiscoverMovies(),
  // )

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

  // if (isLoading) {
  //     return <ProgressBar />
  // }
  return (
    <>
      <div className="min-h-full bg-gray-800/40 pb-8">
        <div className="mx-auto min-h-screen max-w-screen-xl">
          <div className="flex  pt-8">
            <h1 className="px-4 text-xl md:text-3xl md:font-semibold">
              Discover Movies
            </h1>
            <select
              className="w-[180px] rounded-lg bg-gray-500 px-3 font-semibold text-black"
              onChange={e => {
                setActivePage(1);
                setSortBy(e.target.value);
              }}
            >
              <option value="popularity.desc">Popular</option>
              <option value="vote_average.desc&vote_count.gte=1000">
                Top Rated
              </option>
            </select>
          </div>

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
                <CardItem key={item.id} item={item} type="movie" />
              ))}
          </div>
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
