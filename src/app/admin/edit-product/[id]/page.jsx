"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./edit-product.css";

const EditProduct = (props) => {
  const productId = props.params.id;

  const [productData, setProductData] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/products")
      .then((response) => response.json())
      .then((data) =>
        setProductData(
          data.products.filter((element) => element._id === productId)[0]
        )
      )
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/categories")
      .then((response) => response.json())
      .then((data) => setCategoriesData(data))
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/tags")
      .then((response) => response.json())
      .then((data) => setTagsData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSaveChanges = (event) => {
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

    fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`, {
      method: "PUT",
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
    <form
      className="flex flex-col gap-5 bg-white p-5 rounded-lg mb-5"
      onSubmit={handleSaveChanges}
    >
      <div className="input-containers">
        <label htmlFor="name">Product Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={productData.name}
        />
      </div>

      <div className="input-containers">
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={productData.price}
        />
      </div>

      <div className="input-containers">
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="5"
          defaultValue={productData.description}
        ></textarea>
      </div>

      <div className="input-containers">
        <p>Existing image:</p>
        <Image
          src={productData.image_url}
          alt="Product Image"
          width="100"
          height="100"
        />
        <label htmlFor="image">Select image (leave empty if unchanged): </label>
        <input type="file" name="image" id="image" />
      </div>

      <div className="input-containers">
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          defaultValue={productData.category && productData.category.name}
        >
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
                defaultChecked={
                  productData.tags &&
                  productData.tags.some((tag) => element._id === tag._id)
                }
              />
              <label htmlFor={`update-tag-${index}`}>{element.name}</label>
            </div>
          );
        })}
      </div>
      <button className="bg-[#cd6301] text-white py-2 rounded-lg" type="submit">
        {isLoading ? "Loading..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProduct;
