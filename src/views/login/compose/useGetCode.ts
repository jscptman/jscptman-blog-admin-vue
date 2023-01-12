import { effectScope, onScopeDispose, ref, computed } from "vue";
import type { Ref } from "vue";
function clickAnchorAnimationStart(
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
export default function useGetCode() {
  let timer: NodeJS.Timer | undefined;
  const scope = effectScope();
  const result = scope.run(() => {
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
      clickAnchorAnimationStart(clickStatus, remainTime, timer);
    }
    onScopeDispose(() => {
      scope.stop();
      clearInterval(timer);
    });
    return { clickStatus, tipText, getCode };
  });

  return result as Exclude<typeof result, undefined>;
}
