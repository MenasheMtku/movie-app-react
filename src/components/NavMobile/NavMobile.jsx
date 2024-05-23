import { React, useRef, useState } from "react"
import { useClickAway } from "react-use"
import { AnimatePresence, motion } from "framer-motion"
import { Squash as Hamburger } from "hamburger-react"
import { Link } from "react-router-dom"
import "../../index.css"
const NavMobile = () => {
    const [isOpen, setOpen] = useState(false)
    const ref = useRef(null)

    useClickAway(ref, () => setOpen(false))

    return (
        <div
            ref={ref}
            className="absolute z-[100] flex w-full items-center justify-between bg-black/50 px-5 py-2 lg:hidden"
        >
            <Link to="/" className="text-2xl text-cyan-300">
                TMDB
            </Link>
            <Hamburger toggled={isOpen} size={25} toggle={setOpen} />
            {isOpen && (
                <div className="shadow-4xl  fixed left-0 right-0 top-[3.5rem] z-[200] flex h-[50vh] flex-col border-b border-b-white/20 bg-black/95 p-5">
                    <ul className="flex h-full w-full flex-col items-center justify-evenly gap-5">
                        <Link className="text-lg" to="/">
                            Home
                        </Link>
                        <Link className="text-lg" to="/movies">
                            Movies
                        </Link>
                        <Link className="text-lg" to="/shows">
                            TV Shows
                        </Link>
                        <Link className="text-lg" to="/search">
                            Search
                        </Link>
                    </ul>
                    {/* <ul className="grid gap-2">
                        {routes.map((route) => {
                            const { Icon } = route

                            
                            return (
                                <li
                                    key={route.title}
                                    className="w-full rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700 p-[0.08rem]"
                                >
                                    <a
                                        onClick={() => setOpen((prev) => !prev)}
                                        className={
                                            "flex w-full items-center justify-between rounded-xl bg-neutral-950 p-5"
                                        }
                                        href={route.href}
                                    >
                                        <span className="flex gap-1 text-lg">
                                            {route.title}
                                        </span>
                                        <Icon className="text-xl" />
                                    </a>
                                </li>
                            )
                        })}
                    </ul> */}
                </div>
            )}
        </div>
    )
}

export default NavMobile
