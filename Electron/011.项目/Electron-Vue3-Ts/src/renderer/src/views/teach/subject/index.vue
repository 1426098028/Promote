<template>
    <el-tabs type="border-card">
        <el-tab-pane label="科目列表">
            <el-card class='card'>
                <el-form :model='SubjectForm' label-width="100px">
                    <el-row :gutter="15">
                        <el-col :span="8">
                            <el-form-item label="科目名称">
                                <el-input v-model="SubjectForm.subjectName" clearable placeholder="请输入科目名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="科目状态">
                                <el-select v-model="SubjectForm.enabled" clearable placeholder="请选择科目状态">
                                    <el-option v-for='item in dicts[`system_global_status`]' :key='item.id'
                                        :label="item.k" :value="item.v" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button icon="search" type="primary" @click="getSubjectPage">搜索</el-button>
                                <el-button icon="refreshLeft" @click="onSubjectReset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card type="expand">
                <el-button class='toolbar' icon="plus" type="primary" @click='onAddAndEdit'>新增科目</el-button>
                <el-button class='toolbar' icon="Printer">导出</el-button>
                <el-table :data="tableData" border>
                    <el-table-column align="center" type="expand" label="等级管理" fixed width="100">
                        <template #default="{ row }">
                            <SonIndex :GradeInfo='row' />
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="subjectName" label="科目名称" fixed />
                    <el-table-column align="center" label="科目状态">
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
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :CurrentPage='SubjectForm.current' :CurrentSize='SubjectForm.size' :Total='Total'
                    @update:onSizeChange='onSizeChange' @update:onCurrentChange='onCurrentChange' />
            </el-card>
            <subjectDialog v-if='IsVisible' v-model:IsVisible="IsVisible" @onUpdateListDtata='onUpdateListDtata'
                :subjectUpdateId="SubjectUpdateId">
            </subjectDialog>
        </el-tab-pane>
        <el-tab-pane label="回收站">回收站</el-tab-pane>
    </el-tabs>
</template>
<script lang='ts' setup>
import { onBeforeMount, reactive, ref, getCurrentInstance } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { ISubjectPageFrom, SubjectPage, ISubjectPageResponse, ISubjectPageDataRecords, SubjectDelete } from '@/api/Teach/Subject';
import tool from '@/utils/tool';
import subjectDialog from './SubjectDialog.vue';
import SonIndex from './Son/SonIndex.vue';

const tableData = ref<ISubjectPageDataRecords[]>([]);
let Total = ref(10);
let SubjectForm = reactive<ISubjectPageFrom>({
    subjectName: '',
    enabled: "1",
    current: 1,
    size: 10,
});
const IsVisible = ref<Boolean>(false);
const SubjectUpdateId = ref('');
onBeforeMount(() => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
    getSubjectPage();
});
const getSubjectPage = async () => {
    const res: ISubjectPageResponse = await SubjectPage(SubjectForm);
    const { records, total } = res.data;
    Total.value = total;
    tableData.value = records;
};
//重置
const onSubjectReset = () => {
    Object.assign(SubjectForm, { subjectName: '', enabled: "1", current: 1, size: 10, });
    getSubjectPage();
};

const onSizeChange = (Size) => {
    SubjectForm.size = Size;
    getSubjectPage();
};
const onCurrentChange = (page) => {
    SubjectForm.current = page;
    getSubjectPage();
};


const onAddAndEdit = async ({ id }) => {
    SubjectUpdateId.value = id || '';
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
            let res = await SubjectDelete(id);
            if (res.code != '200') return;
            getSubjectPage();
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
};
const onUpdateListDtata = (StateVisible) => {
    getSubjectPage();
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
