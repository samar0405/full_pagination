import React, { useEffect, useState } from "react";
import { Button, TextField, Pagination } from "@mui/material";
import { OrderModal } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [params, setParams] = useState({
    limit: 4,
    page: 1,
    name: "",
  });

  const getData = async () => {
    try {
      const response = await order.get(params);
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.orders_list
      ) {
        setData(response.data.orders_list);
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
        console.log(response.data.orders_list);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);
  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setParams({
      ...params,
      name: e.target.value,
    });
  };

  return (
    <>
      <OrderModal open={open} handleClose={handleClose} />
      <div className="flex flex-col mt-16">
        <div className="flex justify-between mb-7">
          <TextField
            label="Search..."
            name="amount"
            onChange={handleInputChange}
            type="text"
            margin="normal"
            className="w-[500px]"
          />
          <Button
            onClick={handleOpen}
            className="px-10"
            variant="contained"
            color="primary"
            style={{ display: "block", marginBottom: "20px" }}
          >
            Add
          </Button>
        </div>
        <OrderTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
