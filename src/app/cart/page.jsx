"use client";

import CartItem from "@/components/CartItem/CartItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!localStorage.getItem("token")) {
      window.location.assign("/access-denied");
    }

    fetch(process.env.NEXT_PUBLIC_API_URL + "/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);
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
        );
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <h1>LOADING...</h1>
      </div>
    );
  }

  if (
    !isLoading &&
    (!cartData || !cartData.products || cartData.products.length === 0)
  ) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <h1>No items is found in your cart.</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        {cartData &&
          cartData.products.map((item, index) => {
            return (
              <CartItem
                key={index}
                productID={item.product._id}
                index={index}
                imageUrl={item.product.image_url}
                productName={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                cartData={cartData}
                setCartData={setCartData}
              />
            );
          })}
      </div>
      <div className="justify-end sticky bottom-2 right-0 w-full p-3">
        <Link href="/checkout">
          <button className="w-full bg-[#cd6301] text-white p-3 rounded-lg">
            Checkout
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
