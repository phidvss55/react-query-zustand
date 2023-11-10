import http from "../utils/http";

export const getProducts = ({ pageNumber = 1 }) =>
  http.get<any>("products", {
    params: {
      skip: pageNumber,
      limit: 10,
    },
  });
