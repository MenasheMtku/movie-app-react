import React from "react";

const Menu = ({ handlePage, handleSort, header, opt1, opt2 }) => {
  return (
    <div className="flex flex-col md:flex-row p-5 md:justify-between items-baseline pt-10 pb-0">
      <div>
        <h1 className="text-xl md:text-3xl md:font-semibold">{header}</h1>
      </div>
      <div className="w-[120px] font-bold">
        <select
          className="block w-full p-1 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={e => {
            handlePage(1);
            handleSort(e.target.value);
          }}
        >
          <option className="py-2" value="popularity.desc">
            {opt1}
          </option>
          <option
            className="py-2"
            value="vote_average.desc&vote_count.gte=1000"
          >
            {opt2}
          </option>
        </select>
      </div>
    </div>
  );
};

export default Menu;
