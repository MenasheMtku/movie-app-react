import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";

import ProgressBar from "../components/ProgressBar";
import VideoComponent from "../components/Video/VideoComponent";
import { defaultImage } from "../services/api";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Details from "../components/Details/Details";
import { Swiper, SwiperSlide } from "../components/MySwiper/Swiper";
import Poster from "../components/Poster";

type DetailsType = {
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  // Add other properties as needed from the API response
};

type CastType = {
  id: number;
  name: string;
  profile_path: string | null;
};

type VideoType = {
  key: string;
  id: string;
  name: string;
  type: string;
};

type RouteParams = {
  type: string;
  id: string;
};

const DetailsPage = () => {
  const { type, id } = useParams<RouteParams>();

  const [details, setDetails] = useState<DetailsType | null>({});
  const [cast, setCast] = useState<CastType[]>([]);
  const [video, setVideo] = useState<VideoType | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      //   isLoading = true;
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type ?? "", id ?? ""),
          fetchCredits(type ?? "", id ?? ""),
          fetchVideos(type ?? "", id ?? ""),
        ]);

        // Set details
        setDetails(detailsData);

        // Set cast
        setCast(creditsData?.cast?.slice(0, 10));

        // Set video/s
        const video = videosData?.results?.find(
          (video: { type: string }) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video: { type: string }) => video?.type !== "Trailer")
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
            className="relative image-dark-overlay-bottom z-10 flex h-auto w-full items-center bg-cover bg-center bg-no-repeat py-2 md:h-[500px]"
            style={{
              backgroundImage: `url(${wide_image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0  bg-gradient-to-t from-black/90 to-gray-900/85"></div>

            <div className="container relative z-10 mx-auto my-4 w-11/12 md:my-0">
              <div className="container flex flex-col gap-4 rounded-full px-2 md:flex-row md:items-center md:gap-10">
                <div className="w-[220px]">
                  <Poster src={imgSrc} title={title ?? ""} />
                </div>
                <div>
                  <Details details={details || {}} type={type ?? ""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-2 max-w-[1280px] mx-auto  pb-10 pt-2">
          {cast.length === 0 ? (
            <h2 className="mb-5 ml-4 mt-2 text-base uppercase">
              No cast found
            </h2>
          ) : (
            <h2 className="mb-5 ml-4 mt-2 text-base uppercase">Cast</h2>
          )}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={6}
            spaceBetween={20}
            // navigation
            // paginaton
            breakpoints={{
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              500: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1000: { slidesPerView: 6 },
            }}
          >
            {/* <div className="min-w-[1280px] h-auto"> */}
            {cast &&
              cast?.map(item => (
                <SwiperSlide key={item.id}>
                  <div className="w-[180px] h-[180px] rounded-full bg-slate-300 overflow-hidden">
                    <img
                      src={
                        item?.profile_path
                          ? `${imagePath}/${item.profile_path}`
                          : defaultImage
                      }
                      alt={item?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            {/* </div> */}
          </Swiper>

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
                        <VideoComponent id={item?.key} small />
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
