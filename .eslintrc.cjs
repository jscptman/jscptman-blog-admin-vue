/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": 0,
  },
  globals: {
    // 定义全局变量, 防止no-undef错误
    definePageMeta: "readonly",
    useRoute: "readonly",
    useNuxtApp: "readonly",
  },
};
