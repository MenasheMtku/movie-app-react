import { useEffect, useState } from "react"
import "./form.css"
// import { url, key, requests } from "../../request";

import CardItem from "../CardItem/CardItem"

// const URL = url;
// const KEY = key;

const Form = () => {
    console.log("Form")
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState([""])
    const [value, setValue] = useState("")

    const onInput = (e) => setValue(e.target.value)

    const onClear = () => {
        setValue("")
    }

    // const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    // const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
    // const popular = API_URL + "movie/popular?api_key=" + API_KEY;
    const popular = requests.requestPopular
    // console.log(popular);
    const API_SEARCH = URL + "search/movie?api_key=" + KEY + "&query="

    const fetchData = () => {
        fetch(popular)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console?.error(err))
    }

    // useEffect(() => {
    //   fetchData();
    // }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        e.target.value = ""
        fetch(API_SEARCH + query + "")
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
    }

    // console.log(movies);
    return (
        <>
            <div>
                <form
                    onSubmit={handleSearch}
                    className="mx-auto my-5 flex place-content-center"
                >
                    <input
                        className="clamp-width-input rounded-l-lg px-6 py-2 text-center outline-0 focus:outline-none"
                        type="text"
                        placeholder="Type here"
                        // defaultValue='Search...'
                        value={value}
                        onChange={(e) => setQuery(e.target.value)}
                        onInput={onInput}
                    />
                    <button
                        onClick={onClear}
                        onSubmit={(e) => setQuery(e.target.value)}
                        className="clamp-width-button rounded-r-lg bg-gray-700 px-6 py-2 outline-0"
                    >
                        search
                    </button>
                </form>
            </div>
            <div className="movie-grid mb-4">
                {movies.map((movie) => (
                    <CardItem key={movie.id} {...movie} />
                ))}
            </div>
        </>
    )
}

export default Form
