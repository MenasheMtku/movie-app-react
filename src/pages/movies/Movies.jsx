import { moviesReq } from "../../request"
import { useState } from "react"
import CardItem from "../../components/CardItem/CardItem"
// import "./movies.css";
import "../../index.css"

const Movies = () => {
    const [movies, setMovies] = useState([])
    const popular = moviesReq.reqPopular

    const fetchData = () => {
        fetch(popular)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console?.error(err))
    }

    fetchData()

    return (
        <>
            <div className="under-navbar bg-black/70 ">
                <div className="mx-auto max-w-screen-xl">
                    <h1 className="flex justify-center py-2 text-4xl font-bold ">
                        Popular Movies
                    </h1>
                    <div className="movie-grid mb-4">
                        {movies.map((movie) => (
                            <CardItem key={movie.id} {...movie} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movies
