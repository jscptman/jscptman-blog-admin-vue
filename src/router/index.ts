/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-09-12 18:07:24
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-17 12:08:08
 * @FilePath: /jscptman-blog-admin-vue/src/router/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import LoginView from "../views/login/LoginView.vue";
import { useAxios } from "@/http";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { asyncData } = useAxios({
    url: "admin",
    baseURL: import.meta.env.VITE_AXIOS_AUTH,
    withCredentials: true,
  });
  asyncData.then(({ status, data }) => {
    if (status >= 400) {
      if (to.path === "/login") {
        next();
      } else {
        next("/login");
      }
    } else if (status === 200) {
      if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
      if (!sessionStorage.getItem("userInfo")) {
        sessionStorage.setItem("userInfo", JSON.stringify(data));
      }
    }
  });
});
export default router;
