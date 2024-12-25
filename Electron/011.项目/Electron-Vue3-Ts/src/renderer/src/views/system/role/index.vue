<template>
    <el-tabs type="border-card">
        <el-tab-pane label="角色列表">
            <el-card class='card'>
                <el-form :model='roleForm'>
                    <el-row :gutter="15">
                        <el-col :span="8">
                            <el-form-item label="角色名称">
                                <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="角色编码">
                                <el-input v-model="roleForm.rolePerm" placeholder="请输入角色编码" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="状态">
                                <el-select v-model="roleForm.enabled" placeholder="请选择启动状态">
                                    <el-option label="启用" value="1" />
                                    <el-option label="禁用" value="0" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button icon="search" type="primary" @click="getRolePage">搜索</el-button>
                                <el-button icon="refreshLeft" @click="roleReset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <el-button class='toolbar' icon="plus" type="primary">新增</el-button>
                <el-table :data="tableData" border>
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column align="center" prop="roleName" label="角色名称" fixed />
                    <el-table-column align="center" prop="rolePerm" label="权限字符" />
                    <el-table-column align="center" label="是否启用">
                        <template #default='{ row }'>
                            <el-tag :type="row.enabled == 1 ? 'primary' : 'danger'">{{ row.enabled == 1 ? '启用' : '禁用'
                                }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间" :formatter='formatter' />
                    <el-table-column align="center" label="操作" fixed="right">
                        <template #default="{ row }">
                            <el-link icon="edit" type="primary" :underline="false">编辑</el-link>
                            <el-link icon="delete" type="danger" :underline="false" style="margin: 0 8px">删除</el-link>
                            <router-link class="el-link el-link--error" type="success" to="/">分配用户</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="回收站">回收站</el-tab-pane>
    </el-tabs>
</template>
<script lang='ts' setup>
import { onBeforeMount, reactive, ref } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { rolePage, Role, Irole } from '@/api/role';
import tool from '@/utils/tool';


const tableData = ref<Role[]>([]);
let roleForm = reactive<Irole>({
    roleName: '',
    rolePerm: '',
    enabled: '1',
    current: 1,
    size: 10,
});
onBeforeMount(() => {
    getRolePage();
});
const getRolePage = async () => {
    const res = await rolePage(roleForm);
    const { records } = res.data;
    tableData.value = records;
};
//重置
const roleReset = () => {
    roleForm = Object.assign(roleForm, { roleName: '', rolePerm: '', enabled: '1', current: 1, size: 10, });
    console.log(roleForm);
    getRolePage();
};
const formatter = (row: Role, column: TableColumnCtx<Role>, cellValue) => {
    return tool.dateFormat(cellValue);
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
