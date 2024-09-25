import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ activePage, totalPages, setActivePage }) => {
  return (
    <div className="mb-4 mt-3 flex w-full items-center justify-center gap-8">
      <div className="my-2 flex max-w-64 gap-2">
        <button
          className="bg-gray-400 text-gray-700  dark:bg-gray-600 dark:text-gray-200 p-2 rounded-xl font-bold"
          onClick={() => setActivePage(activePage - 1)}
          disabled={activePage === 1}
        >
          Prev
        </button>
        <button
          className="bg-gray-400 text-gray-700  dark:bg-gray-600 dark:text-gray-200 p-2 rounded-xl font-bold"
          onClick={() => setActivePage(activePage + 1)}
          disabled={activePage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex gap-3">
        <p className="text-base font-semibold">{activePage}</p>
        <p className="text-base font-semibold">of</p>
        <p className="text-base font-semibold">{totalPages}</p>
      </div>
    </div>
  );
};

export default Pagination;
