import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Stable callback so the effect doesn't re-run on every render
  const stableOnLoadMore = useCallback(onLoadMore, [onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          stableOnLoadMore();
        }
      },
      {
        threshold: 0.1,
        // Start fetching 200px before the sentinel enters the viewport
        rootMargin: "0px 0px 200px 0px",
      }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, hasMore, stableOnLoadMore]);

  return observerRef;
};

export default useInfiniteScroll;
