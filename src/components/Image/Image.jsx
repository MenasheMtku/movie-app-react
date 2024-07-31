import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { defaultImage } from "../../services/api";

const Image = ({ src, title, round = "rounded-md", _width }) => {
  return (
    <>
      <LazyLoadImage
        effect="blur"
        loading="lazy"
        src={src}
        alt={title}
        width={_width}
        className={round}
        placeholderSrc={defaultImage}
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: ".5s" },
        }}
      />
    </>
  );
};

export default Image;
