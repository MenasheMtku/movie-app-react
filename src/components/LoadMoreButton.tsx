import React from "react";

const LoadMoreButton = ({ loading, onClick, children }: any) => {
  return (
    <button
      className="px-4 py-2 bg-content text-bkg rounded"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default LoadMoreButton;
