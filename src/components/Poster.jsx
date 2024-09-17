import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { defaultImage } from "../services/api";

const Poster = ({ src, alt }) => {
  return (
    <>
      <LazyLoadImage
        effect="blur"
        loading="lazy"
        src={src}
        alt={alt}
        placeholderSrc={defaultImage}
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: ".15ms" },
        }}
        className="object-cover w-full h-full"
      />
    </>
  );
};

export default Poster;
