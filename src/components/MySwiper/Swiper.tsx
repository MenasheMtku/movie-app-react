"use client";

import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": React.HTMLAttributes<HTMLElement> & { [key: string]: unknown };
      "swiper-slide": React.HTMLAttributes<HTMLElement> & { [key: string]: unknown };
    }
  }
}

// Guard against SSR — customElements is browser-only
if (typeof window !== "undefined") {
  register();
}

interface SwiperProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export function Swiper({ children, ...rest }: SwiperProps) {
  const swiperRef = useRef<HTMLElement & { initialize: () => void } | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    Object.assign(swiperRef.current, rest);
    swiperRef.current.initialize();
  }, []);

  return (
    <swiper-container init="false" ref={swiperRef as React.RefObject<HTMLElement>}>
      {children}
    </swiper-container>
  );
}

interface SwiperSlideProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

export function SwiperSlide({ children, ...rest }: SwiperSlideProps) {
  return <swiper-slide {...(rest as React.HTMLAttributes<HTMLElement>)}>{children}</swiper-slide>;
}
