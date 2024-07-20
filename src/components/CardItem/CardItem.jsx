import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./cardItem.css";
import { defaultImage, imagePath } from "../../services/api";
import { Link } from "react-router-dom";
import "../../index.css";
import ImageItem from "../ImageItem/ImageItem";

const CardItem = ({ item, type }) => {
  const title = item?.title || item?.name;
  let imgSrc = imagePath + item?.poster_path;
  if (item?.poster_path === null) {
    imgSrc = defaultImage;
  }
  const voteRate = item?.vote_average?.toFixed(1);
  const release_date = item?.release_date || item?.first_air_date;
  const detailsUrl = `/${type}/${item?.id}`;

  return (
    <>
      <div className="item pb-2">
        <Link to={detailsUrl}>
          <div className="movieCard relative mt-1  overflow-hidden rounded-md object-cover grid ">
            <div className="transition-all hover:scale-105 hover:ease-in duration-200">
              {/* image */}
              <ImageItem imgSrc={imgSrc} title={title} />
            </div>

            <div className="overview absolute bottom-0 left-0 right-0 h-[45%]">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="px-2 text-center text-sm font-semibold">
                  {title.replace(/:/g, "").split(" ").slice(0, 3).join(" ")}
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
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardItem;

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
