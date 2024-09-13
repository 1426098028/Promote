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
                <el-button :disabled='disabled' @click='onCaptcha'>获取验证码<span v-if='disabled'>({{ time
                        }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;" round @click='onLogin(ruleFormRef)'
                :loading='isLogin'>登录</el-button>
        </el-form-item>

        <el-form-item>
            <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';
import { sendRegisterOrLoginCaptcha, loginByMobile } from '@/api/login';
import { Encrypt } from '@/utils/aes';

// 定义手机验证码登录接口数据结构
interface PhoneRuleForm {
    mobile: string;
    captcha: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<PhoneRuleForm>({
    mobile: '16675900502',
    captcha: '',
});

const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请填写手机号'));
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请填写正确手机号'));
    } else {
        callback();
    }
};
const rules = reactive<FormRules<PhoneRuleForm>>({
    mobile: [
        { validator: validatePass, trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
});

// 获取验证码
const time = ref<number>(60);
const disabled = ref<boolean>(false);
const onCaptcha = async (): void => {
    const validate = await ruleFormRef.value?.validateField('mobile', () => null);
    if (!validate) return ElMessage.warning('请填写正确内容');
    const res = await sendRegisterOrLoginCaptcha({ mobile: Encrypt(ruleForm.mobile) });
    if (!(res.code == 200)) return ElMessage.error(res.msg);
    ElMessage.success('发送成功');
    disabled.value = true;
    time.value = 60;
    const TimeId = setInterval(() => {
        time.value -= 1;
        if (time.value < 1) {
            clearInterval(TimeId);
            disabled.value = false;
            time.value = 0;
        }
    }, 1000);
};

// 登录
const isLogin = ref<boolean>(false);
const onLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields): void => {
        if (!valid) return ElMessage.warning('请填写正确内容');
        isLogin.value = true;
        const res = await loginByMobile({ mobile: Encrypt(ruleForm.mobile), captcha: Encrypt(ruleForm.captcha) });
        isLogin.value = false;
        if (!(res.code == 200)) return ElMessage.error(res.msg);
    });
};


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
