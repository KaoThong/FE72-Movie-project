import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    TokenCyberSoft:process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
  timeout: 10000,
});

export default instance;


instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Beaber " + localStorage.getItem("token"),
  };
  return config;
})