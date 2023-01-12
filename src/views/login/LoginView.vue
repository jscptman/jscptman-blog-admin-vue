<script setup lang="ts">
import JsmButton from "../../components/global/jsmButton/JsmButton.vue";
import useGetCode from "./compose/useGetCode";
const { clickStatus, tipText, getCode } = useGetCode();
</script>
<template>
  <div class="root">
    <main>
      <form id="login-form" class="login-form">
        <h1>登录</h1>
        <fieldset>
          <legend>请输入以下信息</legend>
          <label for="cell-phone-number">手机号 :</label>
          <input
            type="text"
            id="cell-phone-number"
            placeholder="请输入手机号"
            autofocus
          />
          <br />
          <label for="verification-code">验证码 :</label>
          <input
            type="text"
            id="verification-code"
            placeholder="请输入验证码"
          />
          <div class="get-code">
            <a
              href="/getVerificationCode"
              @click.prevent="getCode"
              :style="{
                cursor: clickStatus === 'pending' ? 'not-allowed' : 'pointer',
              }"
              >{{ tipText }}</a
            >
          </div>
        </fieldset>
        <JsmButton
          inner-text="登录"
          style="margin-top: 26px"
          button-type="next"
          type="submit"
        />
      </form>
    </main>
  </div>
</template>
<style scoped>
.root {
  position: relative;
  background: radial-gradient(
      circle at 135% center,
      rgb(254, 229, 229) 10%,
      rgba(168, 200, 201, 0.9) 25%,
      rgba(57, 131, 138, 0.9) 40%,
      #333 60%,
      transparent
    ),
    #000;
  color: #fff;
}
main {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 400px;
  height: 400px;
  margin: auto;
  background: rgba(245, 245, 245, 0.35);
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 0px 5px 3px rgba(255, 255, 255, 0.8);
}
fieldset {
  font-size: 20px;
  border-radius: 8px;
  margin: 0 20px;
}
input {
  margin: 8px;
  background: rgba(255, 255, 255, 0.85);
}
input:focus {
  background-color: white;
}
.get-code {
  margin-top: 12px;
  text-align: right;
  font-size: 13px;
  color: white;
}
a {
  padding: 6px 2px 3px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid #fff;
}
.login-form {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
