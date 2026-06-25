import React from "react";
import { minutesToHours, shortenOverview } from "@/utils/helpers";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeSharp } from "react-icons/io5";
import { DetailsType } from "@/types/movie";

type DetailsProps = {
  details: DetailsType;
  type: string;
};

const Details: React.FC<DetailsProps> = ({ details, type }) => {
  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-baseline gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-content leading-tight">
          {title}
        </h1>
        {releaseDate && (
          <span className="text-xl text-content_secondary font-normal flex-shrink-0">
            {new Date(releaseDate).getFullYear()}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-content_secondary">
        <div className="flex items-center gap-1.5">
          <BsCalendar3 className="size-3.5" />
          <span>
            {releaseDate
              ? new Date(releaseDate).toLocaleDateString("en-US")
              : "N/A"}{" "}
            (US)
          </span>
        </div>
        {type === "movie" && details?.runtime ? (
          <div className="flex items-center gap-1.5">
            <IoTimeSharp className="size-3.5" />
            <span>{minutesToHours(details.runtime)}</span>
          </div>
        ) : null}
      </div>

      {details?.tagline && (
        <p className="text-content_secondary italic text-sm">
          &ldquo;{details.tagline}&rdquo;
        </p>
      )}

      {details?.overview ? (
        <div>
          <h2 className="text-lg font-semibold text-content mb-1">Overview</h2>
          <p className="text-content/80 leading-relaxed text-base">
            {shortenOverview(details.overview)}
          </p>
        </div>
      ) : (
        <p className="text-sm text-content_secondary">Overview unavailable</p>
      )}

      {details?.genres && details.genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {details.genres.map(genre => (
            <span
              key={genre?.id}
              className="bg-primary/15 text-primary border border-primary/30 rounded-full px-3 py-0.5 text-xs font-semibold"
            >
              {genre?.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
