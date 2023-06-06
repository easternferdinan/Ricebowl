"use client";

import React, { useState } from "react";
import FiltersContext from "./FiltersContext";

const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
