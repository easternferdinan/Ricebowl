"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductDetail = (props) => {
  const productId = props.params.id;

  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setProductDetail(
          data.products.filter((element) => element._id === productId)[0]
        )
      );
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly bg-white p-5 gap-5 rounded-lg">
      <Image
        className="rounded-lg shrink-0 grow max-w-fit min-h-fit"
        src={productDetail.image_url}
        alt="Product Image"
        width="300"
        height="300"
      />
      <div className="flex flex-col h-[300px] max-w-fit shrink-0">
        <h1 className="font-medium text-3xl">{productDetail.name}</h1>
        <p className="text-xl mt-1">Rp. {productDetail.price}</p>
        <small className="mt-5">Description: </small>
        <p className="max-w-[300px] break-words whitespace-break-spaces">
          {productDetail.description}
        </p>
        <p className="mt-5">
          Category:{" "}
          <small className="ml-1 bg-slate-300 text-black px-2 rounded-r-lg rounded-bl-lg">
            {productDetail.category && productDetail.category.name}
          </small>
        </p>
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap items-center gap-2">
            <p>Tags: </p>
            {productDetail.tags &&
              productDetail.tags.map((tag, index) => {
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
          <button
            className="flex gap-2 justify-center bg-[#CD6301] text-white p-3 self-end w-full rounded-xl hover:shadow-2xl"
            onClick={() => handleAddToCart(productID)}
          >
            <Image
              src="/assets/icons/add-to-cart-icon.svg"
              alt="Add to cart icon"
              width="20"
              height="20"
            />
            <small>Add to cart</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
