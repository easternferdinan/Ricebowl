import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderAccepted = ({ params }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full">
      <Image
        src="/assets/icons/white-on-green-check-icon.svg"
        alt="Checked icon"
        width="100"
        height="100"
      />
      <h1 className="font-black text-2xl">Order Recieved</h1>
      <small>Order ID: {params.orderId}</small>
      <p>Your order have been recieved and will be processed soon.</p>
      <p>Thank you for choosing us.</p>
      <Link
        href="/"
        className="bg-[#cd6301] text-white py-2 px-3 rounded-lg hover:bg-[#c07631]"
      >
        Back to Store
      </Link>
    </div>
  );
};

export default OrderAccepted;
