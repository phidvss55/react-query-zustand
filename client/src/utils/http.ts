import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;

  constructor() {
    const { VITE_API_HOST } = import.meta.env;

    this.instance = axios.create({
      baseURL: VITE_API_HOST,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
