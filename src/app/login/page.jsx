"use client";

import Link from "next/link";
import "./login.css";
import { useState } from "react";

export default function Login() {
  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginMessage("");

    fetch(process.env.NEXT_PUBLIC_AUTH_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoginMessage(data.message);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user._id);
          localStorage.setItem("user_full_name", data.user.full_name);
          localStorage.setItem("user_email", data.user.email);
          localStorage.setItem(
            "administrative",
            data.user.role === "admin" ? 1 : 0
          );
          window.location.assign("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-white p-5 rounded-md">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          name="email"
          id="login-email"
          placeholder="Email"
        />
        <input
          className="login-input"
          type="password"
          name="password"
          id="login-password"
          placeholder="Password"
        />
        <button
          className="bg-[#cd6301] h-10 rounded-md text-white"
          type="submit"
        >
          Login
        </button>
      </form>
      {loginMessage ? (
        <small className="bg-red-600 p-3 text-center text-white">
          {loginMessage}
        </small>
      ) : null}
      <small>Don't have an account yet?</small>
      <Link
        className="bg-[#D37A27] w-full py-2 rounded-md text-white text-center"
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}
