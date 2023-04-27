const Productcolumns = [
  { field: "id", headerName: "Product ID" },
  { field: "created_at", headerName: "Date" },
  {
    field: "Product_Link",
    headerName: "Product Link ",
    flex: 1,
  },

  {
    field: "Product_Name",
    headerName: "Product Name",
    flex: 3,
  },
  {
    field: "Product_Price",
    headerName: "Product Price",
    flex: 1,
    cellClassName: "name-column--cell",
  },

  {
    field: "Shipping_Price",
    headerName: "Shipping Price",
    flex: 1,
  },
  {
    field: "SKU",
    headerName: "SKU",
    flex: 1,
  },
];

export { Productcolumns };
