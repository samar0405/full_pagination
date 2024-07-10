import http from "./config";

const client = {
  get: (params) => http.get("/client/search", { params }),
  delete: (id, owner_id) =>
    http.delete("/client", { params: { id: id, owner_id: owner_id } }),
};

export default client;
