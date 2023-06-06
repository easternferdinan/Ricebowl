"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile/Profile";
import "./user.css";
import Orders from "@/components/Orders/Orders";
import DeliveryAddresses from "@/components/DeliveryAddresses/DeliveryAddresses";
import Logout from "@/components/Logout/Logout";
import Link from "next/link";

const User = () => {
  const [menuSelection, setMenuSelection] = useState("profile");
  const [orderData, setOrderData] = useState([]);
  const [addressesData, setAddressesData] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderData(data))
      .catch((error) => console.error(error));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/delivery-addresses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAddressesData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleMenuSelection = (selection) => {
    setMenuSelection(selection);
  };

  return (
    <div className="flex flex-wrap gap-5 border border-black rounded-lg p-5 bg-white">
      <div className="flex flex-col max-md:m-auto border-x border-x-black px-5">
        <button
          className="user-page-buttons"
          onClick={() => handleMenuSelection("profile")}
        >
          Profile
        </button>
        <button
          className="user-page-buttons"
          onClick={() => handleMenuSelection("orders")}
        >
          Orders
        </button>
        <button
          className="user-page-buttons"
          onClick={() => handleMenuSelection("delivery-address")}
        >
          Delivery Addresses
        </button>
        <button
          className="user-page-buttons"
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
                href={`/user/order/${element._id}`}
              />
            );
          })
        ) : menuSelection === "delivery-address" ? (
          <>
            <Link
              href="/user/add-address"
              className="bg-[#cd6301] text-white py-2 text-center rounded-lg"
            >
              Add Address
            </Link>
            {addressesData.map((element, index) => {
              return (
                <DeliveryAddresses
                  key={index}
                  addressId={element._id}
                  label={element.label}
                  detail={element.detail}
                  kelurahan={element.kelurahan}
                  kecamatan={element.kecamatan}
                  kota={element.kota}
                  provinsi={element.provinsi}
                />
              );
            })}
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

export default User;
