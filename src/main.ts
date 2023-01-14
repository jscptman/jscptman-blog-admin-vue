/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-09-12 18:07:24
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-14 19:32:52
 * @FilePath: /jscptman-blog-admin-vue/src/main.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";

const app = createApp(App);

app.config.performance = true;

app.use(createPinia());
app.use(router);

app.mount("#app");
