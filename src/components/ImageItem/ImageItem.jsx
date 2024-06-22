import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageItem = ({ imgSrc, title, width }) => {
  return (
    <>
      <LazyLoadImage
        effect='blur'
        alt={title}
        src={`${imgSrc}`}
        delayTime={90}
        loading='lazy'
        width={width}
        className='rounded-md'
      />
    </>
  );
};

export default ImageItem;
