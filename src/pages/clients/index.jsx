import React, { useEffect, useState } from "react";
import { ClientTable } from "../../components/ui";

import { client } from "@service";

const Index = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await client.get();
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.clients_list
      ) {
        setData(response.data.clients_list);
        console.log(response.data.clients_list);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-16">
        <div>
          <h1 className="text-center text-sky-400 text-6xl">Clients</h1>
        </div>
        <ClientTable data={data} />
      </div>
    </>
  );
};

export default Index;
