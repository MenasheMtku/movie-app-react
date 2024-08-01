import { useEffect, useState } from "react";
import "../index.css";
import {
  fetchTrendingAll,
  fetchPopularMovies,
  imagePathOriginal,
  defaultImage,
} from "../services/api";
import "../index.css";

import ProgressBar from ".././components/ProgressBar/ProgressBar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";
import HorizontalCard from "../components/CardHorizotal/HorizotalCard";
import VerticalCard from "../components/CardVertical/VerticalCard";

const Home = () => {
  const [trend, setTrend] = useState([]);
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [timeWindow, setTimeWindow] = useState("day");

  // let randMovie = data[Math.floor(Math.random() * data.length)]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, allData] = await Promise.all([
          fetchPopularMovies(),
          // fetchTrendingAll(timeWindow),
          fetchTrendingAll(),
        ]);

        // set trend Movies
        const trendMovies = moviesData?.results;
        setTrend(trendMovies);

        // set all
        const all = allData?.results;
        setAll(all);
      } catch (error) {
        console.log(error, "Error");
      } finally {
        setIsLoading(false);
      }
    };
    // setIsLoading(true);
    // fetchTrendingAll(timeWindow)
    //   .then(res => {
    //     console.log(res, "res");
    //     setData(res?.results);
    //   })
    //   .catch(err => {
    //     console.log(err, "err");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    fetchData();
  }, []);

  console.log(trend, "trend");
  console.log(all, "all");

  return (
    <div className="h-full w-full bg-gray-100 text-black  dark:bg-gray-900 dark:text-gray-200 duration-200">
      <div className="min-h-full  pb-8">
        <div className="w-full h-[65dvh] relative block z-10 ">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="absolute top-0 right-0 left-0 bottom-0"
            slidesPerView={1}
            spaceBetween={20}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            // loop={true}
          >
            {trend &&
              trend?.map(item => (
                <SwiperSlide key={item.id}>
                  <div
                    className={`relative w-full h-full p-8 bg-[url('${imagePathOriginal}/${item?.backdrop_path}')]  bg-cover bg-center bg-no-repeat z-10 before:content-['']
                    before:absolute
                    before:inset-0
                    before:block
                    before:backdrop-blur-0
                    before:bg-gradient-to-b
                    before:from-black/90
                    before:to-black/5
                    before:opacity-75
                    before:z-[-5]`}
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="min-h-screen max-w-screen-2xl  mx-auto px-5">
          <div className="flex flex-col sm:flex-row  items-baseline justify-between pt-8">
            <h1 className="pl-4 text-3xl font-semibold pb-2">Trending</h1>
          </div>
          {isLoading && <ProgressBar />}
          {/* Swiper component */}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="px-4 py-1 bg-white dark:bg-black/10"
            slidesPerView={7}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            // navigation
            // pagination
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              500: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 5,
              },
              1000: {
                slidesPerView: 7,
              },
            }}
          >
            {all &&
              all?.map(item => (
                <SwiperSlide key={item.id}>
                  <div className="py-2">
                    <VerticalCard
                      key={item.id}
                      item={item}
                      // _width={120}
                      type={`${item?.media_type}`}
                    />
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
