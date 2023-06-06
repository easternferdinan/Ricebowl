"use client";

import CheckoutItem from "@/components/CheckoutItem/CheckoutItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [shownAddresData, setShownAddressData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/delivery-addresses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAddressData(data);
        setShownAddressData(data[0]);
      })
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCartData(data))
      .catch((error) => console.error(error));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (cartData.products && cartData.products.length > 0) {
      const calculatedTotalPrice = cartData.products.reduce(
        (totalPrice, element) =>
          Number(totalPrice) +
          Number(element.product.price) * Number(element.quantity),
        0
      );
      setTotalPrice(Number(calculatedTotalPrice));
    }
  }, [cartData]);

  const handleAddressSelection = (event) => {
    event.preventDefault();

    const selectedAddress = addressData.filter(
      (element) => element._id === event.target.selectAddress.value
    );

    setShownAddressData(selectedAddress[0]);
    document.getElementById("dialog").close();
  };

  const handleOrderMaking = (event) => {
    event.preventDefault();

    fetch(process.env.NEXT_PUBLIC_API_URL + "/order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        delivery_address: shownAddresData._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          localStorage.removeItem("cartItems");
          window.location.assign(`/checkout/${data._id}`);
        } else {
          console.error("Order failed");
        }
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 mb-5 py-3 rounded-lg bg-[#5b442e]">
        <p className="self-center text-white">Delivery Address </p>
        <div className="self-center">
          <b className="text-white">
            {shownAddresData ? shownAddresData.label : null}
          </b>
          <p className="text-white">
            {shownAddresData
              ? `${shownAddresData.detail}, ${shownAddresData.kelurahan}, ${shownAddresData.kecamatan}, ${shownAddresData.kota}, ${shownAddresData.provinsi}`
              : null}
          </p>
        </div>
        <button
          className="self-center mt-5 bg-[#cd6301] text-white py-1 px-3 rounded-lg"
          onClick={() => document.getElementById("dialog").showModal()}
        >
          Change Address
        </button>
        <dialog id="dialog" className="rounded-lg">
          <form onSubmit={handleAddressSelection}>
            <label className="flex gap-3">
              Select Address:
              <select className="bg-gray-200" name="selectAddress">
                {addressData && addressData.length > 0 ? (
                  addressData.map((element, index) => {
                    return (
                      <option key={index} value={element._id}>
                        {element.label}
                      </option>
                    );
                  })
                ) : (
                  <option>No address is found</option>
                )}
              </select>
            </label>
            <button
              type="submit"
              formMethod="dialog"
              className="w-full mt-3 mx-auto bg-green-400"
            >
              OK
            </button>
          </form>
          <button
            className="w-full mt-3 mx-auto bg-red-400"
            onClick={() => document.getElementById("dialog").close()}
          >
            Cancel
          </button>
          <Link
            className="flex justify-center items-center py-1 mt-3 bg-[#cd6301] text-white"
            href="/user/add-address"
          >
            Add New Address
          </Link>
        </dialog>
      </div>
      <div>
        {cartData.products &&
          cartData.products.map((item, index) => {
            return (
              <CheckoutItem
                key={index}
                imageUrl={item.product.image_url}
                productName={item.product.name}
                quantity={item.quantity}
                price={item.product.price}
              />
            );
          })}
      </div>
      <div className="sticky bottom-2 right-0 w-full p-3">
        <div className="flex justify-end gap-3 bg-white p-2 rounded-t-lg">
          <p>Total Price:</p>
          <b>Rp. {totalPrice}</b>
        </div>
        <div>
          <button
            className="w-full bg-[#cd6301] text-white p-3 rounded-b-lg"
            onClick={handleOrderMaking}
          >
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
