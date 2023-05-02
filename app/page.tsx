"use client";

import { Box } from "@mui/material";
import supabase from "@/supabase/createclient";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Gridsettings from "@/grid/Gridsettings";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let { data: product }: any = await supabase
      .from("product")
      .select(
        "id, product_link, product_name, price (product_price, shipping_price)"
      );
    setProducts(product);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const productPrice = (product: any) => {
    const lastIndex = product.row.price.length - 1;
    return product.row.price[lastIndex].product_price;
  };

  const shippingPrice = (product: any) => {
    const lastIndex = product.row.price.length - 1;
    return product.row.price[lastIndex].shipping_price;
  };

  const lowestPrice = (product: any) => {
    let lowest = Infinity;
    for (let i = 0; i < product.row.price.length; i++) {
      const productPrice =
        parseFloat(product.row.price[i].product_price.substring(1)) || 0;
      const shippingPrice =
        parseFloat(product.row.price[i].shipping_price.substring(1)) || 0;
      const price = productPrice + shippingPrice;
      if (!isNaN(price) && price < lowest) {
        lowest = price;
      }
    }
    return (
      <div>
        <p className="font-bold">${lowest.toFixed(2)}</p>
      </div>
    );
  };

  const productName = (product: any) => {
    //const convertToString = JSON.stringify(product.row.product_name);
    return <a href={product.row.product_link}>{product.row.product_name}</a>;
  };

  const totalPrice = (product: any) => {
    const lastIndex = product.row.price.length - 1;

    const modstringproduct =
      product.row.price[lastIndex].product_price.substring(1);

    const shippingPrice = product.row.price[lastIndex].shipping_price;
    const modstringshipping = shippingPrice ? shippingPrice.substring(1) : "0";

    const productint = parseFloat(modstringproduct);
    const shippingint = parseFloat(modstringshipping);
    const total = productint + shippingint;

    const formattedTotal =
      total % 1 === 0
        ? total.toFixed(2)
        : total.toFixed(2).replace(/\.00$/, "");

    return (
      <div>
        <p className="font-bold">${formattedTotal}</p>
      </div>
    );
  };

  const Productcolumns = [
    // { field: "id", headerName: "Product ID" },
    //{ field: "created_at", headerName: "Date" },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 2,
      renderCell: productName,
    },

    {
      field: "product_price",
      headerName: "Current Price",
      valueGetter: productPrice,
      flex: 1,
    },

    {
      field: "shipping_price",
      headerName: "Shipping Price",
      valueGetter: shippingPrice,
      flex: 1,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      renderCell: totalPrice,
      flex: 1,
    },
    {
      field: "Price_History",
      headerName: "Lowest Seen Total Price",
      flex: 2,
      renderCell: lowestPrice,
    },
  ];

  return (
    <div
      className="
         m-4  h-3/4 rounded-3xl"
    >
      <div className="m-10 text-center">
        <h1 className="text-5xl m-3">PRICE TRACKER FOR 4WD SUPACENTRE</h1>
        <h2 className="m-3 border-black border-2">
          This a basic tool to help track the lowest prices seen at 4wd
          Supacentre. It is a work in progress and will evolve over time. If you
          have any issues or ideas for new features please email me
          omni4x4@gmail.com
        </h2>
        <h2 className="m-3">
          To search the table, click the filters button below and choose which
          column you would like to filter by
        </h2>
      </div>
      <Box
        height="80vh"
        sx={{
          ...Gridsettings,
        }}
      >
        <DataGrid
          checkboxSelection
          rows={products}
          columns={Productcolumns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </div>
  );
}
