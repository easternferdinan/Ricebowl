import Image from "next/image";
import Link from "next/link";
import React from "react";

const Orders = ({
  orderId,
  orderDate,
  orderStatus,
  productSnapshot,
  totalPrice,
  href,
}) => {
  const date = new Date(orderDate);
  return (
    <Link
      href={href}
      className="flex flex-col gap-5 border border-black p-3 rounded-lg bg-[#FFF4E9]"
    >
      <div className="flex justify-between items-center gap-10">
        <div className="flex flex-col">
          <small>Order ID: {orderId}</small>
          <small>{date.toLocaleDateString()}</small>
        </div>
        <small className="bg-green-200 p-1 rounded-lg">{orderStatus}</small>
      </div>
      <div>
        {productSnapshot.map((element, index) => {
          return (
            <div className="flex gap-3 mb-3" key={index}>
              <Image
                src={element.image_url}
                alt="Product image"
                width="55"
                height="50"
              />
              <div className="flex flex-col">
                <h1>{element.name}</h1>
                <small>Rp. {element.price}</small>
                <small>{element.quantity} pcs</small>
              </div>
            </div>
          );
        })}
        <div className="mt-5">
          <small>Total Price</small>
          <p>Rp. {totalPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Orders;
