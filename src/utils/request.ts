import axios, { AxiosError } from "axios";
import { message } from "antd";
import { hideLoading, showLoading } from "./loading";
import env from "@/config";
import { Result } from "@/types/api";
import storage from "./storage";

console.log("config", env);

console.log(import.meta.env);
//Create Instance
const instance = axios.create({
  // baseURL: "/api",
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8000, //8s
  timeoutErrorMessage: "Request timed out, please try again later",
  withCredentials: true, //跨域
  headers: {
    icode: "1B5DBB45B7F14CDB",
  },
});

//Request Interceptor
instance.interceptors.request.use(
  (config) => {
    if (config.showLoading) showLoading();

    const token = storage.get("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    if (import.meta.env.VITE_MOCK === "true") {
      // config.baseURL = import.meta.env.VITE_MOCK_API;
      config.baseURL = env.mockApi;
    } else {
      config.baseURL = env.baseApi;
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
    const data: Result = response.data;
    hideLoading();
    if (data.code === 500001) {
      message.error(data.msg);

      storage.remove("token");
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

interface IConfig {
  showLoading?: boolean;
  showError?: boolean;
}

export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options });
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.post(url, params, options);
  },
};
