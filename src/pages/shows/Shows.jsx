import { useEffect, useState } from "react"
import CardItem from "../../components/CardItem/CardItem.jsx"
import "../../index.css"
import { fetchDiscoverShows } from "../../services/api.js"
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx"
import { FaCaretDown } from "react-icons/fa"
import Pagination from "../../components/Pagination/Pagination"
const Shows = () => {
    const [shows, setShows] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [sortBy, setSortBy] = useState("popularity.desc")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchDiscoverShows(activePage, sortBy)
            .then((res) => {
                console.log(res, "shows res")
                setShows(res?.results)
                setActivePage(res?.page)
                setTotalPages(res?.total_pages)
            })
            .catch((err) => {
                console.log(err, "err")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [activePage, sortBy])

    // if (loading) {
    //     return <ProgressBar />
    // }
    return (
        <>
            <div className="min-h-full bg-gray-800/40 pb-8">
                <div className="mx-auto min-h-screen max-w-screen-xl">
                    <div className="flex pt-8">
                        <h1 className="px-4  text-xl md:text-3xl md:font-semibold">
                            TV Shows
                        </h1>
                        {/* <div className="relative flex h-[40px] min-w-48 content-center"> */}
                        <select
                            className="w-[180px] rounded-lg bg-gray-500 px-3 font-semibold text-black "
                            onChange={(e) => {
                                setActivePage(1)
                                setSortBy(e.target.value)
                            }}
                        >
                            <option value="popularity.desc">Popular</option>
                            <option value="vote_average.desc&vote_count.gte=1000">
                                Top Rated
                            </option>
                        </select>
                    </div>
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
                                .filter((item) => item?.backdrop_path !== null)
                                .map((item) => (
                                    <CardItem
                                        key={item?.id}
                                        item={item}
                                        type="tv"
                                    />
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
    )
}

export default Shows
