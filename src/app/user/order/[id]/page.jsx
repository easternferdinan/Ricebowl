"use client";

import CheckoutItem from "@/components/CheckoutItem/CheckoutItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderDetail = (props) => {
  const orderId = props.params.id;

  const [orderDetailData, setOrderDetailData] = useState({});

  const orderDate = new Date(orderDetailData.createdAt);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setOrderDetailData(data.filter((element) => element._id === orderId)[0])
      );
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 bg-white p-2 rounded-lg">
        <p className="font-bold">{orderDetailData.delivery_status}</p>
        <div className="flex justify-between">
          <p className="font-light text-sm">Order date</p>
          <p className="font-light text-sm">{orderDate.toString()}</p>
        </div>
        <Link
          className="block text-center p-2 bg-[#cd6301] text-white"
          href={`/user/order/invoice/${orderId}`}
        >
          Invoice
        </Link>
        <div>
          <p className="font-bold">Products Detail</p>
          {orderDetailData.products_snapshot &&
            orderDetailData.products_snapshot.map((product, index) => {
              return (
                <CheckoutItem
                  key={index}
                  imageUrl={product.image_url}
                  productName={product.name}
                  quantity={product.quantity}
                  price={product.price}
                />
              );
            })}
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg">
        <p className="font-bold">Total</p>
        <b> Rp. {orderDetailData.total_price}</b>
      </div>
    </div>
  );
};

export default OrderDetail;
