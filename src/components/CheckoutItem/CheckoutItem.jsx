import Image from "next/image";
import React from "react";

const CheckoutItem = ({ imageUrl, productName, quantity, price }) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <div className="flex gap-4">
        <Image
          className="rounded-md"
          src={imageUrl}
          alt="Product image"
          width="100"
          height="100"
        />
        <div className="min-w-fit">
          <h1 className="text-xl">{productName}</h1>
          <p>{quantity} pcs</p>
          <b>Rp. {price}</b>
        </div>
        <div className="flex justify-end gap-3 self-end justify-items-end w-full">
          <p>Subtotal:</p>
          <b>Rp. {price * quantity}</b>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
