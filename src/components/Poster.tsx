import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { defaultImage } from "../services/api";

type PosterProps = {
  src: string;
  title: string;
};

const Poster = ({ src, title }: PosterProps) => {
  return (
    <>
      <LazyLoadImage
        effect="blur"
        loading="lazy"
        src={src}
        alt={title}
        placeholderSrc={defaultImage}
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: ".3s" },
        }}
        className="object-cover w-full h-full"
      />
    </>
  );
};

export default Poster;
