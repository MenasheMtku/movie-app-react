// import { useState, useEffect } from "react"
// import { fetchDiscoverMovies } from "../../services/api"
// const useFetch = () => {
//     const [data, setData] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [activePage, setActivePage] = useState(1)
//     const [totalPages, setTotalPages] = useState(1)
//     const [sortBy, setSortBy] = useState("popularity.desc")
//     const [error, setError] = useState(null)
//     useEffect(() => {
//         // setLoading(true)
//         fetchDiscoverMovies(activePage, sortBy)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw Error("Could not fetch data for this resource")
//                 }
//                 console.log(res, "res")
//                 setData(res?.results)
//                 setActivePage(res?.page)
//                 setTotalPages(res?.total_pages)
//             })
//             .catch((err) => {
//                 setError(err)
//                 console.log(err, "err")
//             })
//             .finally(() => {
//                 setIsLoading(false)
//             })
//     }, [activePage, sortBy])

//     return { data, isLoading, error, activePage, totalPages }
// }

// export default useFetch
