import axios, { AxiosError } from "axios";
import { message } from "antd";
import { hideLoading, showLoading } from "./loading";

//Create Instance
const instance = axios.create({
  baseURL: "/api",
  timeout: 8000, //8s
  timeoutErrorMessage: "Request timed out, please try again later",
  withCredentials: true, //跨域
});

//Request Interceptor
instance.interceptors.request.use(
  (config) => {
    showLoading();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Token::" + token;
    }

    return {
      ...config,
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    hideLoading();
    if (data.code === 500001) {
      message.error(data.msg);
      localStorage.removeItem("token");
      // location.href = "/login";
    } else if (data.code != 0) {
      message.error(data.msg);
      return Promise.reject(data);
    }
    return data.data;
  },
  (err) => {
    hideLoading();
    message.error(err.msg);
    return Promise.reject(err);
  }
);

export default {
  get(url: string, params: any) {
    return instance.get(url, { params });
  },
  post(url: string, params: any) {
    return instance.post(url, params);
  },
};
