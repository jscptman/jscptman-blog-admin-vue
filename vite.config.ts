import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as fs from "fs";

export default defineConfig({
  root: process.cwd(), // 默认值 process.cwd()
  base: "/blog/", // 以相对路径(相对index.html)设置静态资源,可以将项目嵌套在服务器任意深度目录下, 保证不会静态资源404, 非默认值, 默认值为"/",
  // mode: import.meta.env.MODE, //在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
  define: {
    __APP_VERSION__: `'0.0.1'`, //  define选项中的各个value虽然书写形式是字符串, 但是字符串的内容会在引用处, 被当成表达式,  所以如果要声明一个纯字符串常量, 应该采用字符串嵌套的形式(如当前项), 否认会爆xxx undefined, 同时还要注意全局变量应该在env.d.ts中声明类型;
  },
  plugins: [vue(), vueJsx()],
  publicDir: "public", //作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录
  cacheDir: "node_modules/.vite", //存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite 生成的某些缓存文件，使用缓存可以提高性能。如需重新生成缓存文件，你可以使用 --force 命令行选项或手动删除目录
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: [], //当引入的包(例如@jscptman-blog/utils)中包含了和该项目同样的依赖时使用此选项,强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）
    conditions: [], // 当该应用被打包成一个lib供外部调用时,  可在packages.json中通过exports字段声明对外暴露的导入文件, 这个过程可以通过添加情景来根据用户导入时的环境,进行不同的输出, 该选项用来自定义情景, 具体知识点参考https://github.com/jkrems/proposal-pkg-exports/
    mainFields: ["module", "jsnext:main", "jsnext"], // 程序在解析软件包时的入口字段, 该选项中的字段优先级低于exports ,关于package.json中的module字段的作用详见https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"], // 程序在导入时能够省略的扩展名列表, 不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
    preserveSymlinks: false, // 启用此选项会使 Vite 通过原始文件路径（即不跟随软链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。
  },
  css: {
    modules: {
      // 传给postcss-modules的配置详情参见 https://github.com/madyankin/postcss-modules
      scopeBehaviour: "local", // 默认值, 设置所有的css-module中的类都是局部的
      //    globalModulePaths: RegExp[], // 设置全局css-module的路径
      //    generateScopedName: function, // 自定义编译后的类的命名格式
      //    hashPrefix: string, // 使用该选项添加自定义的hash值来生成独特的类
      //    localConvention: 输出类名的样式(对应JSON中的key)
    },
    //    preprocessorOptions: {}, // 当使用了css预处理插件时(例如scss,less, etc) 该选项用来给预处理插件传递选项
    devSourcemap: false, // 该选项为true时, 表明启用开发环境下的cssSourceMap
  },
  json: {
    namedExports: false, // 默认值true,  json文件将支持具名导入
    stringify: true, // 将.json文件以export default形式导出, 这种方式在json文件较大时会比具名导出的方式性能好, 开启该选项后会禁用namedExports
  },
  // esbuild: {} 传递给esbuild TransformAPI的选项
  // assetsInclude: ['**/*.gltf'], // 作为vite能识别的静态资源列表的一种扩充方式, 例如vite不会将.gltf格式的文件识别为静态资源, 可在该选项中添加规则 '**/*.gltf', 来包含该格式的资源, 当该数组为空时,会表示什么资源都不识别(程序无法正常运行和打包)
  logLevel: "info", //默认
  server: {
    host: "localhost", //开发服务器的ip
    port: 5173, // 开发服务器的接口
    strictPort: true, // 若port已被其他程序占用, 则直接启动失败
    https: {
      key: fs.readFileSync("./secrets/agent2-key.pem"),
      cert: fs.readFileSync("./secrets/agent2-cert.pem"),
    }, // 启用 TLS + HTTP/2。当 server.proxy 选项 也被使用时，将会仅使用 TLS。
  },
  preview: {
    https: {
      key: fs.readFileSync("./secrets/agent2-key.pem"),
      cert: fs.readFileSync("./secrets/agent2-cert.pem"),
    },
  },
  // optimizeDeps: {
  //   force: true, // 强制清理之前已经缓存过的、已经优化过的依赖。
  // }
});
