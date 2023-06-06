"use client";

import Link from "next/link";
import "./register.css";
import { useState } from "react";

export default function Register() {
  const [registerMessage, setRegisterMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setRegisterMessage("");

    fetch(process.env.NEXT_PUBLIC_AUTH_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: event.target.fullName.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setRegisterMessage(data.message);
        } else {
          setRegisterMessage("Register Success");
          setTimeout(() => window.location.assign("/login"), 1500);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-md">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="fullName"
          id="register-fullname"
          placeholder="Full name"
        />
        <input
          className="register-input"
          type="email"
          name="email"
          id="register-email"
          placeholder="Email"
        />
        <input
          className="register-input"
          type="password"
          name="password"
          id="register-password"
          placeholder="Password"
        />
        <button
          className="bg-[#cd6301] h-10 rounded-md text-white"
          type="submit"
        >
          Register
        </button>
      </form>
      {registerMessage === "Register Success" ? (
        <small className="bg-green-500 p-3 text-white text-center">
          {registerMessage}
        </small>
      ) : registerMessage ? (
        <small className="bg-red-500 p-3 text-white text-center">
          {registerMessage}
        </small>
      ) : null}
      <small>Already have an account?</small>
      <Link
        className="bg-[#D37A27] w-full py-2 rounded-md text-white text-center"
        href="/login"
      >
        Login
      </Link>
    </div>
  );
}
