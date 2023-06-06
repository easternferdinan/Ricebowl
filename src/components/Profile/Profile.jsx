"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [isOnClientSide, setIsOnClientSide] = useState(false);

  useEffect(() => setIsOnClientSide(true), []);

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center h-full">
      <Image
        src="/assets/icons/user-circle-icon.svg"
        alt="Profile icon"
        width="100"
        height="100"
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-black">
          {isOnClientSide ? localStorage.getItem("user_full_name") : ""}
        </h1>
        <p className="font-light">
          {isOnClientSide ? localStorage.getItem("user_email") : ""}
        </p>
        <small>
          User ID: {isOnClientSide ? localStorage.getItem("user_id") : ""}
        </small>
      </div>
    </div>
  );
};

export default Profile;
