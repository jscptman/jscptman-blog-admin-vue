/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2022-09-12 18:07:24
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-16 17:12:43
 * @FilePath: /jscptman-blog-admin-vue/src/env.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}

interface ImportMetaEnv {
  VITE_AXIOS_PREFIX: string;
  VITE_AXIOS_AUTH: string;
}
interface ImportMeta {
  env: ImportMetaEnv;
}
