"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MovieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-semibold">Movie not found</h2>
      <p className="text-content/60 max-w-md">
        We couldn&apos;t load this movie. It may not exist or there was a network
        error.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/movies"
          className="px-4 py-2 bg-bkg_alt text-content rounded-lg hover:bg-bkgDarker transition-colors"
        >
          Browse movies
        </Link>
      </div>
    </div>
  );
}
