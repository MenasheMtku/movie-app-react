"use client";

import { memo, useState } from "react";
import Link from "next/link";
import "../../index.css";
import { defaultImage, imagePathOriginal } from "@/services/api";
import Skeleton from "@/components/Skeleton";
import PosterTitle from "@/components/PosterTitle";
import Poster from "@/components/Poster";

interface Item {
  title?: string;
  name?: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  id: number;
}

const HorizontalCard = ({ item, type }: { item: Item; type: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const title = item?.title || item?.name;
  let imgSrc = imagePathOriginal + item?.backdrop_path;
  if (!item?.backdrop_path) {
    imgSrc = defaultImage;
  }
  const detailsUrl = `/${type}/${item?.id}`;

  return (
    <div className="pb-2">
      <Link href={detailsUrl}>
        <div className="relative mt-1 overflow-hidden">
          <div className="transition-all hover:scale-105 hover:ease-in duration-300">
            {isLoading && <Skeleton />}
            <div style={{ display: isLoading ? "none" : "block" }}>
              <Poster
                src={imgSrc}
                title={title || ""}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      </Link>
      <div className="p-3">
        {isLoading ? (
          <div className="h-[5px] w-2/4 mx-auto bg-blue-gray-500/10 mt-0"></div>
        ) : (
          <PosterTitle title={item.title || ""} />
        )}
      </div>
    </div>
  );
};

export default memo(HorizontalCard);
