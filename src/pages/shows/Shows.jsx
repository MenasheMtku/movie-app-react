import { tvShowsReq } from "../../request"
import { useState } from "react"
import CardItem from "../../components/CardItem/CardItem.jsx"
import "../../index.css"
const Shows = () => {
    const [shows, setShows] = useState([])
    const popular = tvShowsReq.reqPopularTv

    const fetchData = () => {
        fetch(popular)
            .then((res) => res.json())
            .then((data) => setShows(data.results))
            .catch((err) => console.error(err))
    }

    fetchData()

    return (
        <>
            <div className="under-navbar  bg-black/70">
                <div className="mx-auto max-w-screen-xl">
                    <h1 className="flex justify-center py-2 text-4xl font-bold ">
                        Popular TV Shows
                    </h1>
                    <div className="movie-grid mb-4">
                        {shows.map((movie) => (
                            <CardItem key={movie.id} {...movie} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shows
