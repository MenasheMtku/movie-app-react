import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import "../../index.css";
import { defaultImage, imagePathOriginal } from "../../services/api";

import Skeleton from "../Skeleton";
import PosterTitle from "../PosterTitle";
import Poster from "../Poster";

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
  // ------------------------------------------
  const title = item?.title || item?.name;
  let imgSrc = imagePathOriginal + item?.backdrop_path;
  if (item?.backdrop_path === null) {
    imgSrc = defaultImage;
  }
  const detailsUrl = `/${type}/${item?.id}`;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <>
      <div className="pb-2 ">
        <Link to={detailsUrl}>
          <div className="relative mt-1 overflow-hidden">
            <div className="transition-all hover:scale-105 hover:ease-in duration-300">
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <Poster src={imgSrc} title={title || ""} />
                </>
              )}
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
    </>
  );
};

export default HorizontalCard;

{
  /* <div className="text-sm text-center grid gap-1">
<div className="grid grid-cols-[1fr_1fr_1fr] place-items-center">
  <p>{type}</p>
  <p>{new Date(release_date).getFullYear() || "N/A"}</p>
  <p>{voteRate}</p>
</div>
<a href="#" className="">
  {title.replace(/:/g, "").split(" ").slice(0, 3).join(" ")}
</a>
</div> */
}

{
  /* <div className="overview absolute bottom-0 left-0 right-0 h-[45%]">
<div className="flex h-full flex-col items-center justify-center gap-2">
  <p className="px-2 text-center text-sm font-semibold">
    {title
      .replace(/:/g, "")
      .split(" ")
      .slice(0, 3)
      .join(" ")}
  </p>
  <p className="px-3 text-xs">
    {new Date(release_date).getFullYear() || "N/A"}
  </p>
  <div className="flex justify-between px-3">
    <p className="bg-slate-500 rounded-full px-2 py-1 text-xs text-white">
      {voteRate}
    </p>
  </div>
</div>
</div> */
}
