<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0" size="large">
        <el-form-item prop="mobile">
            <el-input v-model='ruleForm.mobile' prefix-icon="iphone" clearable placeholder="请输入手机号">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
            <div class="login-msg-yzm">
                <el-input v-model='ruleForm.captcha' prefix-icon="unlock" clearable placeholder="请输入验证码"></el-input>
                <el-button>获取验证码<span>({{ time }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;" round :loading='isLogin'>登录</el-button>
        </el-form-item>

        <el-form-item>
            <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';


// 定义手机验证码登录接口数据结构
interface PhoneRuleForm {
    mobile: string;
    captcha: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<PhoneRuleForm>({
    mobile: '',
    captcha: '',
});

const rules = reactive<FormRules<PhoneRuleForm>>({
    mobile: [
        { required: true, message: '请填写手机号', trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
});

const time = ref<number>(60);
const isLogin = ref<boolean>(false);
</script>

<style scoped>
.login-msg-yzm {
    display: flex;
    width: 100%;
}

.login-msg-yzm .el-button {
    margin-left: 10px;
}
</style>
