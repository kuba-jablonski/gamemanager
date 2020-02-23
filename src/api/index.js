import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

api.interceptors.response.use(
  response => response.data,
  error => {
    // Do something with response error
    // if (error.response.status === 401) {
    //   console.log("unauthorized, logging out ...");
    //   auth.logout();
    //   router.replace("/auth/login");
    // }
    if (error.message === "Network Error") {
      return Promise.reject({ data: { message: "Network Error" } });
    }
    return Promise.reject(error.response);
  }
);

export default {
  signup(userInfo) {
    return api.post("/users/signup", userInfo);
  },
  getUsers() {
    return api.get("/users");
  }
};
