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

import ProgressBar from "../components/ProgressBar/ProgressBar";
import VideoCompoennet from "../components/Video/VideoCompoennet";
import { defaultImage } from "../services/api";

import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "../components/Image/Image";
import Details from "../components/Details/Details";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  let imgSrc = `${imagePath}/${details?.poster_path}`;
  if (details?.poster_path === null) {
    imgSrc = defaultImage;
  }
  const wide_image = imagePathOriginal + `${details?.backdrop_path}`;

  console.log("Details", details);
  console.log("Cast", cast);
  console.log("Trailer", video);
  console.log("Teasers", videos);
  return (
    <>
      <div className="min-h-screen w-full ">
        <div className="box-1">
          <div
            className="image-dark-overlay-bottom z-[100] flex h-auto w-full items-center bg-gradient-to-r from-black/50 to-black/10 bg-cover bg-center bg-no-repeat py-2 md:h-[500px]"
            style={{
              backgroundImage: `url(${wide_image})`,
              // filter: `blur(${1}px)`,
              // shapeRendering: "-moz-initial",
            }}
          >
            <div className="container mx-auto my-4 w-11/12 md:my-0">
              <div className="container flex flex-col  gap-4 rounded-full px-2  md:flex-row  md:items-center md:gap-10">
                <div className="w-[220px]">
                  <Image src={imgSrc} title={title} />
                </div>
                <div>
                  <Details details={details} type={type} />
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
            className="px-3 py-2  rounded-sm"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={6}
            spaceBetween={10}
            // navigation
            // paginaton
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
                slidesPerView: 6,
              },
            }}
          >
            {cast &&
              cast
                ?.filter(item => item?.profile_path)
                .map(item => (
                  <SwiperSlide key={item.id}>
                    {/* <div
                      key={item?.id}
                      className="relative rounded-full w-full min-h-[20rem] bg-white"
                    ></div> */}
                    <Image
                      src={`${imagePath}/${item?.profile_path}`}
                      title={item?.name}
                      width={160}
                      round="rounded-full"
                    />
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
