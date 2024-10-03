import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { defaultImage } from "../services/api";
import { useState } from "react";
import Skeleton from "./Skeleton";

type PosterProps = {
  src: string;
  title: string;
};

const Poster = ({ src, title }: PosterProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false); // To hide the skeleton even if image fails
  };

  return (
    <>
      <div className="relative w-full h-full">
        {isLoading && (
          <Skeleton
            height={220} // Adjust the skeleton dimensions
            width={160} // Same as the poster size
            className="rounded-lg"
          />
        )}
        {!hasError ? (
          <LazyLoadImage
            effect="blur"
            loading="lazy"
            src={src}
            alt={title}
            onLoad={handleImageLoaded}
            onError={handleImageError}
            className={`transition-opacity duration-300 ease-in-out ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-[160px] h-[220px] bg-gray-300 flex items-center justify-center">
            <p className="text-center text-sm text-gray-500">
              Image Unavailable
            </p>
          </div>
        )}
      </div>
      {/* <LazyLoadImage
        effect="blur"
        loading="lazy"
        src={src}
        alt={title}
        placeholderSrc={defaultImage}
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: ".15ms" },
        }}
        className="object-cover w-full h-full"
      /> */}
    </>
  );
};

export default Poster;
