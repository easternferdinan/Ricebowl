"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AccountLink = () => {
  const [token, setToken] = useState("");
  const [administrative, setAdministrative] = useState(0);

  useEffect(() => {
    typeof window !== "undefined"
      ? (setToken(localStorage.getItem("token")),
        setAdministrative(localStorage.getItem("administrative")))
      : "asdasd";
  }, []);

  return (
    // href={token ? "/user/" : "/login/"}>
    <Link
      href={token ? (administrative == 1 ? "/admin/" : "/user/") : "/login/"}
    >
      <Image
        src="/assets/icons/profile-icon.svg"
        alt="Profile icon"
        width="25"
        height="25"
      />
    </Link>
  );
};

export default AccountLink;
