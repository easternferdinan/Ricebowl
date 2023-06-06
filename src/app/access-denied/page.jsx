"use client";

import React from "react";

const AccessDenied = () => {
  return (
    <>
      <h1 className="text-lg font-black">403 Forbidden</h1>
      <p>Access Denied</p>
      <button
        className="p-2 mt-5 rounded-lg text-white bg-[#cd6301]"
        onClick={() => window.location.assign("/")}
      >
        Back to Store
      </button>
    </>
  );
};

export default AccessDenied;
