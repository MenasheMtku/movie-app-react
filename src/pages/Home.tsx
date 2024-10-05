import React, { useEffect, useState } from "react";
import "../index.css";
import {
  fetchUpcomingMovies,
  imagePathOriginal,
  fetchTrendingShows,
  fetchTrendingMovies,
  fetchVideos,
} from "../services/api";

import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import VerticalCard from "../components/CardVertical/VerticalCard";
import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";
import ProgressBar from "../components/ProgressBar";

import { Movie, Program } from "../types/movie";

type VideoType = {
  key: string;
  id: string;
  name: string;
  type: string;
};
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [upcomingMoviesVideo, setUpcomingMoviesVideo] = useState<{
    [key: number]: VideoType | null;
  }>({});
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [upcoming, trending, trendingShows] = await Promise.all([
          fetchUpcomingMovies(),
          fetchTrendingMovies(),
          fetchTrendingShows(),
        ]);

        setUpcomingMovies(upcoming?.results || []);
        setTrendingMovies(trending?.results || []);
        setTrendingShows(trendingShows?.results || []);

        upcoming?.results.forEach(async (movie: { id: string }) => {
          const videos = await fetchVideos("movie", movie.id);
          const youtubeVideo = videos?.results?.find(
            (video: { site: string; type: string }) =>
              video.site === "YouTube" && video.type === "Trailer"
          );
          setUpcomingMoviesVideo(prevState => ({
            ...prevState,
            [movie.id]: youtubeVideo || null,
          }));
        });

        // console.log(trendingMovies);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ProgressBar />;
  }

  function handlePlayVideo(item: Movie): void {
    setSelectedMovie(item);
    setIsModalOpen(true);
  }

  function closeModal(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  // console.log("Trending Movies:", trendingMovies);
  return (
    <div className="h-full w-full duration-200 bg-bkg/25 text-content">
      <div className="min-h-full pb-8 ">
        {/* Main Swiper for Popular Movies */}
        <div className="relative w-full h-[65dvh] lg:h-screen z-10">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            className="absolute inset-0"
          >
            {upcomingMovies &&
              upcomingMovies.map(item => (
                <SwiperSlide key={item.id}>
                  <div
                    className="relative w-full h-full p-8 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${imagePathOriginal}/${item?.backdrop_path}')`,
                    }}
                  >
                    {/* Overlay with proper z-index */}
                    <div className="absolute inset-0 bg-black/75 z-10"></div>
                    {/* You can add content on top of the overlay here */}
                    <div className="absolute inset-0 grid grid-rows-[100px_100px] place-content-center gap-4 justify-center items-center z-20 text-white text-center">
                      <h2 className="text-2xl max-w-[12rem] text-balance font-semibold text-stone-400">
                        {item.title}
                      </h2>
                      <button
                        className="mt-4 p-4 bg-red-600 text-white rounded-full hover:bg-red-800"
                        onClick={() => handlePlayVideo(item)}
                      >
                        ▶ Play Trailer
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* Modal for YouTube Video */}
        {isModalOpen && selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-3xl bg-black">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={closeModal}
              >
                ✕
              </button>
              {/* YouTube Video */}
              {upcomingMoviesVideo[selectedMovie.id] ? (
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${upcomingMoviesVideo[selectedMovie.id]?.key}?autoplay=1`}
                  title={upcomingMoviesVideo[selectedMovie.id]?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-white p-4 text-center">
                  No trailer available.
                </p>
              )}
            </div>
          </div>
        )}
        {/* Trending movies Section */}
        <div className="h-full max-w-screen-2xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-baseline justify-between pt-8">
            <p className="pl-4 text-2xl lg:text-3xl font-semibold pb-2">
              Trending Movies
            </p>
          </div>

          {/* Swiper for Trending Items */}
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
            }}
            className="px-4 py-1"
          >
            {trendingMovies &&
              trendingMovies.map(item => (
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
        {/* Trending shows */}
        <div className="h-full max-w-screen-2xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row items-baseline justify-between pt-8">
            <p className="pl-4 text-2xl lg:text-3xl font-semibold pb-2">
              Trending Shows
            </p>
          </div>

          {/* Swiper for Trending Items */}
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
            {trendingShows &&
              trendingShows.map(item => (
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
