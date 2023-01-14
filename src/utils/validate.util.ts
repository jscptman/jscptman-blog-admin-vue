/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 18:49:48
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-14 21:08:43
 * @FilePath: /jscptman-blog-admin-vue/src/utils/validate.util.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
export function validateEmail(email: string | null): boolean {
  if (!email) return false;
  // 常规邮箱验证格式正则
  const emailValidationRegNormal =
    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  // 前缀包含汉字的正则
  const emailValidationRegChinese =
    /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  return (
    emailValidationRegNormal.test(email) ||
    emailValidationRegChinese.test(email)
  );
}
