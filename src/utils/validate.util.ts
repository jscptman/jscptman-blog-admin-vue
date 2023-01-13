export function validateEmail(email: string): boolean {
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
