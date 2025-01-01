<template>
    <el-dialog append-to-body :model-value="IsVisible" :title='userUpdateId ? "修改用户" : "新增用户"'
        :close-on-click-modal='false' @close="onCancel">
        <el-form :model='UserForm' label-width="80px">
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-form-item label="用户名称" required>
                        <el-input v-model='UserForm.username' placeholder='请输入用户名称' />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码" required>
                        <el-input v-model='UserForm.password' placeholder='请输入密码' />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="真实姓名" required>
                        <el-input v-model='UserForm.realName' placeholder='请输入真实姓名' />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" required>
                        <el-input v-model='UserForm.email' placeholder='请输入邮箱' />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" required>
                        <el-input v-model='UserForm.phone' placeholder='请输入手机号' />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-select v-model="UserForm.gender" clearable placeholder="请选择性别">
                            <el-option v-for='item in dicts[`system_global_gender`]' :key='item.id' :label="item.k"
                                :value="item.v * 1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="启用状态">
                        <el-select v-model="UserForm.enabled" clearable placeholder="请选择启用状态">
                            <el-option v-for='item in dicts[`system_global_status`]' :key='item.id' :label="item.k"
                                :value="item.v * 1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属机构">
                        <el-tree-select v-model="UserForm.unitId" :data="TreeList.Unit" placeholder="请选择所属机构"
                            node-key="id" :props='{ label: "name" }' :render-after-expand="false" show-checkbox
                            check-strictly check-on-click-node />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属岗位">
                        <el-tree-select v-model="UserForm.postIds" :data="TreeList.Post" multiple placeholder="请选择所属岗位"
                            node-key="id" :props='{ label: "postName" }' :render-after-expand="false" show-checkbox
                            check-strictly check-on-click-node />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分配角色">
                        <el-tree-select v-model="UserForm.roleIds" :data="TreeList.Role" multiple placeholder="请选择分配角色"
                            node-key="id" :props='{ label: "roleName" }' :render-after-expand="false" show-checkbox
                            check-strictly check-on-click-node />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model='UserForm.remark' placeholder="请输入备注内容" :maxlength="200"
                            show-word-limit />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-Auths='["system:user:add", "system:user:update"]' type="primary"
                    @click="onSure">确定</el-button>
                <el-button @click="onCancel">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref, getCurrentInstance, watch } from 'vue';
import { UserAdd, UserDetail, UserUpdate } from '@/api/System/User';
import { rolePage } from '@/api/role';
import { UnitPage } from '@/api/System/Unit';
import { PostPage } from '@/api/System/Post';


const Props = defineProps({
    IsVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    userUpdateId: {
        type: String,
        default: ''
    },
});
const Emits = defineEmits(["update:IsVisible", "onUpdateListDtata"]);
let UserForm = reactive({
    username: "",
    password: "",
    realName: "",
    email: "",
    gender: 1,
    avatar: "",
    remark: "",
    phone: "",
    enabled: 1,
    roleIds: [],
    postIds: [],
    unitId: ""
});


const TreeList = reactive({ Role: [], Post: [], Unit: [], });

onBeforeMount(() => {
    onGetUnitPage();
    onGetPostPage();
    onGetRolePage();
});

onBeforeMount(async () => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status', 'system_global_gender']);
});

onBeforeMount(async () => {
    if (!Props.userUpdateId) return false;
    let { data: { user, roleIds, postIds } } = await UserDetail(Props.userUpdateId);
    let { id, username, password, realName, email, gender, avatar, remark, phone, enabled, unitId } = user;
    UserForm = Object.assign(UserForm, { id, username, password, realName, email, gender, avatar, remark, phone, enabled, roleIds, postIds, unitId });
});


const onGetUnitPage = async () => {
    let { data } = await UnitPage();
    TreeList.Unit = data;
};
const onGetPostPage = async () => {
    let { data: { records } } = await PostPage();
    TreeList.Post = records;
};
const onGetRolePage = async () => {
    let { data: { records } } = await rolePage();
    TreeList.Role = records;
};

// 确定
const onSure = async (e) => {
    const res = Props.userUpdateId ? await UserUpdate(UserForm) : await UserAdd(UserForm);
    if (res.code != '200') return;
    Emits('onUpdateListDtata', false);
    await onCancel();
};
// 取消
const onCancel = () => {
    UserForm = Object.assign(UserForm, { username: "", password: "", realName: "", email: "", gender: '1', avatar: "", remark: "", phone: "", enabled: '1', roleIds: [], postIds: [], unitId: "" });
    Emits('update:IsVisible', false);
};
</script>
