<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1> {{ isMobile ? '手机登录' : '扫码登录' }} </h1>
      <el-card shadow="never" class="login-card">
        <el-form v-show="isMobile" ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input style="width: 100%;" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input style="width: 100%;" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree" style=" text-align: left;  width: 100%;">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width: 100%;" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
        <div v-show="!isMobile" style="padding: 30px;position: relative;">
          <canvas ref="QrCodeCanvas"> </canvas>
          <div v-if="QtError" @click="onCodeLogin"
            style="position: absolute; background-color: rgba(0, 0, 0, 0.6);  width: 240px;height: 240px;top: 50%;left: 50%;transform: translate(-50%, -50%);color: rgb(255, 255, 255);   display: flex;flex-direction: column;align-items: center;justify-content: center;">
            <i class="el-icon-refresh-left" style="   font-family: 700; font-size: 70px;"></i>
            <span style=" padding:  10px 0 0 0 ; font-weight: 500; font-size: 40px;color: #f33; "> 刷新</span>
          </div>
        </div>
        <div v-if="CodeState" style="padding: 20px 0 10px 0; color: #f33; ">
          {{ CodeState }}
        </div>
        <el-row type="flex">
          <el-button style="width:50%;" size="small" @click="onMobile">手机登录</el-button>
          <el-button style="width:50%;" size="small" @click="onCodeLogin">扫码登录</el-button>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { login, loginQrcodeKey, LoginQrcodeState, } from '@/api/user'
import QRCode from 'qrcode'
export default {
  name: "Login",
  data() {
    return {
      isMobile: true,
      QtError: true,
      CodeState: '',
      loginForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度应该为6-16位之间',
          trigger: 'blur'
        }],
        // required只能检查 null "" undefined
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule规则
            // value检查的数据 true/false
            // callback 函数 执行这个函数
            // 成功执行callback 失败也执行callback(错误对象 new Error(错误信息))
            value ? callback() : callback(new Error('没有勾选用户平台协议'))
          }
        }]
      },
      Time: null
    }
  },
  beforeDestroy() { clearTimeout(this.Time) },
  methods: {
    login() {
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          console.log('验证通过')
          // 触发vuexlogin方法
          this.$store.dispatch('user/login', this.loginForm)
        }
      })
    },
    async onMobile() {
      this.isMobile = true;
      clearTimeout(this.Time)
    },
    async onCodeLogin() {
      this.isMobile = false
      this.QtError = false
      this.CodeState = ''
      try {
        const Qt = await loginQrcodeKey()
        QRCode.toCanvas(this.$refs.QrCodeCanvas, Qt, { width: 200, height: 200, margin: 0, })
          .then(() => { this.QtState(Qt) })
          .catch(err => {
            this.QtError = true
            this.$message.error('二维码获取失败')
          })
      } catch (error) {
        this.QtError = true
        this.$message.error('二维码获取失败')
        this.CodeState = error
      }
    },
    async QtState(Qt) {
      const State = { 1: '用户未扫码但是加密串正常', 2: '用户已扫码但未点击登录', 3: '扫码登录成功', 4: '二维码密钥已失效', 5: '用户取消登录', }
      const { codeState, token } = await LoginQrcodeState({ qrcode_key: Qt })
      switch (codeState) {
        case 1:
        case 2:
          console.log(State[codeState])
          this.Time = setTimeout(() => this.QtState(Qt), 1000)
          break;
        case 3:
          clearTimeout(this.Time)
          console.log(State[codeState])
          this.CodeState = State[codeState]
          this.$store.commit('user/setToken', token)
          break;
        default:
          clearTimeout(this.Time)
          console.log(State[codeState])
          this.QtError = true
          this.CodeState = State[codeState]
          break;
      }
    },
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-card {
      border: none;
      padding: 0;
      width: min-content;
    }

    .el-card__body {
      padding: 0;
      text-align: center;
    }

    .login-card {
      width: 50%;
    }

    h1 {
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-button {
      width: 350px;
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
