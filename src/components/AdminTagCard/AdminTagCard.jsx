"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const AdminTagCard = () => {
  const [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/tags")
      .then((response) => response.json())
      .then((data) => setTagsData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleTagDeletion = (tagId) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/tags/${tagId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        data.error
          ? console.error(data)
          : setTagsData(tagsData.filter((element) => element._id !== tagId))
      )
      .catch((error) => console.error(error));
  };

  return tagsData.map((element, index) => {
    return (
      <div key={index} className="bg-[#D37A27] text-white p-3 rounded-lg">
        <small>Tag ID: {element._id}</small>
        <p>{element.name}</p>
        <div className="flex justify-end items-center gap-5 p-2">
          <button
            className="bg-red-600 p-2 rounded-full hover:bg-red-500"
            onClick={() => handleTagDeletion(element._id)}
          >
            <Image
              src="/assets/icons/trash-icon-white.svg"
              alt="Delete icon"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    );
  });
};

export default AdminTagCard;
