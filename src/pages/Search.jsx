import { useEffect, useState } from "react";
import MovieCard from "../components/CardVertical/VerticalCard";
import ProgressBar from "../components/ProgressBar";
import "../index.css";
import { fetchSearchQuery } from "../services/api";
import LoadMoreButton from "../components/LoadMoreButton";

const Search = () => {
  const [type, setType] = useState("movie");
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState([1]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to fetch search results and append data
  const loadSearchResults = page => {
    if (page > totalPages) return; // Stop loading if all pages are loaded
    setIsLoading(page === 1); // Set loading state for first page
    setLoadingMore(page > 1); // Set loadingMore state for subsequent pages

    fetchSearchQuery(searchValue, page, type)
      .then(res => {
        setData(prevData => [...prevData, ...res?.results]); // Append new data
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch(err => {
        console.log("Error fetching search results", err);
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false);
      });
  };
  // Fetch search results whenever the search value or type changes
  useEffect(() => {
    if (searchValue) {
      setData([]); // Clear previous search data
      loadSearchResults(1); // Fetch first page of results
    }
  }, [searchValue, type]);

  const onClear = () => {
    setSearchValue("");
    console.log(searchValue);
  };
  const handleSearch = e => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1); // Reset to first page
    console.log("Searching for:", tempSearchValue, "Type:", type);
  };

  const loadMoreResults = () => {
    loadSearchResults(activePage + 1);
  };

  return (
    <>
      <div className="min-h-screen w-full pb-8">
        <div className="mx-auto h-full max-w-[1440px]">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex place-content-center pt-10"
          >
            <input
              className="clamp-width-input rounded-s-lg bg-bkg border-2 border-content text-content px-6 py-2 text-center outline-0 focus:outline-none"
              placeholder="Type here"
              value={tempSearchValue}
              onChange={e => setTempSearchValue(e.target.value)}
            />
            <select
              className="w-[120px] rounded-e-lg bg-content text-bkg px-3 outline-none"
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

          {/* Progress Bar for loading */}
          {isLoading && <ProgressBar />}
          <div className="movie-grid h-full mt-8">
            {data?.length > 0 &&
              data.map((item, i) => (
                <MovieCard key={item.id} item={item} type={type} />
              ))}
          </div>
          {!isLoading && activePage < totalPages && (
            <div className="flex justify-center mt-6">
              <LoadMoreButton loading={loadingMore} onClick={loadMoreResults}>
                Load More
              </LoadMoreButton>
            </div>
          )}
          {data?.length === 0 && !isLoading && (
            <h3 className="text-center text-sm font-medium">Type To search</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
