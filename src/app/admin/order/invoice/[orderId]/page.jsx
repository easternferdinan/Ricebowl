"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./invoice.css";

const Invoice = (props) => {
  const { orderId } = props.params;

  const [invoice, setInvoice] = useState({});
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setInvoice(data.filter((element) => element._id === orderId)[0])
      )
      .catch((error) => console.error(error));

    setUserFullName(localStorage.getItem("user_full_name"));
  }, []);

  const generateInvoiceNumber = () => {
    if (invoice && invoice._id) {
      return (
        "INV/" +
        invoice._id.toString().slice(-5) +
        orderId.toString().slice(-5) +
        "/" +
        invoice.createdAt.split("T")[0].split("-").join("")
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-[#cd6301]">
      <div className="flex gap-3">
        <Image
          className="p-2"
          src="/assets/logo/on-orange-big.png"
          width="100"
          height="100"
        />
        <div className="self-center">
          <h1 className="text-2xl font-bold text-white">Invoice</h1>
          <p className="text-white">
            <b>Invoice ID:</b> {generateInvoiceNumber()}
          </p>
        </div>
      </div>
      <table className="border-2 border-separate border-spacing-1 w-full bg-white p-2 mt-5">
        <thead>
          <tr>
            <th>Diterbitkan oleh</th>
            <th>Untuk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Seller:</b> Ricebowl - Chinese Food Store
            </td>
            <td>
              <b>Pembeli:</b> {userFullName}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <b>Tanggal Pembelian: </b>
              {invoice.createdAt &&
                invoice.createdAt
                  .replace("T", " ")
                  .replace("Z", " ")
                  .split(".", 1)[0]}
            </td>
          </tr>
        </tbody>
        <br />
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {invoice.products_snapshot &&
            invoice.products_snapshot.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.price * product.quantity}</td>
                </tr>
              );
            })}
        </tbody>
        <tbody>
          <tr className="text-center">
            <td></td>
            <td></td>
            <td></td>
            <td>{invoice.total_price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
