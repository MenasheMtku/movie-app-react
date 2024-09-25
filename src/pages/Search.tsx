import { useEffect, useState } from "react";
import MovieCard from "../components/CardVertical/VerticalCard";
import ProgressBar from "../components/ProgressBar";
import "../index.css";
import { fetchSearchQuery } from "../services/api";
import LoadMoreButton from "../components/LoadMoreButton";

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  overview?: string;
};

type FetchResponse = {
  page: number;
  results: SearchResult[];
  total_pages: number;
};

const Search = () => {
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [searchValue, setSearchValue] = useState<string>("");
  const [tempSearchValue, setTempSearchValue] = useState<string>("");
  const [data, setData] = useState<SearchResult[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Function to fetch search results and append data
  const loadSearchResults = (page: number) => {
    if (page > totalPages) return;
    setIsLoading(page === 1);
    setLoadingMore(page > 1);

    fetchSearchQuery(searchValue, page, type)
      .then((res: FetchResponse) => {
        // Append new data
        setData(prevData => [...prevData, ...res?.results]);
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

  useEffect(() => {
    if (searchValue) {
      setData([]);
      loadSearchResults(1);
    }
  }, [searchValue, type]);

  const onClear = () => {
    setSearchValue("");
    console.log(searchValue);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1);
    console.log("Searching for:", tempSearchValue, "Type:", type);
  };

  const loadMoreResults = () => {
    loadSearchResults(activePage + 1);
  };

  return (
    <>
      {/* <div className="min-h-screen w-full pb-8 "> */}
      <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4">
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
              setType(e.target.value as "movie" | "tv");
            }}
            defaultValue={"DEFAULT"}
            onSelect={onClear}
          >
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
      {/* </div> */}
    </>
  );
};

export default Search;
