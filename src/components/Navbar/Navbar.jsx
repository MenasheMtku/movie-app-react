import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
    return (
        <header className="absolute z-[100] flex w-full items-center justify-between bg-black/50 px-8 py-3 max-lg:hidden">
            <Link to="/" className="text-2xl text-cyan-300">
                TMDB
            </Link>
            <nav>
                <ul className="justify-between">
                    <Link className="mr-6 text-xl" to="/">
                        Home
                    </Link>
                    <Link className="mr-6 text-xl" to="/movies">
                        Movies
                    </Link>
                    <Link className="mr-6 text-xl" to="/shows">
                        TV Shows
                    </Link>
                    <Link className="mr-6 text-xl" to="/search">
                        Search
                    </Link>
                    {/* <a className='px-3' href='/'>
          Home
        </a>
        <a className='px-3' href='/movies'>
          Movies
        </a>
        <a className='px-3' href='/shows'>
          TV Shows
        </a> */}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
