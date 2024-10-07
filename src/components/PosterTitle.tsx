import React, { useEffect, useState } from "react";
import { shortenTitle } from "../utils/helpers";

const PosterTitle = ({ title }: { title: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-10/12 bg-bkg animate-pulse h-[8px] text-center mx-auto rounded-2xl"></div>
      ) : (
        <p className="font-semibold text-content_secondary">
          {shortenTitle(title)}
        </p>
      )}
    </>
  );
};

export default PosterTitle;
