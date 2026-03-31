import axios from "axios";

const API = axios.create({
  baseURL: "http://niyamra.ducktaleit.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
