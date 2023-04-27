const Productcolumns = [
  // { field: "id", headerName: "Product ID" },
  //{ field: "created_at", headerName: "Date" },
  {
    field: "Product_Name",
    headerName: "Product Name",
    flex: 3,
  },
  {
    field: "SKU",
    headerName: "SKU",
    flex: 1,
  },

  {
    field: "Product_Price",
    headerName: "Product Price",
    cellClassName: "name-column--cell",
  },

  {
    field: "Shipping_Price",
    headerName: "Shipping Price",
  },
  {
    field: "Product_Link",
    headerName: "Product Link ",
    flex: 2,
  },
];

export { Productcolumns };
