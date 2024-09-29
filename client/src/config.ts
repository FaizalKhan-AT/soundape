import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const axios_instance = axios.create({
  baseURL: BASE_URL,
});

axios_instance.defaults.headers.common["Access-Control-Allow-Origin"] =
  BASE_URL;
export default axios_instance;
