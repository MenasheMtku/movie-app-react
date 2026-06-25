import Image from "next/image";
import { defaultImage } from "@/services/api";

type PosterProps = {
  src: string;
  title: string;
  onLoad?: () => void;
  onError?: () => void;
};

const Poster = ({ src, title, onLoad, onError }: PosterProps) => {
  const safeSrc = src || defaultImage;

  return (
    <div className="relative w-full aspect-[2/3]">
      <Image
        src={safeSrc}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
        className="object-cover"
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};

export default Poster;
