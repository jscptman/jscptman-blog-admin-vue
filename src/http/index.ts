/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-11 13:11:28
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-14 21:09:59
 * @FilePath: /jscptman-blog-admin-vue/src/http/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { ref, unref, isRef, watchEffect } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_PREFIX,
  timeout: 1500,
  withCredentials: true,
});

// 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response;
// });

export const $axios = instance;

export function useAxios(
  axiosOption: Ref<AxiosRequestConfig> | AxiosRequestConfig
) {
  const data: Ref<AxiosResponse | null> = ref(null);
  const error: Ref<any> = ref(null);
  let asyncData: Promise<AxiosResponse> | null = null;
  const isLoadingData: Ref<boolean> = ref(false);
  function doRequest() {
    isLoadingData.value = true;
    data.value = null;
    error.value = null;
    asyncData = instance(unref(axiosOption))
      .then((responseData) => {
        data.value = responseData;
        return responseData;
      })
      .catch((error) => {
        error.value = error.response;
        return error.response;
      })
      .finally(() => (isLoadingData.value = false));
  }
  if (isRef(axiosOption)) {
    watchEffect(doRequest);
  } else {
    doRequest();
  }
  return {
    data,
    asyncData: asyncData as unknown as Promise<AxiosResponse>,
    error,
    retry: doRequest,
    isLoadingData,
  };
}
