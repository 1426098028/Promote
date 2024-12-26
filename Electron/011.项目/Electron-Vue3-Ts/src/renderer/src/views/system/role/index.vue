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
                                    <el-option v-for='item in dicts[`system_global_status`]' :key='item.id'
                                        :label="item.k" :value="item.v" />
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
                <el-button class='toolbar' icon="plus" type="primary" @click='onAddAndEdit'>新增</el-button>
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
                            <el-link icon="edit" type="primary" :underline="false"
                                @click="onAddAndEdit(row)">编辑</el-link>
                            <el-link icon="delete" type="danger" :underline="false" style="margin: 0 8px"
                                @click='onDelete(row)'>删除</el-link>
                            <router-link class="el-link el-link--error" type="success" to="/">分配用户</router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :CurrentPage='roleForm.current' :CurrentSize='roleForm.size' :Total='Total'
                    @update:onSizeChange='onSizeChange' @update:onCurrentChange='onCurrentChange' />
            </el-card>
            <roleDialog v-if='IsVisible' v-model:IsVisible="IsVisible" @onUpdateListDtata='onUpdateListDtata'
                :roleUpdateId="roleUpdateId">
            </roleDialog>
        </el-tab-pane>
        <el-tab-pane label="回收站">回收站</el-tab-pane>
    </el-tabs>
</template>
<script lang='ts' setup>
import { onBeforeMount, reactive, ref, getCurrentInstance } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { rolePage, Role, Irole, roleDelete } from '@/api/role';
import tool from '@/utils/tool';
import roleDialog from './roleDialog.vue';


const tableData = ref<Role[]>([]);
let Total = ref(10);
let roleForm = reactive<Irole>({
    roleName: '',
    rolePerm: '',
    enabled: '1',
    current: 1,
    size: 10,
});
const IsVisible = ref<Boolean>(false);
const roleUpdateId = ref('');
onBeforeMount(() => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
    getRolePage();
});
const getRolePage = async () => {
    const res = await rolePage(roleForm);
    const { records, total } = res.data;
    console.log(total);
    Total.value = total;
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
};
const onSizeChange = (Size) => {
    roleForm.size = Size;
    getRolePage();
};
const onCurrentChange = (page) => {
    roleForm.current = page;
    getRolePage();
};


const onAddAndEdit = async ({ id }) => {
    roleUpdateId.value = id || '';
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
            let res = await roleDelete(id);
            if (res.code != '200') return;
            getRolePage();
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
const onUpdateListDtata = (StateVisible) => {
    getRolePage();
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
