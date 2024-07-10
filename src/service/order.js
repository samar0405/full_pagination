import http from "./config";

const order = {
  create: (data) => http.post("/order", data),
  get: (params) => http.get("/order/search", { params }),
  delete: (id) => http.delete("/order", { params: { id: id } }),
  update: (item) => http.put("/update", item),
};

export default order;
