const filterAddressId = (filter = "", source = []) => {
  return source.filter((element) =>
    console.log(element.nama.toLowerCase() === filter.toLowerCase())
  );
};

export default filterAddressId;
