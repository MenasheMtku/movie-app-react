"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "../../index.css";
import { defaultImage, imagePath } from "@/services/api";
import Poster from "@/components/Poster";
import Skeleton from "@/components/Skeleton";
import { useWatchlist } from "@/contexts/watchlistContext/WatchlistContext";

interface Item {
  poster_path?: string;
  title?: string;
  name?: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  id: number;
}

const VerticalCard = ({ item, type }: { item: Item; type: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isInWatchlist, add, remove } = useWatchlist();
  const title = item?.title || item?.name || "";
  let imgSrc = imagePath + item?.poster_path;
  if (!item?.poster_path) {
    imgSrc = defaultImage;
  }
  const detailsUrl = `/${type}/${item?.id}`;
  const inList = isInWatchlist(item.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inList) {
      remove(item.id);
    } else {
      add({ id: item.id, type, title, poster_path: item.poster_path });
    }
  };

  return (
    <div className="pb-2">
      <Link href={detailsUrl}>
        <motion.div
          className="relative mt-1 overflow-hidden rounded-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Poster
            src={imgSrc}
            title={title}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0">
              <Skeleton />
            </div>
          )}
          <motion.button
            onClick={handleWatchlist}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={inList ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            {inList ? <BsBookmarkFill size={14} /> : <BsBookmark size={14} />}
          </motion.button>
        </motion.div>
      </Link>
    </div>
  );
};

export default memo(VerticalCard);
