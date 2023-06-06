"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import Filter from "./FilterPopover/Filter";
import SearchContext from "@/utils/context/search/SearchContext";

const Searchbar = () => {
  const { setSearchQuery } = useContext(SearchContext);
  const [filterToggle, setFilterToggle] = useState(false);

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex justify-center w-[100%] bg-[#5b442e] p-2">
        <button
          className="w-7 rounded bg-[#cd6301]"
          onClick={handleFilterToggle}
        >
          <Image
            src="/assets/icons/filter-icon.svg"
            alt="Filter icon"
            width="15"
            height="15"
            className="m-auto"
          />
        </button>
        <Image
          src="/assets/icons/search-icon.svg"
          alt="Search icon"
          width="15"
          height="15"
          className="relative left-[20px] z-0"
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="rounded-md pl-7 pr-2 focus:outline-none"
          onChange={handleSearchQuery}
        />
      </div>
      {filterToggle ? <Filter /> : null}
    </>
  );
};

export default Searchbar;
