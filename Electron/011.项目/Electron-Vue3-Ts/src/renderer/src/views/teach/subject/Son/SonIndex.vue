<template>
    <el-main>
        <el-button class='toolbar' icon="plus" type="primary" @click='onAddAndEdit'>新增等级</el-button>
        <el-table :data="tableData" border>
            <el-table-column align="center" type="index" label="排序" width="60" fixed></el-table-column>
            <el-table-column align="center" prop="gradeName" label="等级名称" fixed />
            <el-table-column align="center" prop="amount" label="价格" />
            <el-table-column align="center" label="协议">
                <template #default="{ row }">
                    <el-link type="primary" :underline="false" v-Auths='"system:user:get"'
                        @click="onProtocol(row)">查看协议</el-link>
                </template>
            </el-table-column>
            <el-table-column align="center" label="启用状态">
                <template #default='{ row }'>
                    <template v-for='item in dicts.system_global_status'>
                        <el-tag :type="row.enabled == '1' ? 'primary' : 'danger'" v-if='row.enabled == item.v'>{{ item.k
                            }}</el-tag>
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
        <gradeDialog v-if='IsVisible' v-model:IsVisible="IsVisible" @onUpdateListDtata='onUpdateListDtata'
            :gradeUpdateId="UpdateId">
        </gradeDialog>
        <protocolDialog v-if='IsVisibleProtocol' v-model:IsVisible="IsVisibleProtocol"
            @onUpdateListDtata='onUpdateListDtata' :protocolUpdateId="UpdateId">
        </protocolDialog>
    </el-main>
</template>
<script lang='ts' setup>
import { onBeforeMount, reactive, ref, getCurrentInstance, watch } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { IGradePageFrom, GradeAll, IGradePageResponse, IGradePageDataRecords, GradeDelete } from '@/api/Teach/Grade';
import tool from '@/utils/tool';
import gradeDialog from './GradeDialog.vue';
import protocolDialog from './ProtocolDialog.vue';

const Props = defineProps({
    GradeInfo: {
        type: Object,
        default: {},
        required: true,
    },
});

const tableData = ref<IGradePageDataRecords[]>([]);

const IsVisible = ref<Boolean>(false);
const IsVisibleProtocol = ref<Boolean>(false);
let UpdateId = reactive({});
onBeforeMount(() => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
});

onBeforeMount(async () => {
    if (!Props.GradeInfo.id) return false;
    getGradePage();
});

const getGradePage = async () => {
    const { id } = Props.GradeInfo;
    const res: IGradePageResponse = await GradeAll({ subjectId: id });
    tableData.value = res.data;
};
const onAddAndEdit = async (ItemInfo) => {
    const { id, subjectName } = Props.GradeInfo;
    UpdateId = { ...ItemInfo, subjectId: id, subjectName } || { subjectId: id, subjectName };
    IsVisible.value = await true;
};
const onProtocol = async (ItemInfo) => {
    const { id, subjectName } = Props.GradeInfo;
    UpdateId = { ...ItemInfo, subjectId: id, subjectName } || { subjectId: id, subjectName };
    IsVisibleProtocol.value = await true;
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
            let res = await GradeDelete(id);
            if (res.code != '200') return;
            getGradePage();
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
    getGradePage();
};
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
