import { useEffect, useState } from "react";

import "../../index.css";

import { fetchDiscoverMovies } from "../../services/api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Pagination from "../../components/Pagination/Pagination";
import Menu from "../../components/Menu/Menu";
import VerticalCard from "../../components/CardVertical/VerticalCard";
import Title from "../../components/Title/Title";

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
              data
                ?.filter(item => item?.backdrop_path !== null)
                .map(item => (
                  <div className="flex flex-col" key={item.id}>
                    <VerticalCard item={item} type="movie" />
                    <Title title={item.title} />
                  </div>
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

{
  /* <div className="p-3">
{isLoading ? (
  <div className="h-[15px] w-full mx-auto bg-red-500 mt-0"></div>
) : (
  <>
  
  </>
)}
</div> */
}
