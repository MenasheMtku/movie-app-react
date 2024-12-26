import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": any;
      "swiper-slide": any;
    }
  }
}

register();

interface SwiperProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function Swiper({ children, ...rest }: SwiperProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    // Pass component props to parameters
    const params = { ...rest };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // Initialize swiper
    swiperRef.current.initialize();
  }, [rest]);

  return (
    <swiper-container init="false" ref={swiperRef}>
      {children}
    </swiper-container>
  );
}

interface SwiperSlideProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function SwiperSlide({ children, ...rest }: SwiperSlideProps) {
  return <swiper-slide {...rest}>{children}</swiper-slide>;
}
