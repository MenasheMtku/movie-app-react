import React, { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import "../../index.css";
import { defaultImage, imagePath } from "../../services/api";
import Poster from "../Poster";
import Skeleton from "../Skeleton";

const VerticalCard = ({ item, type }) => {
  const [isLoading, setIsLoading] = useState(true);
  // ------------------------------------------
  const title = item?.title || item?.name;
  let imgSrc = imagePath + item?.poster_path;
  if (item?.poster_path === null) {
    imgSrc = defaultImage;
  }
  const voteRate = item?.vote_average?.toFixed(1);
  const release_date = item?.release_date || item?.first_air_date;
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
              {isLoading ? <Skeleton /> : <Poster src={imgSrc} alt={title} />}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VerticalCard;
