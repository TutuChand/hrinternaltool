import axios from "axios";

const api = axios.create({
  baseURL: "https://niyamra.ducktaleit.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
