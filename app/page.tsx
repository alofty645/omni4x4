"use client";

import { Box } from "@mui/material";
import supabase from "@/supabase/createclient";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Gridsettings from "@/grid/Gridsettings";
import { Analytics } from "@vercel/analytics/react";

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
    const modstring = product.row.price[lastIndex].product_price.substring(1);
    const convertToFloat = parseFloat(modstring);
    return <p>${modstring}</p>;
  };

  const shippingPrice = (product: any) => {
    const lastIndex = product.row.price.length - 1;
    const shippingPrice = product.row.price[lastIndex].shipping_price;
    const modstring =
      shippingPrice && shippingPrice !== "" ? shippingPrice.substring(1) : "0";
    // const convertToFloat = parseFloat(modstring);
    return <p>${modstring}</p>;
  };

  const productName = (product: any) => {
    return <a href={product.row.product_link}>{product.row.product_name}</a>;
  };

  const totalPrice = (product: any) => {
    const lastIndex = product.row.price.length - 1;

    const shippingPrice = product.row.price[lastIndex].shipping_price;
    const productPrice = product.row.price[lastIndex].product_price;

    let modstringproduct = productPrice ? productPrice.substring(1) : "0";
    modstringproduct = modstringproduct.replace(",", "");

    let modstringshipping = shippingPrice ? shippingPrice.substring(1) : "0";
    modstringshipping = modstringshipping.replace(",", "");

    const productint = parseFloat(modstringproduct);
    const shippingint = parseFloat(modstringshipping);
    const total = productint + shippingint;

    const formattedTotal = total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <div>
        <p className="font-bold">{formattedTotal}</p>
      </div>
    );
  };

  const lowestPrice = (product: any) => {
    let lowest = Infinity;
    for (let i = 0; i < product.row.price.length; i++) {
      const shippingPrice = product.row.price[i].shipping_price;
      const productPrice = product.row.price[i].product_price;

      let modstringproduct = productPrice ? productPrice.substring(1) : "0";
      modstringproduct = modstringproduct.replace(",", "");

      let modstringshipping = shippingPrice ? shippingPrice.substring(1) : "0";
      modstringshipping = modstringshipping.replace(",", "");

      const productint = parseFloat(modstringproduct);
      const shippingint = parseFloat(modstringshipping);
      const total = productint + shippingint;

      if (!isNaN(total) && total < lowest) {
        lowest = total;
      }
    }
    return (
      <div>
        <p className="font-bold">${lowest.toFixed(2)}</p>
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
      renderCell: productPrice,
      flex: 1,
    },

    {
      field: "shipping_price",
      headerName: "Current Shipping Price",
      renderCell: shippingPrice,
      flex: 1,
    },
    {
      field: "total_price",
      headerName: "Current Total Price",
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
      <Analytics />
      <div className="m-10 text-center">
        <h1 className="text-5xl m-3">PRICE TRACKER FOR 4WD SUPACENTRE</h1>
        <h2 className="m-3">
          This a basic tool to help track the lowest prices seen at 4wd
          Supacentre. It is a work in progress and will evolve over time. If you
          have any issues or ideas for new features please email me
          omni4x4@gmail.com
          <br />
          <br />
          <ul className=" border-black border-2">
            Notes:
            <li>- This has not been optimised for mobile.</li>
            <li>
              - The data is updated once per day, eventually this will be
              automated and more frequent
            </li>
            <li>
              - Shipping cost for large freight items are unvailable for web
              scraping and are not included in the total price.
            </li>
          </ul>
        </h2>
        <h1>How To:</h1>
        <h2 className="m-3">
          To search the table, click the filters button below and choose which
          column you would like to filter by. Clicking the product name will
          take you to the listing.
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
