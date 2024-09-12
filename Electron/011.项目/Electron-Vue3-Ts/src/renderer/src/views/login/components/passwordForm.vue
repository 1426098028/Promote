<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0" size="large">
        <el-form-item prop="username">
            <el-input v-model='ruleForm.username' prefix-icon="user" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model='ruleForm.password' prefix-icon="lock" clearable show-password
                placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
            <div class="box-code">
                <el-input v-model='ruleForm.captcha' prefix-icon="CircleCheck" clearable
                    placeholder="请输入验证码"></el-input>
                <el-image class='code'
                    src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'></el-image>
            </div>
        </el-form-item>

        <div class="remember">
            <div>
                <el-checkbox label="记住密码"></el-checkbox>
            </div>
            <div>
                <router-link to="">忘记密码?</router-link>
            </div>
        </div>
        <el-form-item>
            <el-button type="primary" round style="width:100%" :loading='isLogin'>登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

// 定义账号密码登录接口数据结构
interface RuleFrom {
    username: string;
    password: string;
    key: string;
    captcha: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleFrom>({
    username: '',
    password: '',
    key: '',
    captcha: ''
});
// 表单验证规则
const rules = reactive<FormRules<RuleFrom>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ]
});
const isLogin = ref<boolean>(false);


</script>

<style scoped>
.box-code {
    display: flex;
    align-items: center;
    width: 100%;
}

.code {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    cursor: pointer;
}

.remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
}
</style>
