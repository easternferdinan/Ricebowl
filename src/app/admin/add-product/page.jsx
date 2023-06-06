"use client";

import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/categories")
      .then((response) => response.json())
      .then((data) => setCategoriesData(data))
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/tags")
      .then((response) => response.json())
      .then((data) => setTagsData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleProductSubmission = (event) => {
    event.preventDefault();
    setIsLoading(true);

    let FD = new FormData();

    FD.append("name", event.target.name.value);
    FD.append("price", event.target.price.value);
    FD.append("description", event.target.description.value);
    FD.append("image", event.target.image.files[0]);
    FD.append("category", event.target.category.value);
    event.target.tags.forEach((tag) => {
      if (tag.checked) {
        FD.append("tags[]", tag.value);
      }
    });

    fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: FD,
    })
      .then((response) => response.json())
      .then((data) =>
        data._id ? window.location.assign("/admin") : console.error(data)
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex justify-center items-center min-h-full min-w-full">
      <form
        className="flex flex-col gap-5 bg-white p-5 rounded-lg mb-5 w-full"
        onSubmit={handleProductSubmission}
      >
        <div className="input-containers">
          <input type="text" name="name" id="name" placeholder="Product Name" />
        </div>

        <div className="input-containers">
          <input type="number" name="price" id="price" placeholder="Price" />
        </div>

        <div className="input-containers">
          <textarea
            name="description"
            id="description"
            cols="50"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>

        <div className="input-containers">
          <label htmlFor="image">Select image: </label>
          <input type="file" name="image" id="image" />
        </div>

        <div className="input-containers">
          <label htmlFor="category">Category: </label>
          <select name="category" id="category" placeholder="Category">
            {categoriesData.map((element, index) => {
              return (
                <option key={index} value={element.name}>
                  {element.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input-containers">
          <p>Tags: </p>
          {tagsData.map((element, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name="tags"
                  id={`update-tag-${index}`}
                  value={element.name}
                />
                <label htmlFor={`update-tag-${index}`}>{element.name}</label>
              </div>
            );
          })}
        </div>
        <button
          className="bg-[#cd6301] text-white py-2 rounded-lg"
          type="submit"
        >
          {isLoading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
