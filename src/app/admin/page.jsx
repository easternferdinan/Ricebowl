"use client";

import React, { useEffect, useState } from "react";
import "./admin.css";
import Profile from "@/components/Profile/Profile";
import Orders from "@/components/Orders/Orders";
import Logout from "@/components/Logout/Logout";
import Link from "next/link";
import AdminProductCard from "@/components/AdminProductCard/AdminProductCard";
import AdminCategoryCard from "@/components/AdminCategoryCard/AdminCategoryCard";
import AdminTagCard from "@/components/AdminTagCard/AdminTagCard";

const Admin = () => {
  const [menuSelection, setMenuSelection] = useState("profile");
  const [orderData, setOrderData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("administrative") == 1) {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/order", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrderData(data))
        .catch((error) => console.error(error));

      fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setProductsData(data))
        .catch((error) => console.log(error));
    } else {
      window.location.assign("/access-denied");
    }
  }, []);

  const handleMenuSelection = (selection) => {
    setMenuSelection(selection);
  };

  return (
    <div className="flex flex-wrap gap-5 border border-black rounded-lg p-5 bg-white">
      <div className="flex flex-col max-md:m-auto border-x border-x-black px-5">
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("profile")}
        >
          Profile
        </button>
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("orders")}
        >
          Orders
        </button>
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("products")}
        >
          Products
        </button>
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("categories")}
        >
          Categories
        </button>
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("tags")}
        >
          Tags
        </button>
        <button
          className="admin-page-buttons"
          onClick={() => handleMenuSelection("logout")}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col m-auto gap-5">
        {menuSelection === "profile" ? (
          <Profile />
        ) : menuSelection === "orders" ? (
          orderData.map((element, index) => {
            return (
              <Orders
                key={index}
                orderId={element._id}
                orderDate={element.createdAt}
                orderStatus={element.delivery_status}
                productSnapshot={element.products_snapshot}
                totalPrice={element.total_price}
                href={`/admin/order/${element._id}`}
              />
            );
          })
        ) : menuSelection === "products" ? (
          <>
            <Link
              className="text-center bg-[#cd6301] text-white rounded-lg py-1"
              href="/admin/add-product"
            >
              Add Product
            </Link>
            {productsData.products &&
              productsData.products.map((product, index) => {
                return (
                  <AdminProductCard
                    key={index}
                    productID={product._id}
                    imageUrl={product.image_url}
                    productName={product.name}
                    price={product.price}
                    category={product.category}
                    tags={product.tags}
                    productsData={productsData}
                    setProductsData={setProductsData}
                  />
                );
              })}
          </>
        ) : menuSelection === "categories" ? (
          <>
            <Link
              className="text-center bg-[#cd6301] hover:bg-[#ca7c33] text-white rounded-lg py-1"
              href="/admin/add-category"
            >
              Add Category
            </Link>
            <AdminCategoryCard />
          </>
        ) : menuSelection === "tags" ? (
          <>
            <Link
              className="text-center bg-[#cd6301] hover:bg-[#ca7c33] text-white rounded-lg py-1"
              href="/admin/add-tag"
            >
              Add Tag
            </Link>
            <AdminTagCard />
          </>
        ) : menuSelection === "logout" ? (
          <Logout />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Admin;
