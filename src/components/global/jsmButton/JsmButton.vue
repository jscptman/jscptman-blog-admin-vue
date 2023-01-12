<script setup lang="ts">
// import type { Props } from "./types";
const props = withDefaults(
  defineProps<{
    innerText?: string;
    buttonType: string;
  }>(),
  {
    innerText: "确定",
    buttonType: "normal",
  }
);
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<template>
  <template v-if="buttonType === 'normal'">
    <button id="btn" class="normal-button"></button>
    <label for="btn" v-bind="$attrs">{{ props.innerText }}</label>
  </template>
  <template v-if="buttonType === 'next'">
    <button id="btn" class="next-button" v-bind="$attrs">
      {{ props.innerText }}
    </button>
  </template>
</template>
<style scoped>
.normal-button {
  position: absolute;
  clip: rect(0 0 0 0);
}
label {
  display: inline-block;
  cursor: pointer;
  max-width: 100%;
}
.next-button {
  display: inline-block;
  position: relative;
  text-indent: -999px;
  border: 1px solid #999;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: rgba(245, 245, 245, 0.35);
  transition: all 0.3s ease-in-out;
  box-shadow: none;
  cursor: pointer;
}
.next-button:hover {
  box-shadow: 0 0 2px 3px rgba(255, 255, 255, 0.7);
}
.next-button::before {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: url("@/assets/images/right-arrow.png") no-repeat center/contain;
}
</style>
