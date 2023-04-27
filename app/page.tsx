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
    let { data: product } = await supabase.from("4wdsupacentre").select("*");
    setProducts(product);
    console.log(product);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      className="
         m-4  h-3/4 rounded-3xl"
    >
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
