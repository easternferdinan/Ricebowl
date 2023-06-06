import Image from "next/image";
import React from "react";
import "./card.css";
import Link from "next/link";

const Card = ({ productID, imageUrl, productName, price, tags }) => {
  const handleAddToCart = (productID) => {
    const localCartItems = localStorage.getItem("cartItems");
    const cartItems = localCartItems !== null ? JSON.parse(localCartItems) : [];
    const existingItem = cartItems
      ? cartItems.findIndex((obj) => obj.product === productID)
      : -1;

    if (existingItem !== -1) {
      cartItems[existingItem].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      cartItems.push({ product: productID, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    (async () => {
      fetch(process.env.NEXT_PUBLIC_API_URL + "cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      }).catch((error) => console.error(error));
    })();
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
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => {
            return (
              <small key={index} className="card-tags-style">
                {tag.name}
              </small>
            );
          })}
        </div>
      </Link>
      <button
        className="flex gap-2 justify-center bg-[#CD6301] text-white p-3 w-[200px] rounded-b-xl hover:shadow-2xl"
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
  );
};

export default Card;
