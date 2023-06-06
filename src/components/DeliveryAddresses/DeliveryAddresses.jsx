import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DeliveryAddresses = ({
  addressId,
  label,
  detail,
  kelurahan,
  kecamatan,
  kota,
  provinsi,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleAddressDeletion = () => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL + `/delivery-addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .catch((error) => console.error(error))
      .finally(() => setIsDeleted(true));
  };

  const handleAddressToBeEdited = () => {
    localStorage.setItem(
      "toBeEditedAddress",
      JSON.stringify({
        _id: addressId,
        label,
        kelurahan,
        kecamatan,
        kota,
        provinsi,
        detail,
      })
    );
  };

  if (isDeleted) {
    window.location.assign("/user");
  }

  return (
    <div className="border border-black p-5 rounded-lg">
      <h1 className="font-black">{label}</h1>
      <p className="font-light max-w-xs">
        {detail}, {kelurahan}, {kecamatan}, {kota}, {provinsi}
      </p>
      <div className="flex justify-end items-center gap-5 mt-5">
        <Link
          href={`/user/edit-address/${addressId}`}
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-200"
          onClick={handleAddressToBeEdited}
        >
          <Image
            src="/assets/icons/edit-icon.svg"
            alt="Edit icon"
            width="20"
            height="20"
          />
        </Link>
        <button
          className="bg-red-600 p-3 rounded-full hover:bg-red-500"
          onClick={handleAddressDeletion}
        >
          <Image
            src="/assets/icons/trash-icon-white.svg"
            alt="Delete icon"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddresses;
