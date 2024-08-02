import { useState, useEffect } from "react";
import "../../index.css";
import "../../components/Form/form.css";
import MovieCard from "../../components/CardVertical/VerticalCard";
import { fetchSearchQuery } from "../../services/api";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Pagination from "../../components/Pagination/Pagination";

const Search = () => {
  // const [searchQuery, setSearchQuery] = useState("")
  const [type, setType] = useState("movie");
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState([1]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchSearchQuery(searchValue, activePage, type)
      .then(res => {
        // console.log("Search Value: ", searchValue)
        console.log(res, "res");
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue, activePage, type]);
  const onClear = () => {
    setSearchValue("");
    console.log(searchValue);
  };
  const handleSearch = e => {
    e.preventDefault();
    setSearchValue(tempSearchValue);

    // setIsLoading(true)
    console.log("type is: " + type);
    console.log("Query is: " + tempSearchValue);
    e.target.value = "";
  };
  // const results = data.filter((item) => item?.media_type !== "person")
  return (
    <>
      {/* <div className="under-navbar h-full"> */}
      <div className="min-h-screen w-full  pb-8">
        <div className="mx-auto h-full max-w-screen-xl">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex place-content-center pt-10"
          >
            <input
              className="clamp-width-input rounded-s-lg bg-gray-700 px-6 py-2 text-center outline-0 focus:outline-none"
              placeholder="Type here"
              value={tempSearchValue}
              onChange={e => setTempSearchValue(e.target.value)}
              // defaultValue='Search...'
              // value={value}
              // onChange={(e) => setQuery(e.target.value)}
              // onInput={onInput}
            />
            <select
              className="w-[120px] rounded-e-lg bg-gray-500 px-3 outline-none"
              onChange={e => {
                setActivePage(1);
                setType(e.target.value);
              }}
              defaultValue={"DEFAULT"}
              onSelect={onClear}
            >
              <option value={"DEFAULT"} disabled>
                Choose...
              </option>
              <option value="tv">TV Show</option>
              <option value="movie">Movie</option>
            </select>
          </form>
          {/* {!searchValue && <ProgressBar />} */}

          {isLoading && <ProgressBar />}
          {data?.length > 0 && !isLoading && (
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          )}

          <div className="movie-grid h-full">
            {data?.length > 0 &&
              // !isLoading &&
              // data.filter(
              //     (item) =>
              //         item?.media_type !== "person" ||
              //         item?.backdrop_path !== null,
              // ) &&
              data.map((item, i) => (
                <MovieCard key={item.id} item={item} type={type} />
              ))}
          </div>
          {data?.length === 0 && !isLoading && (
            <h3 className="mt-10  text-center text-sm">Type To search</h3>
          )}
          {data?.length > 0 && !isLoading && (
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              setActivePage={setActivePage}
            />
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Search;

// bg-gray-100 text-black  dark:bg-gray-600 dark:text-gray-200
