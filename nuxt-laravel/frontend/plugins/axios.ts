import axios from "axios";

export default defineNuxtPlugin(() => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;

  return {
    provide: {
      axios: axios,
    },
  };
});
