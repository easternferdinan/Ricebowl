"use client";

import { useState } from "react";
import TagsContext from "./TagsContext";

const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export default TagsProvider;
