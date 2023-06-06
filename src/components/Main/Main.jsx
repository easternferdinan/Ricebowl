"use client";

import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import SearchContext from "@/utils/context/search/SearchContext";
import CategoriesContext from "@/utils/context/categories/CategoriesContext";
import TagsContext from "@/utils/context/tags/TagsContext";
import FiltersContext from "@/utils/context/filters/FiltersContext";

const Main = () => {
  const { searchQuery } = useContext(SearchContext);
  const { setCategories } = useContext(CategoriesContext);
  const { setTags } = useContext(TagsContext);
  const { filters } = useContext(FiltersContext);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
      next: { revalidate: 600 },
    })
      .then((result) => result.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/tags", {
      next: { revalidate: 600 },
    })
      .then((result) => result.json())
      .then((data) => setTags(data))
      .catch((error) => console.error(error));

    if (localStorage.getItem("token")) {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/cart", {
        cache: "no-store",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((response) => response.json())
        .then((data) =>
          localStorage.setItem(
            "cartItems",
            JSON.stringify(
              data.products.map((element) => {
                return {
                  product: element.product._id,
                  quantity: element.quantity,
                };
              })
            )
          )
        )
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?
      ${searchQuery ? `&search=${searchQuery}` : ""}
      ${
        filters.category && filters.category !== "ALL"
          ? `&category=${filters.category}`
          : ""
      }
      ${
        filters.tags
          ? `${filters.tags.map((tag) => `&tags[]=${tag}`).join("")}`
          : ""
      }`,
      {
        next: { revalidate: 600 },
      }
    )
      .then((response) => response.json())
      .then((data) => setProductsData(data.products))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [searchQuery, filters]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center w-full h-full m-0">
        <h1>LOADING...</h1>
      </main>
    );
  }

  if (productsData.length < 1) {
    return (
      <main className="flex justify-center items-center w-full h-full">
        <h1>Product is not found</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center gap-10">
      <div className="flex flex-wrap items-stretch justify-center gap-5">
        {productsData &&
          productsData.map((product, index) => {
            return (
              <Card
                key={index}
                productID={product._id}
                imageUrl={product.image_url}
                productName={product.name}
                price={product.price}
                tags={product.tags}
              />
            );
          })}
      </div>
    </main>
  );
};

export default Main;
