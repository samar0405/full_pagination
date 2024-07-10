// import React, { useEffect, useState } from "react";
// import { TextField, Pagination } from "@mui/material";
// import { ClientTable } from "../../components/ui";
// import { client } from "@service";

// const Index = () => {
//   const [data, setData] = useState([]);
//   const [count, setCount] = useState(0);

//   const [params, setParams] = useState({
//     limit: 4,
//     page: 1,
//     name: "",
//   });

//   const getData = async () => {
//     try {
//       const response = await client.get(params);
//       if (
//         (response.status === 200 || response.status === 201) &&
//         response?.data?.clients_list
//       ) {
//         setData(response.data.clients_list);
//         let total = Math.ceil(response.data.total / params.limit);
//         setCount(total);
//         console.log(response.data.clients_list);
//       } else {
//         console.error("Unexpected response status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [params]);

//   const handleChange = (event, value) => {
//     setParams({
//       ...params,
//       page: value,
//     });
//   };

//   const handleInputChange = (e) => {
//     console.log(e.target.value);
//     setParams({
//       ...params,
//       name: e.target.value,
//       page: 1,
//     });
//   };

//   return (
//     <>
//       <div className="mt-10">
//         <TextField
//           label="Search..."
//           name="name"
//           onChange={handleInputChange}
//           type="text"
//           margin="normal"
//           className="w-[500px]"
//         />
//         <ClientTable data={data} />
//         <Pagination count={count} page={params.page} onChange={handleChange} />
//       </div>
//     </>
//   );
// };

// export default Index;
import React, { useEffect, useState } from "react";
import { TextField, Pagination } from "@mui/material";
import { ClientTable } from "../../components/ui";
import { client } from "@service";

const Index = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [params, setParams] = useState({
    limit: 4,
    page: 1,
    name: "",
  });

  const getData = async () => {
    try {
      const response = await client.get(params);
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.clients_list
      ) {
        setData(response.data.clients_list);
        const total = Math.ceil(response.data.total / params.limit);
        setCount(total);
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
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setParams({
      ...params,
      name: value,
      page: 1,
    });
  };

  return (
    <div className="mt-10">
      <TextField
        label="Search..."
        name="name"
        onChange={handleInputChange}
        type="text"
        margin="normal"
        className="w-[500px]"
      />
      <ClientTable data={data} />
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </div>
  );
};

export default Index;
