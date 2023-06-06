import Image from "next/image";
import React, { useState } from "react";

const CartItem = (props) => {
  const {
    productID,
    index,
    imageUrl,
    productName,
    price,
    quantity,
    cartData,
    setCartData,
  } = props;

  const [isDeleted, setIsDelete] = useState(false);

  const localCartItems = localStorage.getItem("cartItems");
  const cartItems = localCartItems ? JSON.parse(localCartItems) : null;

  const handleQuantityChange = (event, productID) => {
    const existingItem = cartItems
      ? cartItems.findIndex((obj) => obj.product === productID)
      : null;

    if (existingItem !== -1) {
      cartItems[existingItem].quantity = Number(event.target.value);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      return console.error("Product not found");
    }

    fetch(process.env.NEXT_PUBLIC_API_URL + "cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    }).catch((error) => console.error(error));
  };

  const handleDeleteItem = (productID) => {
    const existingItem = cartItems
      ? cartItems.findIndex((obj) => obj.product === productID)
      : null;

    if (existingItem !== -1) {
      cartItems.splice(existingItem, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setCartData((prevCartData) => {
        const updatedProducts = prevCartData.products.filter(
          (item) => item.product._id !== productID
        );
        return {
          ...prevCartData,
          products: updatedProducts,
        };
      });
    } else {
      return console.error("Product not found");
    }

    fetch(process.env.NEXT_PUBLIC_API_URL + "cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    })
      .then(() => console.log("Item deleted: " + productID))
      .catch((error) => console.error(error))
      .finally(() => setIsDelete(true));
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-5 my-5">
      <div className="flex gap-4">
        <Image
          className="rounded-md"
          src={imageUrl}
          alt="Product image"
          width="100"
          height="100"
        />
        <div>
          <h1 className="text-xl">{productName}</h1>
          <b>Rp. {price}</b>
        </div>
      </div>
      <div className="flex gap-3 justify-end items-center">
        <button
          className="border-r border-r-black pr-3"
          onClick={() => handleDeleteItem(productID)}
        >
          <Image
            src="/assets/icons/trash-icon.svg"
            alt="Trash icon"
            width="25"
            height="25"
          />
        </button>
        <label htmlFor={`quantity-${index}`}>Qty: </label>
        <input
          className="w-10 text-center rounded-md bg-slate-300"
          type="number"
          defaultValue={quantity}
          min={1}
          id={`quantity${index}`}
          onChange={(event) => handleQuantityChange(event, productID)}
        />
      </div>
    </div>
  );
};

export default CartItem;
