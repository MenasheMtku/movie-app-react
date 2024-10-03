import { Spinner } from "@material-tailwind/react";
import React from "react";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = () => {
  return (
    <div className="flex min-h-screen justify-start bg-bkg text-content pt-8">
      <div className="mx-auto pt-28">
        <div className="flex">
          <Spinner
            radius={0}
            color="cyan"
            className="h-12 w-12 text-black/15"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
