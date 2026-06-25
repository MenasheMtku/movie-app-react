"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsBookmarkX } from "react-icons/bs";
import { useWatchlist } from "@/contexts/watchlistContext/WatchlistContext";
import { imagePath, defaultImage } from "@/services/api";
import Poster from "@/components/Poster";

const Watchlist = () => {
  const { watchlist, remove } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14 flex flex-col items-center justify-center gap-4">
        <BsBookmarkX size={64} className="text-content/30" />
        <p className="text-2xl font-semibold text-content/50">
          Your watchlist is empty
        </p>
        <p className="text-content/40">
          Browse{" "}
          <Link href="/movies" className="text-primary hover:underline">
            movies
          </Link>{" "}
          or{" "}
          <Link href="/shows" className="text-primary hover:underline">
            shows
          </Link>{" "}
          and bookmark ones you want to watch.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[var(--max-width)] p-4 mt-14">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-6 px-4">
        My Watchlist
        <span className="ml-2 text-lg text-content/50 font-normal">
          ({watchlist.length})
        </span>
      </h1>
      <div className="movie-grid">
        {watchlist.map(item => {
          const imgSrc = item.poster_path
            ? imagePath + item.poster_path
            : defaultImage;
          return (
            <div
              key={item.id}
              className="relative bg-bkg_alt p-2 rounded-lg overflow-hidden text-center group"
            >
              <Link href={`/${item.type}/${item.id}`}>
                <motion.div
                  className="relative overflow-hidden rounded-md"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Poster src={imgSrc} title={item.title} />
                </motion.div>
              </Link>
              <p className="mt-2 text-sm font-medium truncate px-1">
                {item.title}
              </p>
              <motion.button
                onClick={() => remove(item.id)}
                whileTap={{ scale: 0.8 }}
                aria-label={`Remove ${item.title} from watchlist`}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-red-600/80 transition-colors"
              >
                <BsBookmarkX size={14} />
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
