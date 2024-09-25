import React from "react";
import { imagePath } from "../../services/api";
import { defaultImage } from "../../services/api";
import {
  minutesToHours,
  ratingToPercentage,
  resolveRatingColor,
  shortenOverview,
} from "../../utils/helpers";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { data } from "autoprefixer";

type DetailsProps = {
  details: {
    title?: string;
    name?: string;
    first_air_date?: string;
    release_date?: string;
    poster_path?: string | null;
    vote_average?: number;
    runtime?: number;
    tagline?: string;
    overview?: string;
    genres?: Array<{ id: number; name: string }>;
  };
  type: string;
};

const Details: React.FC<DetailsProps> = ({ details, type }) => {
  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;
  let imgSrc = `${imagePath}/${details?.poster_path}`;
  if (details?.poster_path === null) {
    imgSrc = defaultImage;
  }
  const rateColor = resolveRatingColor(details?.vote_average || 0);

  return (
    <>
      <div className="flex flex-row items-baseline gap-2 md:gap-1 text-white">
        <p className="text-xl">{title}</p>
        <p className="text-xl font-semibold text-gray-400">
          {releaseDate ? new Date(releaseDate).getFullYear() : ""}
        </p>
      </div>
      <div className="mb-5 mt-1 flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-white">
            <BsCalendar3 className="mr-2 " />
            <p className="text-sm">
              {releaseDate
                ? new Date(releaseDate).toLocaleDateString("en-US")
                : "N/A"}
              (US)
            </p>
          </div>
          {type === "movie" && (
            <div className="text-white flex items-center gap-2">
              <span>*</span>
              <div className="flex">
                <IoTimeSharp className="mr-1" color={"gray.400"} />
                <p className="text-sm">
                  {minutesToHours(details?.runtime ?? 0)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start text-right">
        {/* rating progress bar */}
        <a>
          <CircularProgressbar
            value={+ratingToPercentage(details?.vote_average ?? 0)}
            className="mr-8 size-12"
            text={ratingToPercentage(details?.vote_average ?? 0) + "%"}
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
      {details?.tagline && (
        <p className="text-white my-5 text-sm italic">{details?.tagline}</p>
      )}
      {details?.overview ? (
        <>
          <h2 className="text-white  my-2 text-xl">Overview</h2>
          <p className="text-white  mb-3 w-full text-base md:w-96">
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
          >
            {genre?.name}
          </p>
        ))}
      </div>
    </>
  );
};

export default Details;
