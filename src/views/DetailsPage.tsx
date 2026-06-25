"use client";

import { useParams } from "next/navigation";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
  defaultImage,
} from "@/services/api";

import VideoComponent from "@/components/Video/VideoComponent";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import dynamic from "next/dynamic";
import Details from "@/components/Details/Details";
import Poster from "@/components/Poster";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ratingToPercentage, resolveRatingColor } from "@/utils/helpers";
import { CastType, DetailsType, VideoType } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useWatchlist } from "@/contexts/watchlistContext/WatchlistContext";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const Swiper = dynamic(
  () =>
    import("@/components/MySwiper/Swiper").then(m => ({ default: m.Swiper })),
  { ssr: false },
);
const SwiperSlide = dynamic(
  () =>
    import("@/components/MySwiper/Swiper").then(m => ({
      default: m.SwiperSlide,
    })),
  { ssr: false },
);

type Props = {
  type: "movie" | "tv";
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-l-4 border-primary pl-3 text-lg font-semibold text-content uppercase tracking-wide mb-5">
    {children}
  </h2>
);

const DetailsPage = ({ type }: Props) => {
  const params = useParams();
  const id = params.id as string;
  const { add: addToWatchlist, remove: removeFromWatchlist, isInWatchlist } = useWatchlist();

  const {
    data: details,
    isLoading: detailsLoading,
    isError,
  } = useQuery<DetailsType>({
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
    videosData?.results?.find((v: { type: string }) => v?.type === "Trailer") ??
    null;
  const videos: VideoType[] =
    videosData?.results
      ?.filter((v: { type: string }) => v?.type !== "Trailer")
      ?.slice(0, 10) ?? [];

  const rateColor = resolveRatingColor(details?.vote_average || 0);

  if (detailsLoading) {
    return (
      <div className="min-h-[520px] md:h-[70vh] w-full bg-bkgDarker animate-pulse pt-[var(--nav-height)]" />
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center pt-[var(--nav-height)]">
        <h2 className="text-2xl font-semibold text-content">
          {type === "movie" ? "Movie" : "Show"} not found
        </h2>
        <p className="text-content_secondary max-w-md">
          We couldn&apos;t load this {type === "movie" ? "movie" : "show"}. It
          may not exist or there was a network error.
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
  const backdropSrc = details?.backdrop_path
    ? `${imagePathOriginal}${details.backdrop_path}`
    : details?.poster_path
      ? `${imagePathOriginal}${details.poster_path}`
      : defaultImage;

  const watchlistItem =
    details?.id != null
      ? { id: details.id, type, title: title ?? "", poster_path: details.poster_path ?? "" }
      : null;
  const inWatchlist = watchlistItem ? isInWatchlist(watchlistItem.id) : false;

  return (
    <div className="min-h-screen w-full">
      {/* ── Hero ── */}
      <section
        className="relative w-full min-h-[520px] md:h-[70vh] max-h-[800px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropSrc})` }}
      >
        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bkg via-bkg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bkg/95 via-bkg/50 to-transparent" />

        <motion.div
          {...fadeUp(0.1)}
          className="relative z-10 max-w-[1280px] mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-end pb-10 pt-[calc(var(--nav-height)+2rem)] h-full"
        >
          {/* Poster */}
          <div className="w-[180px] md:w-[240px] flex-shrink-0 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Poster src={imgSrc} title={title ?? ""} />
            </div>
            {/* Rating badge */}
            <div className="absolute -bottom-3 -right-3 bg-bkg rounded-full p-1 shadow-lg">
              <CircularProgressbar
                value={+ratingToPercentage(details?.vote_average ?? 0)}
                className="size-14"
                text={ratingToPercentage(details?.vote_average ?? 0) + "%"}
                strokeWidth={4}
                styles={buildStyles({
                  textColor: rateColor,
                  pathColor: rateColor,
                  trailColor: "transparent",
                  textSize: "28px",
                })}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pb-2 flex flex-col gap-4">
            <Details details={details || {}} type={type} />
            {watchlistItem && (
              <button
                onClick={() =>
                  inWatchlist
                    ? removeFromWatchlist(watchlistItem.id)
                    : addToWatchlist(watchlistItem)
                }
                aria-label={
                  inWatchlist ? "Remove from watchlist" : "Add to watchlist"
                }
                className="self-start flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-sm font-semibold"
              >
                {inWatchlist ? (
                  <BsBookmarkFill className="size-4" />
                ) : (
                  <BsBookmark className="size-4" />
                )}
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-[1280px] mx-auto px-4 pb-16 flex flex-col gap-12 mt-10">

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section {...fadeUp(0.2)}>
            <SectionHeading>Cast</SectionHeading>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={5}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2 },
                500: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {cast.map(item => (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col items-center gap-2 py-1">
                    <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] overflow-hidden rounded-full shadow-md bg-bkgDarker flex-shrink-0">
                      {item?.profile_path ? (
                        <img
                          src={`${imagePath}${item.profile_path}`}
                          className="object-cover w-full h-full"
                          alt={item?.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-content_secondary text-xs text-center px-2">
                          {item?.name}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-content text-center line-clamp-1 w-full px-1">
                      {item.name}
                    </p>
                    {item.character && (
                      <p className="text-xs text-content_secondary text-center line-clamp-1 w-full px-1">
                        {item.character}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>
        )}

        {/* Trailer + clips */}
        {video && (
          <motion.section {...fadeUp(0.3)}>
            <SectionHeading>Trailer</SectionHeading>
            <div className="relative h-0 pb-[56.25%]">
              <div className="absolute inset-0">
                <iframe
                  className="h-full w-full rounded-xl"
                  src={`https://www.youtube.com/embed/${video.key}?si=${video.id}`}
                  title="YouTube video player"
                  allowFullScreen
                />
              </div>
            </div>

            {videos.length > 0 && (
              <div className="mt-6">
                <SectionHeading>More Videos</SectionHeading>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {videos.map(item => (
                    <div key={item.id} className="min-w-[260px] flex flex-col gap-1">
                      <VideoComponent id={item.key} small />
                      <p className="text-sm font-semibold text-content line-clamp-2">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}

        {!video && (
          <motion.p {...fadeUp(0.3)} className="text-content_secondary text-sm">
            No trailer available.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
