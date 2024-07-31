import React from "react";

const Title = ({ title }) => {
  return (
    <>
      <div className="text-center">
        <h4>
          {title?.length > 30
            ? title.replace(/:/g, "").split(" ").slice(0, 3).join(" ")
            : title}
        </h4>
      </div>
    </>
  );
};

export default Title;
