/*
 * @Author: jscptman jscptman@163.com
 * @Date: 2023-01-13 20:08:28
 * @LastEditors: jscptman jscptman@163.com
 * @LastEditTime: 2023-01-13 21:15:09
 * @FilePath: /jscptman-blog-admin-vue/src/views/login/compose/useGetCode.ts
 * @Description:
 *
 * Copyright (c) 2023 by jscptman jscptman@163.com, All Rights Reserved.
 */
import { effectScope, onScopeDispose, ref, computed } from "vue";
import type { Ref } from "vue";
import { $axios } from "@/http";

// 控制点击获取验证码后的链接的样式逻辑
function changeClickStatusByRemainTimer(
  clickStatus: any,
  remainTime: any,
  timer: any
) {
  if (clickStatus.value === "pending") {
    return;
  }
  clickStatus.value = "pending";
  remainTime.value = 30;
  timer = setInterval(() => {
    if (remainTime.value <= 0 && timer) {
      clearInterval(timer);
      clickStatus.value = "finished";
    }
    remainTime.value--;
  }, 1000);
}
export default function useGetCode(requestOptions: Record<string, any>) {
  const scope = effectScope();
  const result = scope.run(() => {
    let timer: NodeJS.Timer | undefined;
    const clickStatus: Ref<"init" | "pending" | "finished"> = ref("init");
    const remainTime = ref(30);
    const tipText = computed(() => {
      if (clickStatus.value === "init") {
        return "点击获取验证码";
      } else if (clickStatus.value === "pending") {
        return remainTime.value + "s后可重新获取";
      } else {
        return "重新发送";
      }
    });
    function getCode() {
      changeClickStatusByRemainTimer(clickStatus, remainTime, timer);
      $axios({ ...requestOptions });
    }
    onScopeDispose(() => {
      scope.stop();
      clearInterval(timer);
    });
    return { clickStatus, tipText, getCode };
  });

  return result as NonNullable<typeof result>;
}
