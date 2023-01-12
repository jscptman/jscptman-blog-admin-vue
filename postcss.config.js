module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-pxtorem")( {
      rootValue: 16, // 默认根字体大小为16
      unitPrecision: 5, // 转化后保留的小数位数
      propList: [ "*", "!letter-spacing", "!border-width", "!font*" ], // 能转化为vw的属性列表
      selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 最小的转化值, 小于该值,不会被转化
      mediaQuery: false, // 媒体查询里的值,不需要转化
      replace: true, // 不添加备用属性值
      exclude: /node_modules/ui, // 忽略某些文件夹下的文件或特定文件 (Array or Regexp)
    } ),
  ],
};
