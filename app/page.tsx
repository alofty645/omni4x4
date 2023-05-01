"use client";

import { Box } from "@mui/material";
import supabase from "@/supabase/createclient";
import { useState, useEffect } from "react";
import { Productcolumns } from "@/grid/Columns";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Gridsettings from "@/grid/Gridsettings";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let { data: product }: any = await supabase
      .from("product")
      .select(
        "id, product_link, product_name, price (created_at, product_price, shipping_price)"
      );
    setProducts(product);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className="
         m-4  h-3/4 rounded-3xl"
    >
      <div className="m-10 text-center">
        <h1 className="text-5xl m-3">PRICE TRACKER FOR 4WD SUPACENTRE</h1>
        <h2 className="m-3 border-black border-2">
          This a basic tool to help track the price history of 4wd Supacentre.
          It is a work in progress and will evolve over time. If you have any
          issues or ideas for new features please contact me omni4x4@gmail.com
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
