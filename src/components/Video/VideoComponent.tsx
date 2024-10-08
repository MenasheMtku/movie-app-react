import React from "react";

const VideoComponent = ({ id, small }: { id: string; small: boolean }) => {
  return (
    <iframe
      width="100%"
      height={small ? "160" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

export default VideoComponent;
