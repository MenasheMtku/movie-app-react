import React, { useEffect, useState } from "react";
import "../index.css";
import {
  fetchDetails,
  imagePath,
  imagePathOriginal,
  fetchCredits,
  fetchVideos,
} from "../services/api";
import { useParams } from "react-router-dom";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
  shortenOverview,
} from "../utils/helpers";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import VideoCompoennet from "../components/Video/VideoCompoennet";
import { defaultImage } from "../services/api";
import ImageItem from "../components/Image/Image";
import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "../components/Image/Image";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const DetailsPage = () => {
  const router = useParams();
  const { type, id } = router;

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      //   isLoading = true;
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        // Set details
        setDetails(detailsData);

        // Set cast
        setCast(creditsData?.cast?.slice(0, 10));

        // Set video/s
        const video = videosData?.results?.find(
          video => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter(video => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  if (isLoading) {
    return <ProgressBar />;
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;
  let imgSrc = `${imagePath}/${details?.poster_path}`;
  if (details?.poster_path === null) {
    imgSrc = defaultImage;
  }

  const originalIMG = imagePathOriginal + `${details?.backdrop_path}`;
  const rateColor = resolveRatingColor(details?.vote_average);

  // console.log(video)
  console.log("Details", details);
  console.log("Cast", cast);
  console.log("Trailer", video);
  console.log("Teasers", videos);
  return (
    <>
      <div className="h-full w-full bg-black/60">
        <div className="box-1">
          <div
            className="image-dark-overlay-bottom image-dark-overlay-top z[-100] flex h-auto w-full items-center bg-gradient-to-r from-black/50 to-black/10 bg-cover bg-center bg-no-repeat py-2 md:h-[500px]"
            style={{
              backgroundImage: `url(${originalIMG})`,
              // filter: `blur(${2}px)`,
              // shapeRendering: "-moz-initial",
            }}
          >
            <div className="container mx-auto my-4 w-11/12 md:my-0">
              <div className="container flex flex-col  gap-4 rounded-full px-2  md:flex-row  md:items-center md:gap-10">
                <div className="w-[220px]">
                  <ImageItem src={imgSrc} title={title} />
                </div>
                {/* <img className='w-[220px] rounded-lg' src={imgSrc} /> */}

                <div>
                  <div className="flex flex-row items-baseline gap-2 md:gap-1">
                    <p className="text-xl">{title}</p>
                    <p className="text-xl font-semibold text-gray-400">
                      {new Date(releaseDate).getFullYear()}
                    </p>
                  </div>
                  <div className="mb-5 mt-1 flex items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <BsCalendar3 className="mr-2 text-gray-400" />
                        <p className="text-sm">
                          {new Date(releaseDate).toLocaleDateString("en-US")}{" "}
                          (US)
                        </p>
                      </div>
                      {type === "movie" && (
                        <>
                          <span>*</span>
                          <div className="flex items-center">
                            <IoTimeSharp
                              className="mr-1"
                              mr="2"
                              color={"gray.400"}
                            />
                            <p className="text-sm">
                              {minutesTohours(details?.runtime)}
                            </p>
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
                  <p className="text my-5 text-sm italic text-gray-400">
                    {details?.tagline}
                  </p>
                  {details?.overview ? (
                    <>
                      <h2 className="mb-2 text-xl">Overview</h2>
                      <p className="mb-3 w-full text-base md:w-96">
                        {shortenOverview(details?.overview)}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="mb-2 text-sm">Overvier Unavailable</h2>
                    </>
                  )}
                  <div className="mt-6 flex w-full flex-wrap  gap-2 md:flex-row">
                    {details?.genres?.map(genre => (
                      <p
                        className=" rounded bg-gray-500 px-2 py-1 text-center text-sm  font-semibold text-blue-gray-900 "
                        key={genre?.id}
                        // p="1"
                      >
                        {genre?.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="box-2 container mx-auto  pb-10 pt-2"
          // style={{ border: "2px solid purple" }}
        >
          {cast.length === 0 ? (
            <h2 className="mb-5 ml-4 mt-2 text-base uppercase">
              No cast found
            </h2>
          ) : (
            <h2 className="mb-5 ml-4 mt-2 text-base uppercase">Cast</h2>
          )}
          {/* {!cast && <p>No cast found</p>} */}
          {/* <div className="mb-10 mt-5 flex gap-2 rounded-2xl bg-yellow-600 px-2 py-2"> */}
          <Swiper
            className="px-4 py-2 bg-gray-800/30 rounded-sm"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            // slidesPerView={6}
            spaceBetween={10}
            // navigation
            // paginaton
            breakpoints={{
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
                slidesPerView: 6,
              },
            }}
          >
            {cast &&
              cast
                ?.filter(item => item?.profile_path)
                .map(item => (
                  <SwiperSlide key={item.id}>
                    <div key={item?.id}>
                      <Image
                        className="rounded-sm"
                        src={`${imagePath}/${item?.profile_path}`}
                        alt={item?.name}
                        width={160}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
          {/* </div> */}
          {cast.length === 0 ? (
            <h2 className="mb-5 ml-4 mt-2 text-base uppercase">
              No Trailer found
            </h2>
          ) : (
            <>
              <h2 className="mb-5 ml-4 mt-2 text-base uppercase">Trailer</h2>
              <div className="mx-auto ml-4 mr-4 max-w-4xl">
                <div className="relative h-0 pb-[56.25%] pt-[25px]">
                  <div className="absolute left-0 top-0 h-full w-full">
                    <iframe
                      className="h-full w-full"
                      // width="960"
                      // height="415"
                      src={`https://www.youtube.com/embed/${video?.key}?si=${video?.id}`}
                      title="YouTube video player"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                {/* <video id={video?.key} /> */}
                <div className="mb-10 mt-5 hidden  gap-3 overflow-auto  md:flex">
                  {videos &&
                    videos?.map(item => (
                      <div className="min-w-72" key={item?.id}>
                        <VideoCompoennet id={item?.key} small />
                        <h1 className="mt-2 text-sm font-bold">
                          {item?.name}{" "}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
