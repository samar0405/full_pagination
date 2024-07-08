import http from "./config";

const order = {
  get: () => http.get("/client/all", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete("/client", { params: { id: id } }),
};

export default order;
