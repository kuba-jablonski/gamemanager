import axios from "axios";
import router from "@/router";
import store from "@/store";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === 401) {
      store.commit("user/setUser", null);
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") {
        router.replace("/");
      }
    }
    if (error.message === "Network Error") {
      return Promise.reject({ data: { message: "Network Error" } });
    }
    return Promise.reject(error.response);
  }
);

export default api;
