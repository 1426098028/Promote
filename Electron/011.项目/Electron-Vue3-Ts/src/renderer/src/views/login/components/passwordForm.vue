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
                <el-image class='code' :src='CaptchaUrl' @click='onCaptcha'></el-image>
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
            <el-button type="primary" round style="width:100%" :loading='isLogin'
                @click='onLogin(ruleFormRef)'>登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { captchaImage, loginByJson } from '@/api/login';
import { Encrypt } from '@/utils/aes';
import { UserRuleFrom } from '@/interface/login';


const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<UserRuleFrom>({
    username: 'admin',
    password: 'abc123456',
    key: '',
    captcha: ''
});
// 表单验证规则
const rules = reactive<FormRules<UserRuleFrom>>({
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


// 获取验证码
const CaptchaUrl = ref<string>();
const onCaptcha = async () => {
    const key: string = new Date().getTime().toString();
    ruleForm.key = key;
    const res = await captchaImage({ key });
    let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
    CaptchaUrl.value = URL.createObjectURL(blob);
    console.log(CaptchaUrl.value);
};
// vue 生命周期 注册一个钩子，在组件被挂载之前被调用
onBeforeMount(() => {
    onCaptcha();
});

// 登录
const isLogin = ref<boolean>(false);
const onLogin = async (formEl: FormInstance | undefined) => {

    if (!formEl) return;
    isLogin.value = true
    await formEl.validate(async (valid, fields) => {
        if (!valid) {
            isLogin.value = false;
            ElMessage.warning('请填写正确内容');
            return false;
        };
        const res = await loginByJson({
            username: Encrypt(ruleForm.username),
            password: Encrypt(ruleForm.password),
            key: ruleForm.key,
            captcha: ruleForm.captcha
        });
        isLogin.value = false;
        if (res.code != '200') {
            return ElMessage.error(res.msg);
        }
    });
};
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
