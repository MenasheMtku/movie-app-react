import React from "react";
import { imagePath } from "../../services/api";
import { defaultImage } from "../../services/api";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
  shortenOverview,
} from "../../utils/helpers";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { data } from "autoprefixer";

const Details = ({ details, type }) => {
  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;
  let imgSrc = `${imagePath}/${details?.poster_path}`;
  if (details?.poster_path === null) {
    imgSrc = defaultImage;
  }
  const rateColor = resolveRatingColor(details?.vote_average);

  return (
    <>
      <div className="flex flex-row items-baseline gap-2 md:gap-1 text-white">
        <p className="text-xl">{title}</p>
        <p className="text-xl font-semibold text-gray-400">
          {new Date(releaseDate).getFullYear()}
        </p>
      </div>
      <div className="mb-5 mt-1 flex items-center gap-4 dark:text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <BsCalendar3 className="mr-2 text-gray-400" />
            <p className="text-sm">
              {new Date(releaseDate).toLocaleDateString("en-US")} (US)
            </p>
          </div>
          {type === "movie" && (
            <>
              <span>*</span>
              <div className="flex items-center">
                <IoTimeSharp className="mr-1" mr="2" color={"gray.400"} />
                <p className="text-sm">{minutesTohours(details?.runtime)}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-start text-right">
        {/* rating progress bar */}
        <a>
          <CircularProgressbar
            className="mr-8 size-12"
            text={ratingToPercentage(details?.vote_average) + "%"}
            strokeWidth={4}
            styles={buildStyles({
              textColor: `${rateColor}`,
              pathColor: `${rateColor}`,
              trailColor: "gray",
              textSize: "28px",
            })}
          ></CircularProgressbar>
        </a>
      </div>
      {data?.tagline && (
        <p className="text-white my-5 text-sm italic">{details?.tagline}</p>
      )}
      {details?.overview ? (
        <>
          <h2 className="text-white dark:text-blue-gray-200 my-2 text-xl">
            Overview
          </h2>
          <p className="text-white dark:text-blue-gray-200 mb-3 w-full text-base md:w-96">
            {shortenOverview(details?.overview)}
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-2 text-sm">Overview Unavailable</h2>
        </>
      )}
      <div className="mt-6 flex w-full flex-wrap  gap-2 md:flex-row">
        {details?.genres?.map(genre => (
          <p
            className=" rounded bg-gray-200 text-black p-1 text-center font-bold text-sm dark:text-gray-200 dark:bg-gray-500"
            key={genre?.id}
            // p="1"
          >
            {genre?.name}
          </p>
        ))}
      </div>
    </>
  );
};

export default Details;
