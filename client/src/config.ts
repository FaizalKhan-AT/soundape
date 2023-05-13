import axios from "axios";
const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios_instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default axios_instance;
