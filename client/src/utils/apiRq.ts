import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL || "";

export const apiRq = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    ...(localStorage.getItem("authToken")
      ? { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      : {}),
  },
});

apiRq.interceptors.response.use(
  (res) => {
    if (res.data?.authToken) {
      localStorage.setItem("authToken", res.data.authToken);
      apiRq.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.authToken}`;
    }
    return res;
  },
  (error) => {
    if (error instanceof axios.AxiosError) {
      if (error.response) {
        error.message = error.response.data?.message || error.message;
      } else if (error.request) {
        error.message = "Unable to make request";
      }
    }
    return Promise.reject(error);
  },
);
