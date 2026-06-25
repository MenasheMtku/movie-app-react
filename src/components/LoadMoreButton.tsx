import React from "react";

interface LoadMoreButtonProps {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LoadMoreButton = ({ loading, onClick, children }: LoadMoreButtonProps) => {
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
