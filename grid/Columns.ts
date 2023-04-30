const Productcolumns = [
  // { field: "id", headerName: "Product ID" },
  //{ field: "created_at", headerName: "Date" },
  {
    field: "product_name",
    headerName: "Product Name",
    flex: 3,
  },

  {
    field: "product_price",
    headerName: "Product Price",
    cellClassName: "name-column--cell",
  },

  {
    field: "shipping_price",
    headerName: "Shipping Price",
  },
  {
    field: "product_link",
    headerName: "Product Link ",
    flex: 2,
  },
  {
    field: "Price_History",
    headerName: "Price History",
    flex: 2,
  },
];

export { Productcolumns };
