"use client";

import React, { useContext } from "react";
import CategoriesContext from "@/utils/context/categories/CategoriesContext";
import TagsContext from "@/utils/context/tags/TagsContext";
import FiltersContext from "@/utils/context/filters/FiltersContext";

const Filter = () => {
  const { categories } = useContext(CategoriesContext);
  const { tags } = useContext(TagsContext);
  const { setFilters } = useContext(FiltersContext);

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const selectedCategory = event.target.category.value;
    const selectedTags = Array.from(event.target.tags)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    setFilters({ category: selectedCategory, tags: selectedTags });
  };

  return (
    <form
      className="flex justify-evenly flex-wrap py-3 bg-[#D37A27]"
      onSubmit={handleFilterSubmit}
    >
      <div className="flex gap-2">
        <p className="text-white">Category:</p>
        <div>
          <div>
            <input
              type="radio"
              name="category"
              id="category-radio-static"
              value="ALL"
            />
            <label htmlFor="category-radio-static" className="text-white ml-1">
              All Categories
            </label>
          </div>
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  name="category"
                  id={`category-radio-${index}`}
                  value={category.name}
                />
                <label
                  htmlFor={`category-radio-${index}`}
                  className="text-white ml-1"
                >
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <p className="text-white">Tags:</p>
        <div>
          {tags.map((tag, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name="tags"
                  id={`tag-checkbox-${index}`}
                  value={tag.name}
                />
                <label
                  htmlFor={`tag-checkbox-${index}`}
                  className="text-white ml-1"
                >
                  {tag.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="bg-[#5B442E] text-white self-center p-3 rounded-md"
        type="submit"
      >
        Apply Filter
      </button>
    </form>
  );
};

export default Filter;
