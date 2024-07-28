import { useEffect, useState } from "react";
import MovieCard from "../../components/CardVertical/VerticalCard.jsx";
import "../../index.css";
import { fetchDiscoverShows } from "../../services/api.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import { FaCaretDown } from "react-icons/fa";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu.jsx";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDiscoverShows(activePage, sortBy)
      .then(res => {
        console.log(res, "shows res");
        setShows(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activePage, sortBy]);

  // if (loading) {
  //     return <ProgressBar />
  // }
  return (
    <>
      <div className="min-h-full  pb-8">
        <div className="mx-auto min-h-screen max-w-screen-xl">
          <Menu
            handlePage={setActivePage}
            handleSort={setSortBy}
            header="TV Shows"
            opt1="Popular"
            opt2="Top Rated"
          />

          {shows?.length > 0 && !loading && (
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          )}
          {loading && <ProgressBar />}
          <div className="movie-grid">
            {shows &&
              shows
                .filter(item => item?.backdrop_path !== null)
                .map(item => (
                  <MovieCard key={item?.id} item={item} type="tv" />
                ))}
          </div>
          {shows?.length > 0 && !loading && (
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

export default Shows;
