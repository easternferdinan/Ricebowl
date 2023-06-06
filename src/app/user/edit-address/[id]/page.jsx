"use client";

import React, { useEffect, useState } from "react";
import "./edit-address.css";

const EditAddress = () => {
  const [dataProvinsi, setDataProvinsi] = useState({});
  const [dataKota, setDataKota] = useState({});
  const [dataKecamatan, setDataKecamatan] = useState({});
  const [dataKelurahan, setDataKelurahan] = useState({});
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKota, setSelectedKota] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [existingAddress, setExistingAddress] = useState({});

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_DAERAHINDONESIA_URL + "/provinsi")
      .then((response) => response.json())
      .then((data) => setDataProvinsi(data))
      .catch((error) => console.error(error));

    setExistingAddress(JSON.parse(localStorage.getItem("toBeEditedAddress")));
  }, []);

  useEffect(() => {
    if (selectedProvinsi) {
      fetch(
        process.env.NEXT_PUBLIC_API_DAERAHINDONESIA_URL +
          `/kota?id_provinsi=${selectedProvinsi}`
      )
        .then((response) => response.json())
        .then((data) => setDataKota(data))
        .catch((error) => console.error(error));
    }
  }, [selectedProvinsi]);

  useEffect(() => {
    if (selectedKota) {
      fetch(
        process.env.NEXT_PUBLIC_API_DAERAHINDONESIA_URL +
          `/kecamatan?id_kota=${selectedKota}`
      )
        .then((response) => response.json())
        .then((data) => setDataKecamatan(data))
        .catch((error) => console.error(error));
    }
  }, [selectedKota]);

  useEffect(() => {
    if (selectedKecamatan) {
      fetch(
        process.env.NEXT_PUBLIC_API_DAERAHINDONESIA_URL +
          `/kelurahan?id_kecamatan=${selectedKecamatan}`
      )
        .then((response) => response.json())
        .then((data) => setDataKelurahan(data))
        .catch((error) => console.error(error));
    }
  }, [selectedKecamatan]);

  const handleProvinsiChange = (event) => {
    setSelectedProvinsi(event.target.selectedOptions[0].id);
  };

  const handleKotaChange = (event) => {
    setSelectedKota(event.target.selectedOptions[0].id);
  };

  const handleKecamatanChange = (event) => {
    setSelectedKecamatan(event.target.selectedOptions[0].id);
  };

  const handleAddressSubmission = (event) => {
    event.preventDefault();

    const userAddress = {
      label: event.target.label.value,
      kelurahan: event.target.kelurahan.value,
      kecamatan: event.target.kecamatan.value,
      kota: event.target.kota.value,
      provinsi: event.target.provinsi.value,
      detail: event.target.detail.value,
    };

    fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/delivery-addresses/${existingAddress._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAddress),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          localStorage.removeItem("toBeEditedAddress");
          window.location.assign("/user");
        } else {
          console.error(data);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      className="editAddressForm flex flex-col gap-2 pb-5"
      onSubmit={handleAddressSubmission}
    >
      {/* Input Label Alamat */}
      <label htmlFor="label">Label </label>
      <input
        className="mb-5 text-center py-3"
        type="text"
        name="label"
        id="label"
        defaultValue={existingAddress.label}
      />
      {/* --------------------- */}

      {/* Select Provinsi */}
      <label htmlFor="provinsi">Provinsi </label>
      <select
        className="edit-address-selection"
        name="provinsi"
        id="provinsi"
        onChange={handleProvinsiChange}
      >
        {dataProvinsi.provinsi ? (
          <>
            <option value={existingAddress.provinsi}>
              {existingAddress.provinsi}
            </option>
            {dataProvinsi.provinsi.map((element) => {
              return (
                <option key={element.id} value={element.nama} id={element.id}>
                  {element.nama}
                </option>
              );
            })}
          </>
        ) : null}
      </select>
      {/* --------------------- */}

      {/* Select Kota / Kabupaten */}
      <label htmlFor="kota">Kota / Kabupaten </label>
      <select
        className="edit-address-selection"
        name="kota"
        id="kota"
        onChange={handleKotaChange}
      >
        <>
          {dataKota.kota_kabupaten ? (
            <>
              <option value="no-value">Select Kota</option>
              {dataKota.kota_kabupaten.map((element) => {
                return (
                  <option key={element.id} value={element.nama} id={element.id}>
                    {element.nama}
                  </option>
                );
              })}
            </>
          ) : (
            <option value={existingAddress.kota}>{existingAddress.kota}</option>
          )}
        </>
      </select>
      {/* --------------------- */}

      {/* Select Kecamatan */}
      <label htmlFor="kecamatan">Kecamatan </label>
      <select
        className="edit-address-selection"
        name="kecamatan"
        id="kecamatan"
        onChange={handleKecamatanChange}
      >
        <>
          {dataKecamatan.kecamatan ? (
            <>
              <option value="no-value">Select Kecamatan</option>
              {dataKecamatan.kecamatan.map((element) => {
                return (
                  <option key={element.id} value={element.nama} id={element.id}>
                    {element.nama}
                  </option>
                );
              })}
            </>
          ) : (
            <option value={existingAddress.kecamatan}>
              {existingAddress.kecamatan}
            </option>
          )}
        </>
      </select>
      {/* --------------------- */}

      {/* Select Kelurahan */}
      <label htmlFor="kelurahan">Kelurahan </label>
      <select
        className="edit-address-selection"
        name="kelurahan"
        id="kelurahan"
      >
        <>
          {dataKelurahan.kelurahan ? (
            <>
              <option value="no-value">Select Kelurahan</option>
              {dataKelurahan.kelurahan.map((element) => {
                return (
                  <option key={element.id} value={element.nama} id={element.id}>
                    {element.nama}
                  </option>
                );
              })}
            </>
          ) : (
            <option value={existingAddress.kelurahan}>
              {existingAddress.kelurahan}
            </option>
          )}
        </>
      </select>
      {/* --------------------- */}

      {/* Input Address Details */}
      <label htmlFor="detail">
        Address Detail: (street, block, unit number)
      </label>
      <textarea
        name="detail"
        id="detail"
        cols="50"
        rows="3"
        defaultValue={existingAddress.detail}
      ></textarea>
      {/* --------------------- */}

      <button
        className="bg-[#cd6301] w-1/2 m-auto py-2 mt-3 rounded-lg text-white"
        type="submit"
      >
        Submit Changes
      </button>
    </form>
  );
};

export default EditAddress;
