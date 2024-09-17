import { useContext, useEffect, useState } from "react";
import "../index.css";
import {
  fetchPopularMovies,
  fetchTrendingAll,
  imagePathOriginal,
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
import { ThemeContext } from "../contexts/themeContext/ThemeContext";

const Home = () => {
  const [trend, setTrend] = useState([]);
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, allData] = await Promise.all([
          fetchPopularMovies(),
          fetchTrendingAll(),
        ]);
        setTrend(moviesData?.results || []);
        setAll(allData?.results || []);
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

  return (
    <div className="h-full w-full duration-200 bg-bkg/25 text-content">
      <div className="min-h-full pb-8 ">
        {/* Main Swiper for Popular Movies */}
        <div className="relative w-full h-[65dvh] z-10">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            className="absolute inset-0"
          >
            {trend.map(item => (
              <SwiperSlide key={item.id}>
                <div
                  className="relative w-full h-full p-8 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${imagePathOriginal}/${item?.backdrop_path}')`,
                  }}
                >
                  {/* Overlay with proper z-index */}
                  <div className="absolute inset-0 bg-black/65 z-10"></div>
                  {/* You can add content on top of the overlay here */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white text-center">
                    <h2 className="text-2xl max-w-[35rem] font-semibold">
                      {item.title}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Trending Section */}
        <div className="min-h-screen max-w-screen-2xl mx-auto px-5">
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
            {all.map(item => (
              <SwiperSlide key={item.id}>
                <div className="py-2">
                  <VerticalCard item={item} type={item?.media_type} />
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
