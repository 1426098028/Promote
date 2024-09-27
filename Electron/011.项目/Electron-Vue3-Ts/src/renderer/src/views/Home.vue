<template>
  <div class="login" @mousedown='onMousedown' @mousemove='onMousemove' @mouseup='onMouseup'>
    <!--左侧-->
    <div class="login_adv">
      <div class="login_adv_title">
        <h2>小鹿线</h2>
        <h4>客户关系管理系统</h4>
        <p>让业务在线更高效，加速企业数字化升级。</p>
      </div>
      <div class="login_adv_mask"></div>

      <div class="login_adv_imgage">
        <img draggable="false" src="@/assets/images/data.png" width="100%">
      </div>
      <div class="login_adv_bottom">
        © 小鹿线客户管理系统 1.0.11
      </div>
    </div>
    <!--右侧-->
    <div class="login-main">
      <div class="login-form">

        <div class="login-header">
          <div class="login-img">
            <img draggable="false" src="@/assets/images/logo.png" alt="">
            <label>小鹿线客户管理系统</label>
          </div>
        </div>
        <el-tabs>
          <el-tab-pane label="账号登录" lazy style="height: 300px;">
            <passwordForm></passwordForm>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" lazy style="height: 300px;">
            <phoneForm></phoneForm>
          </el-tab-pane>
        </el-tabs>
        <template v-if='true'>
          <el-divider>其他登录方式</el-divider>
          <div class="login-oauth">
            <!--微信按钮-->
            <el-button type="success" circle size="large">
              <el-icon size="large">
                <ChatDotRound />
              </el-icon>
            </el-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import passwordForm from '@/views/login/components/passwordForm.vue';
import phoneForm from '@/views/login/components/phoneForm.vue';
import { ref } from 'vue';

const isKeyDown = ref<boolean>(false);
const dinatesX = ref<number>(0);
const dinatesY = ref<numder>(0);

const onMousedown = ({ x, y }): void => {
  isKeyDown.value = true;
  dinatesX.value = x;
  dinatesY.value = y;
};
const onMousemove = ({ screenX, screenY }) => {
  if (!isKeyDown.value) return false;
  const X = screenX - dinatesX.value;
  const Y = screenY - dinatesY.value;
  const data = { appX: X, appY: Y, };
  electron.ipcRenderer.invoke('custom-adsorption', data);
};
const onMouseup = (eve) => {
  isKeyDown.value = false;
}

</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
}

.login_adv {
  background: url('@/assets/images/auth_banner.jpg') no-repeat;
  width: 40%;
  position: relative;
}

.login_adv_title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 40px;
  color: #fff;
}

.login_adv_title h2 {
  font-size: 40px;
}

.login_adv_title h4 {
  font-size: 18px;
  margin-top: 10px;
}

.login_adv_title p {
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.8;
  color: rgb(255, 255, 255, .6);
}

.login_adv_imgage {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 80px;
  padding: 40px;
  z-index: 3;
}

.login_adv_imgage img {
  width: 100%;
  height: 100%;
}

.login_adv_bottom {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: #fff;
  padding: 0 40px 40px 40px;
}

.login_adv_mask {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}

.login-main {
  flex: 1;
  display: flex;
  overflow: auto;
}

.login-form {
  width: 400px;
  margin: auto;
  padding: 80px 0 0 0;
}

.login-header {
  margin-bottom: 40px;
}

.login-header .login-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-header .login-img img {
  width: 40px;
  height: 40px;
  vertical-align: bottom;
  margin-right: 10px;
}

.login-header .login-img label {
  font-size: 26px;
  font-weight: bold;
  color: #000;
}

.login-oauth {
  display: flex;
  justify-content: space-around;
}
</style>
