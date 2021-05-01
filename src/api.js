import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8000",
  baseURL: "https://mypub-webmanager-api.herokuapp.com",
  withCredentials: true,
});

export default api;
