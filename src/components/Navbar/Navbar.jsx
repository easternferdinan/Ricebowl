import Image from "next/image";
import React from "react";
import "./navbar.css";
import Link from "next/link";
import AccountLink from "./AccountLink/AccountLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center sticky top-0 z-[1] bg-[#cd6301] px-5">
      <Link href="/">
        <Image
          src="/assets/logo/on-orange-big.png"
          alt="Ricebowl's Logo"
          width="70"
          height="70"
          priority="true"
        />
      </Link>
      <ul className="flex flex-wrap gap-14 pr-5">
        <li className="nav-links">
          <Link href="/">
            <Image
              src="/assets/icons/shop-icon-2.svg"
              alt="Shop icon"
              width="25"
              height="25"
            />
          </Link>
        </li>
        <li className="nav-links">
          <Link href="/cart">
            <Image
              src="/assets/icons/cart-icon.svg"
              alt="Cart icon"
              width="25"
              height="25"
            />
          </Link>
        </li>
        <li className="nav-links">
          <AccountLink />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
