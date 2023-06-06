import React from "react";
import SearchProvider from "./search/SearchProvider";
import CategoriesProvider from "./categories/CategoriesProvider";
import TagsProvider from "./tags/TagsProvider";
import FiltersProvider from "./filters/FiltersProvider";

const MainProvider = ({ children }) => {
  return (
    <>
      <SearchProvider>
        <CategoriesProvider>
          <TagsProvider>
            <FiltersProvider>{children}</FiltersProvider>
          </TagsProvider>
        </CategoriesProvider>
      </SearchProvider>
    </>
  );
};

export default MainProvider;
