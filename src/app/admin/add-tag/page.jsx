"use client";

import React from "react";

const AddTag = () => {
  const handleTagSubmission = (event) => {
    event.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL + "/tags", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        data.error ? console.error(data) : window.location.assign("/admin/")
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex justify-center items-center min-h-full min-w-full">
      <form
        className="flex flex-col gap-5 bg-white p-5 rounded-lg mb-5 w-full"
        onSubmit={handleTagSubmission}
      >
        <input
          className="text-center bg-gray-100 p-3 rounded-lg border border-black placeholder:text-slate-700"
          type="text"
          name="name"
          id="name"
          placeholder="Tag Name"
        />
        <button
          className="bg-[#cd6301] py-2 text-white rounded-lg"
          type="submit"
        >
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default AddTag;
