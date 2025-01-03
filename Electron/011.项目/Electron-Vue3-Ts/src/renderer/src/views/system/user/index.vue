<template>
    <el-tabs type="border-card">
        <el-tab-pane label="用户列表">
            <el-card class='card'>
                <el-form :model='UserForm' label-width="100px">
                    <el-row :gutter="15">
                        <el-col :span="8">
                            <el-form-item label="用户名称">
                                <el-input v-model="UserForm.username" clearable placeholder="请输入用户名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="真实姓名">
                                <el-input v-model="UserForm.realName" clearable placeholder="请输入真实姓名" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱">
                                <el-input v-model="UserForm.email" clearable placeholder="请输入邮箱" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号">
                                <el-input v-model="UserForm.phone" clearable placeholder="请输入手机号" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="机构ID">
                                <el-input v-model="UserForm.unitId" clearable placeholder="请输入机构ID" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="性别">
                                <el-select v-model="UserForm.gender" clearable placeholder="请选择性别">
                                    <el-option v-for='item in dicts[`system_global_gender`]' :key='item.id'
                                        :label="item.k" :value="item.v" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账户状态">
                                <el-select v-model="UserForm.enabled" clearable placeholder="请选择账户状态">
                                    <el-option v-for='item in dicts[`system_global_status`]' :key='item.id'
                                        :label="item.k" :value="item.v" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button icon="search" type="primary" @click="getUserPage">搜索</el-button>
                                <el-button icon="refreshLeft" @click="onUserReset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <el-button class='toolbar' icon="plus" type="primary" @click='onAddAndEdit'>新增</el-button>
                <el-table :data="tableData" border>
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column align="center" prop="username" label="用户姓名" fixed />
                    <el-table-column align="center" prop="realName" label="真实姓名" />
                    <el-table-column align="center" label="用户类型">
                        <template #default='{ row }'>
                            <div v-if="row.userType == 0">普通账号</div>
                            <div v-if="row.userType == 1">超级管理员</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="phone" label="手机号码" />
                    <el-table-column align="center" label="用户性别">
                        <!-- gender -->
                        <template #default='{ row }'>
                            <template v-for='item in dicts.system_global_gender'>
                                <div v-if='row.gender == item.v'>{{ item.k }}</div>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="账户状态">
                        <template #default='{ row }'>
                            <template v-for='item in dicts.system_global_status'>
                                <el-tag :type="row.enabled == '1' ? 'primary' : 'danger'"
                                    v-if='row.enabled == item.v'>{{ item.k }}</el-tag>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="300" fixed="right">
                        <template #default="{ row }">
                            <el-link icon="edit" type="primary" :underline="false" style="margin: 0 8px"
                                v-Auths='"system:user:get"' @click="onAddAndEdit(row)">编辑</el-link>
                            <el-link icon="delete" type="danger" :underline="false" style="margin: 0 8px"
                                v-Auths='"system:user:delete"' @click='onDelete(row)'>删除</el-link>
                            <el-link icon="Refresh" type="success" :underline="false" style="margin: 0 8px"
                                v-Auths='"system:user:reset"' @click='onReset(row)'>重置密码</el-link>
                            <router-link class="el-link el-link--error" type="success" to="/">分配角色</router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :CurrentPage='UserForm.current' :CurrentSize='UserForm.size' :Total='Total'
                    @update:onSizeChange='onSizeChange' @update:onCurrentChange='onCurrentChange' />
            </el-card>
            <userDialog v-if='IsVisible' v-model:IsVisible="IsVisible" @onUpdateListDtata='onUpdateListDtata'
                :userUpdateId="UserUpdateId">
            </userDialog>
        </el-tab-pane>
        <el-tab-pane label="回收站">回收站</el-tab-pane>
    </el-tabs>
</template>
<script lang='ts' setup>
import { onBeforeMount, reactive, ref, getCurrentInstance } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { IUserPageFrom, UserPage, IUserPageResponse, IUserPageDataRecords, UserDelete, UserReset } from '@/api/System/User';
import userDialog from './userDialog.vue';

const tableData = ref<IUserPageDataRecords[]>([]);
let Total = ref(10);
let UserForm = reactive<IUserPageFrom>({
    username: '',
    realName: '',
    email: '',
    phone: '',
    gender: '1',
    unitId: '',
    enabled: "1",
    current: 1,
    size: 10,
});
const IsVisible = ref<Boolean>(false);
const UserUpdateId = ref('');
onBeforeMount(() => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status', 'system_global_gender']);
    getUserPage();
});
const getUserPage = async () => {
    const res: IUserPageResponse = await UserPage(UserForm);
    const { records, total } = res.data;
    Total.value = total;
    tableData.value = records;
};
//重置
const onUserReset = () => {
    Object.assign(UserForm, { username: '', realName: '', email: '', phone: '', gender: '', unitId: '', enabled: '1', current: 1, size: 10, });
    getUserPage();
};

const onSizeChange = (Size) => {
    UserForm.size = Size;
    getUserPage();
};
const onCurrentChange = (page) => {
    UserForm.current = page;
    getUserPage();
};


const onAddAndEdit = async ({ id }) => {
    UserUpdateId.value = id || '';
    IsVisible.value = await true;
};



const onDelete = ({ id }) => {
    ElMessageBox.confirm(
        '确定删除该条数据吗！ 继续?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await UserDelete(id);
            if (res.code != '200') return;
            getUserPage();
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消成功',
            });
        });
};
const onReset = ({ id }) => {
    ElMessageBox.confirm(
        '确定重置该账户密码吗！ 继续?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await UserReset(id);
            if (res.code != '200') return;
            getUserPage();
            ElMessage({
                type: 'success',
                message: '重置成功'
            });
        })
        .catch((err) => {
            console.log(err);
            ElMessage({
                type: 'info',
                message: '取消成功',
            });
        });
};
const onUpdateListDtata = (StateVisible) => {
    getUserPage();
}

</script>
<style scoped lang='scss'>
.card {
    margin-bottom: 15px;
}

.toolbar {
    margin-bottom: 15px;
}

.el-table {
    font-size: 12px;
}
</style>
