import { moviesReq, imageUrl } from "../request"
import { useEffect, useState } from "react"
import "../index.css"

const Home = () => {
    const [movies, setMovies] = useState([])

    const trending = moviesReq.reqTrending

    const movie = movies[Math.floor(Math.random() * movies.length)]
    useEffect(() => {
        fetch(trending)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console.error(err))
    }, [trending])

    console.log(movie)

    // console.log(movie.title);

    return (
        <div className="h-screen  w-full text-white">
            <div className="relative h-full w-full">
                {/* <div className="absolute h-full w-full bg-black/30 bg-gradient-to-r from-slate-950"></div> */}

                <img
                    className="h-full w-full object-cover"
                    src={
                        `https://image.tmdb.org/t/p/original/` +
                        movie?.backdrop_path
                    }
                    alt={movie?.title}
                />
                <div className="image-overlay absolute bottom-0 left-0 right-0 top-0"></div>
            </div>
        </div>
    )
}

export default Home
