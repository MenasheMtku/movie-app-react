import { useEffect, useState } from "react";
import { fetchTrendingAll } from "../services/api";
import "../index.css";

import ProgressBar from ".././components/ProgressBar/ProgressBar";
import CardItem from ".././components/CardItem/CardItem";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");

  // let randMovie = data[Math.floor(Math.random() * data.length)]
  useEffect(() => {
    setIsLoading(true);
    fetchTrendingAll(timeWindow)
      .then(res => {
        console.log(res, "res");
        setData(res?.results);
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [timeWindow]);

  return (
    <div className="h-full w-full">
      <div className="min-h-full bg-black/40 pb-8">
        <div className="mx-auto min-h-screen max-w-screen-xl">
          <div className="flex flex-col sm:flex-row  items-baseline justify-between pt-8">
            <h1 className="px-4 text-3xl font-medium">
              Trending {timeWindow == "day" ? "Today" : "This Week"}
            </h1>
            <div className="mr-4 inline-flex w-[250px] justify-around gap-3 p-2">
              <button
                type="button"
                className="w-full rounded-sm bg-gray-400 py-1 text-black font-semibold"
                onClick={() => setTimeWindow("week")}
              >
                Week
              </button>
              <button
                type="button"
                className="w-full rounded-sm bg-gray-400 py-1 text-black font-semibold"
                onClick={() => setTimeWindow("day")}
              >
                Day
              </button>
            </div>
          </div>
          {isLoading && <ProgressBar />}
          {/* Swiper component */}
          <Swiper
            className="px-4 py-2 bg-black/20"
            slidesPerView={6}
            spaceBetween={20}
            navigation="true"
            // pagination="true"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 3,
              },
              865: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 5,
              },
            }}
            on={{
              slideChange: () => console.log("slide changed"),
              progress: (_s, progress) =>
                console.log(`progress is ${progress}`),
            }}
          >
            {data &&
              data?.map(item => (
                <SwiperSlide key={item.id}>
                  <div className="py-6">
                    <CardItem
                      key={item.id}
                      item={item}
                      width="90"
                      type={`${item?.media_type}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          {/* <div className="horizontal-flex">
            {data &&
              data?.map(item => (
                <CardItem
                  key={item.id}
                  item={item}
                  type={`${item?.media_type}`}
                />
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
{
  /* <div className="relative h-full w-full ">
    <div className="h-screen w-full object-cover">
        <img
            src={imagePathOriginal + randMovie?.backdrop_path}
            alt={randMovie?.title}
        />
    </div>
    <div className="image-overlay absolute bottom-0 left-0 right-0 top-0"></div>
    <div className="absolute bottom-0 left-0 right-0 top-0 z-[999] h-full w-full bg-gradient-to-r from-black/95 to-black/10"></div>
    <div className="container absolute left-4 right-4 top-[50%] z-[999] mx-auto flex h-fit w-[80%] items-center justify-center overflow-x-hidden bg-gradient-to-t from-black/30 to-black/5 py-2"></div>
</div> */
}

{
  /* <div className=" flex h-full gap-2 overflow-auto px-2">
    {data &&
        data?.map((item) => (
            <div key={item?.id} className="min-w-36">
                <Link to={`/${item?.media_type}/${item?.id}`}>
                    <img
                        className=" h-[225px] w-[100%] rounded-lg object-cover"
                        src={`${imagePath}/${item?.poster_path}`}
                        onMouseEnter={hoverHandler}
                    />
                </Link>
            </div>
        ))}
</div> */
}
