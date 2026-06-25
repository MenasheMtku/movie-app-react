"use client";

import { useParams } from "next/navigation";
import "@/index.css";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
  defaultImage,
} from "@/services/api";

import ProgressBar from "@/components/ProgressBar";
import VideoComponent from "@/components/Video/VideoComponent";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import dynamic from "next/dynamic";
import Details from "@/components/Details/Details";

const Swiper = dynamic(
  () => import("@/components/MySwiper/Swiper").then(m => ({ default: m.Swiper })),
  { ssr: false }
);
const SwiperSlide = dynamic(
  () => import("@/components/MySwiper/Swiper").then(m => ({ default: m.SwiperSlide })),
  { ssr: false }
);
import Poster from "@/components/Poster";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ratingToPercentage, resolveRatingColor } from "@/utils/helpers";
import { CastType, DetailsType, VideoType } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

type Props = {
  type: "movie" | "tv";
};

const DetailsPage = ({ type }: Props) => {
  const params = useParams();
  const id = params.id as string;

  const { data: details, isLoading: detailsLoading, isError } = useQuery<DetailsType>({
    queryKey: ["details", type, id],
    queryFn: () => fetchDetails(type, id),
    enabled: !!id,
  });

  const { data: creditsData } = useQuery({
    queryKey: ["credits", type, id],
    queryFn: () => fetchCredits(type, id),
    enabled: !!id,
  });

  const { data: videosData } = useQuery({
    queryKey: ["videos", type, id],
    queryFn: () => fetchVideos(type, id),
    enabled: !!id,
  });

  const cast: CastType[] = creditsData?.cast?.slice(0, 10) ?? [];
  const video: VideoType | null =
    videosData?.results?.find(
      (v: { type: string }) => v?.type === "Trailer"
    ) ?? null;
  const videos: VideoType[] =
    videosData?.results
      ?.filter((v: { type: string }) => v?.type !== "Trailer")
      ?.slice(0, 10) ?? [];

  const rateColor = resolveRatingColor(details?.vote_average || 0);

  if (detailsLoading) {
    return <ProgressBar />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center pt-[var(--nav-height)]">
        <h2 className="text-2xl font-semibold">
          {type === "movie" ? "Movie" : "Show"} not found
        </h2>
        <p className="text-content/60 max-w-md">
          We couldn&apos;t load this {type === "movie" ? "movie" : "show"}. It may
          not exist or there was a network error.
        </p>
        <a
          href={type === "movie" ? "/movies" : "/shows"}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Browse {type === "movie" ? "movies" : "shows"}
        </a>
      </div>
    );
  }

  const title = details?.title || details?.name;
  const imgSrc = details?.poster_path
    ? `${imagePath}${details.poster_path}`
    : defaultImage;
  const wide_image = details?.backdrop_path
    ? `${imagePathOriginal}${details.backdrop_path}`
    : details?.poster_path
      ? `${imagePathOriginal}${details.poster_path}`
      : defaultImage;

  return (
    <>
      <div className="min-h-screen w-full pt-[var(--nav-height)]">
        <div className="box-1">
          <div
            className="relative image-dark-overlay-bottom z-10 flex h-auto w-full items-center bg-cover bg-center bg-no-repeat py-2 md:h-[500px]"
            style={{ backgroundImage: `url(${wide_image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-gray-900/85"></div>

            <div className="container relative z-10 mx-auto my-4 w-11/12 md:my-0">
              <div className="container flex flex-col gap-4 rounded-full px-2 md:flex-row md:items-center md:gap-10">
                <div className="w-[220px] relative">
                  <Poster src={imgSrc} title={title ?? ""} />
                  <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                  <div className="absolute bottom-0 p-3 flex items-center justify-center z-20">
                    <a>
                      <CircularProgressbar
                        value={+ratingToPercentage(details?.vote_average ?? 0)}
                        className="mr-2 size-12"
                        text={ratingToPercentage(details?.vote_average ?? 0) + "%"}
                        strokeWidth={4}
                        styles={buildStyles({
                          textColor: rateColor,
                          pathColor: rateColor,
                          trailColor: "gray",
                          textSize: "28px",
                        })}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <Details details={details || {}} type={type} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-2 max-w-[1280px] mx-auto pb-10 pt-2 grid grid-cols-1 gap-10">
          <div>
            {cast.length === 0 ? (
              <h2 className="mb-5 ml-4 mt-2 text-base uppercase">No cast found</h2>
            ) : (
              <h2 className="mb-5 ml-4 mt-2 text-base uppercase">Cast</h2>
            )}
            <div className="ml-4 items-center">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={5}
                spaceBetween={10}
                breakpoints={{
                  0: { slidesPerView: 2 },
                  500: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {cast.map(item => (
                  <SwiperSlide key={item.id}>
                    <div className="flex flex-col gap-2 items-center">
                      <div className="flex justify-center items-center w-[160px] h-[160px] overflow-hidden rounded-full shadow-md bg-bkgDarker transform transition duration-300">
                        {item?.profile_path ? (
                          <img
                            src={`${imagePath}${item.profile_path}`}
                            className="object-cover w-full h-full"
                            alt={item?.name}
                          />
                        ) : (
                          <span className="text-center font-semibold text-lg">
                            {item?.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="mt-1">
            {!video ? (
              <h2 className="mb-5 ml-4 mt-2 text-base uppercase">No Trailer found</h2>
            ) : (
              <>
                <h2 className="mb-5 ml-4 mt-2 text-base uppercase">Trailer</h2>
                <div className="mx-auto ml-4 mr-4 max-w-4xl">
                  <div className="relative h-0 pb-[56.25%] pt-[25px]">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${video?.key}?si=${video?.id}`}
                        title="YouTube video player"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="mb-10 mt-5 hidden gap-3 overflow-auto md:flex">
                    {videos.map(item => (
                      <div className="min-w-72" key={item?.id}>
                        <VideoComponent id={item?.key} small />
                        <h1 className="mt-2 text-sm font-bold">{item?.name}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
