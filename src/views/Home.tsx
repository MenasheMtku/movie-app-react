"use client";

import React, { useEffect, useRef, useState } from "react";
// @ts-ignore: side-effect CSS import without type declarations
import "@/index.css";
import {
  fetchUpcomingMovies,
  imagePathOriginal,
  fetchTrendingShows,
  fetchPopularMovies,
  fetchVideos,
} from "@/services/api";

import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import VerticalCard from "@/components/CardVertical/VerticalCard";

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
import { FaYoutube } from "react-icons/fa";
import { Movie, Program, VideoType } from "@/types/movie";
import { useQuery, useQueries } from "@tanstack/react-query";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const { data: upcomingData, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: fetchUpcomingMovies,
  });

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
  });

  const { data: trendingShowsData, isLoading: showsLoading } = useQuery({
    queryKey: ["trending-shows"],
    queryFn: fetchTrendingShows,
  });

  const upcomingMovies: Movie[] = upcomingData?.results ?? [];
  const trendingMovies: Movie[] = popularData?.results ?? [];
  const trendingShows: Program[] = trendingShowsData?.results ?? [];
  const isLoading = upcomingLoading || popularLoading || showsLoading;

  const videoQueries = useQueries({
    queries: upcomingMovies.map(movie => ({
      queryKey: ["video", "movie", movie.id],
      queryFn: () => fetchVideos("movie", `${movie.id}`),
      enabled: upcomingMovies.length > 0,
      select: (data: { results: (VideoType & { site: string })[] }) => {
        return (
          data?.results?.find(
            v => v.site === "YouTube" && v.type === "Trailer",
          ) ?? null
        );
      },
    })),
  });

  const upcomingMoviesVideo: Record<number, VideoType | null> = {};
  upcomingMovies.forEach((movie, i) => {
    upcomingMoviesVideo[movie.id] = videoQueries[i]?.data ?? null;
  });

  useEffect(() => {
    if (!isModalOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  function handlePlayVideo(
    item: Movie,
    e: React.MouseEvent<HTMLButtonElement>,
  ): void {
    triggerButtonRef.current = e.currentTarget;
    setSelectedMovie(item);
    setIsModalOpen(true);
  }

  function closeModal(): void {
    setIsModalOpen(false);
    setSelectedMovie(null);
    triggerButtonRef.current?.focus();
  }

  return (
    <div className="h-full w-full duration-200 bg-bkg/25 text-content">
      <div className="min-h-full pb-8 ">
        {/* Main Swiper for Upcoming Movies */}
        <div className="relative w-full h-[65dvh] lg:h-screen z-10">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            className="absolute inset-0"
          >
            {upcomingMovies.map(item => (
              <SwiperSlide key={item.id}>
                <div
                  className="relative w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: item?.backdrop_path
                      ? `url('${imagePathOriginal}${item.backdrop_path}')`
                      : undefined,
                  }}
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-8">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-xs">
                      <h2 className="text-2xl font-bold text-white mb-4 text-balance">
                        {item.title}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 w-max mx-auto flex items-center justify-center"
                        aria-label={`Play trailer for ${item.title}`}
                        onClick={e => handlePlayVideo(item, e)}
                      >
                        <FaYoutube size={40} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal for YouTube Video */}
        <AnimatePresence>
          {isModalOpen && selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <button
                  ref={closeButtonRef}
                  className="absolute top-4 right-4 text-white text-2xl z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Close trailer"
                  onClick={closeModal}
                >
                  ✕
                </button>
                {upcomingMoviesVideo[selectedMovie.id] ? (
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${upcomingMoviesVideo[selectedMovie.id]?.key}?autoplay=1`}
                    title={upcomingMoviesVideo[selectedMovie.id]?.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <p className="text-white p-4 text-center">
                    No trailer available.
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trending Movies */}
        <div className="h-full max-w-screen-2xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-baseline justify-between pt-8">
            <p className="pl-4 text-2xl lg:text-3xl font-semibold pb-2">
              Trending Movies
            </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={7}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              500: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1000: { slidesPerView: 7 },
            }}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            className="px-4 py-1"
          >
            {trendingMovies.map(item => (
              <SwiperSlide key={item.id}>
                <div className="py-2">
                  <VerticalCard
                    item={item}
                    type={item?.media_type || "movie"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Trending Shows */}
        <div className="h-full max-w-screen-2xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-baseline justify-between pt-8">
            <p className="pl-4 text-2xl lg:text-3xl font-semibold pb-2">
              Trending Shows
            </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={7}
            spaceBetween={10}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              500: { slidesPerView: 3 },
              768: { slidesPerView: 5 },
              1000: { slidesPerView: 7 },
            }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            className="px-4 py-1"
          >
            {trendingShows.map(item => (
              <SwiperSlide key={item.id}>
                <div className="py-2">
                  <VerticalCard item={item} type={item?.media_type || ""} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
