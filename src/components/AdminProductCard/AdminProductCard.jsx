"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const AdminProductCard = ({
  productID,
  imageUrl,
  productName,
  price,
  category,
  tags,
  productsData,
  setProductsData,
}) => {
  const handleProductDeletion = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/products/${productID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        data.error
          ? console.error(data)
          : setProductsData((prevProductsData) => {
              const updatedProductsData = prevProductsData.products.filter(
                (product) => product._id !== data._id
              );
              return {
                ...prevProductsData,
                products: updatedProductsData,
              };
            })
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col justify-stretch">
      <Link
        className="flex flex-col justify-center items-center gap-3 w-[200px] h-full p-5 rounded-t-lg shadow-xl hover:shadow-md bg-white"
        href={`/product/${productID}`}
      >
        <Image
          className="rounded-lg"
          src={imageUrl}
          alt="Product image"
          width="150"
          height="100"
        />
        <h2>{productName}</h2>
        <b>Rp. {price}</b>
        <small className="bg-slate-300 text-black px-2 rounded-r-lg rounded-bl-lg">
          {category.name}
        </small>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => {
            return (
              <small
                key={index}
                className="bg-slate-300 text-black px-2 rounded-r-lg rounded-bl-lg"
              >
                {tag.name}
              </small>
            );
          })}
        </div>
      </Link>
      <div className="flex justify-center items-center gap-5 p-2 bg-white">
        <Link
          href={`/admin/edit-product/${productID}`}
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-200"
        >
          <Image
            src="/assets/icons/edit-icon.svg"
            alt="Edit icon"
            width="20"
            height="20"
          />
        </Link>
        <button
          className="bg-red-600 p-3 rounded-full hover:bg-red-500"
          onClick={handleProductDeletion}
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
};

export default AdminProductCard;
