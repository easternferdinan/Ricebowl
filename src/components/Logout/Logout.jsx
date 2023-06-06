"use client";

import React from "react";

const Logout = () => {
  const handleLogout = () => {
    fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_full_name");
          localStorage.removeItem("cartItems");
          window.location.assign("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full">
      <p>Are you sure to logout?</p>
      <button
        className="bg-red-600 p-2 rounded-2xl text-white hover:bg-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
