import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_PREFIX,
  timeout: 1500,
  withCredentials: true,
});

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 异步化错误
    return Promise.reject(error);
  }
);

export const $axios = instance;
