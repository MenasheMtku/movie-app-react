import { h4 } from "framer-motion/client";
import React, { useState } from "react";
import { shortenTitle } from "../utils/helpers";

const PosterTitle = ({ title, loader }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!isLoading) {
    setIsLoading(false);
  }
  return (
    <>
      <div className="text-center">
        {loader ? (
          <h4>Loading</h4>
        ) : (
          <h4 className="font-bold">{shortenTitle(title)}</h4>
        )}
      </div>
    </>
  );
};

export default PosterTitle;
