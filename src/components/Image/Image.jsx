import { LazyLoadImage } from "react-lazy-load-image-component";
import { defaultImage } from "../../services/api";

const Image = ({ src, title, _width }) => {
  return (
    <>
      <LazyLoadImage
        effect="blur"
        alt={title}
        src={src}
        loading="lazy"
        className="rounded-sm"
        placeholderSrc={`${defaultImage}`}
        width={_width}
        // delayTime={1000}
        visibleByDefault="false"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: ".5s" },
        }}
      />
    </>
  );
};

export default Image;
