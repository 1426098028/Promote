<template>
    <el-container>
        <el-header class='titlebar' height="40px">
            <div class="title">任务列表</div>
            <el-icon class="close" size="large" @click="TaskCloseWin">
                <el-icon-close />
            </el-icon>
        </el-header>
        <el-main style="flex:1">
            <el-card class='card'>
                <el-form :model='TaskForm' label-width="100px">
                    <el-row :gutter="15">
                        <el-col :span="8">
                            <el-form-item label="任务名称">
                                <el-input v-model="TaskForm.taskName" clearable placeholder="请输入任务名称" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="任务状态">
                                <el-select v-model="TaskForm.status" clearable placeholder="请选择任务状态">
                                    <el-option label="已完成" value="1"></el-option>
                                    <el-option label="进行中" value="0"></el-option>
                                    <el-option label="失败" value="-1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button icon="search" type="primary" @click="getTaskPage">搜索</el-button>
                                <el-button icon="refreshLeft" @click="onTaskReset">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card>
                <el-button class='toolbar' icon="plus" type="primary" :disabled='CheckboxKeyIdArr.length == 0'
                    @click='onBatchDelete'>批量删除</el-button>
                <el-table :data="tableData" border @selection-change='onSelectionChange'>
                    <el-table-column type="selection" fixed></el-table-column>
                    <el-table-column align="center" type="index" label="排序" width="60" fixed>序号</el-table-column>
                    <el-table-column align="center" prop="taskName" label="任务名称" fixed />
                    <el-table-column align="center" label="任务状态">
                        <template #default='{ row }' prop="status">
                            <el-tag type="success" v-if="row.status == 1">已完成</el-tag>
                            <el-tag type="danger" v-if="row.status == -1">已失败</el-tag>
                            <el-tag type="info" v-if="row.status == 0">进行中</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间" :formatter='formatter' />
                    <el-table-column align="center" label="操作" width="300" fixed="right">
                        <template #default="{ row }">
                            <el-link icon="Link" type="primary" :underline="false" style="margin: 0 8px"
                                v-if="row.status == 1" v-Auths='"system:user:get"' @click="onDownload(row)">下载</el-link>
                            <el-link icon="Link" type="primary" :underline="false" style="margin: 0 8px"
                                v-if="row.status == -1" v-Auths='"system:user:get"'
                                @click="onErrorLog(row)">错误日志</el-link>
                            <el-link icon="delete" type="danger" :underline="false" style="margin: 0 8px"
                                v-if="row.status = 1 || -1" v-Auths='"system:user:delete"'
                                @click='onDelete(row)'>删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-main>
        <el-footer class='footer'>
            <el-dialog title="错误日志" width="800" v-model="ErrorInfo.show" :append-to-body="true" :destroy-on-close="true"
                align-center>
                <pre class="line-numbers"><code class="language-javascript">{{ ErrorInfo.ErrorTextarea }}</code></pre>
            </el-dialog>
            <pagination :CurrentPage='TaskForm.current' :CurrentSize='TaskForm.size' :Total='Total'
                @update:onSizeChange='onSizeChange' @update:onCurrentChange='onCurrentChange' />
        </el-footer>
    </el-container>
</template>
<script lang='ts' setup>
import Prism from "prismjs";
import { onBeforeMount, reactive, ref, getCurrentInstance, nextTick } from 'vue';
import type { TableColumnCtx } from 'element-plus';
import { ITaskPageFrom, TaskPage, ITaskPageResponse, ITaskPageDataRecords, TaskDelete, TaskBatchDelete } from '@/api/Task/index';
import tool from '@/utils/tool';
import userDialog from './userDialog.vue';

const tableData = ref<ITaskPageDataRecords[]>([]);
let Total = ref(10);
let ErrorInfo = reactive({
    show: false,
    ErrorTextarea: ''
});
let TaskForm = reactive<ITaskPageFrom>({
    taskName: '',
    status: "1",
    current: 1,
    size: 10,
});
let CheckboxKeyIdArr = ref<string[]>([]);

onBeforeMount(() => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
    getTaskPage();
});
const getTaskPage = async () => {
    const res: ITaskPageResponse = await TaskPage(TaskForm);
    const { records, total } = res.data;
    Total.value = total;
    tableData.value = records;
};
//重置
const onTaskReset = () => {
    Object.assign(TaskForm, { taskName: '', status: "1", current: 1, size: 10, });
    getTaskPage();
};

const onSizeChange = (Size) => {
    TaskForm.size = Size;
    getTaskPage();
};
const onCurrentChange = (page) => {
    TaskForm.current = page;
    getTaskPage();
};
const formatter = (row: Role, column: TableColumnCtx<Role>, cellValue) => {
    return tool.dateFormat(cellValue);
};

const onDownload = async (item) => {
    const { downloadUrl } = item;
    const FileName = downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1);
    window.electron.ipcRenderer.invoke('renderer-to-main', {
        TypeName: 'Download-Task-Dialog', data: {
            downloadUrl,
            FileName
        }
    });
};
const onErrorLog = async ({ errorLog }) => {
    Object.assign(ErrorInfo, { show: true, ErrorTextarea: errorLog });
    await nextTick();
    await Prism.highlightAll();
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
            let res = await TaskDelete(id);
            if (res.code != '200') return;
            getTaskPage();
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
const onSelectionChange = (Selections) => {
    CheckboxKeyIdArr.value = [];
    CheckboxKeyIdArr.value = Selections.map(item => item.id);
};
const onBatchDelete = () => {
    ElMessageBox.confirm(
        '确定批量删除吗？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await TaskBatchDelete(CheckboxKeyIdArr.value);
            if (res.code != '200') return;
            getTaskPage();
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
        })
        .catch((err) => {
            ElMessage({
                type: 'info',
                message: '取消成功',
            });
        });
};
const TaskCloseWin = () => {
    window.electron.ipcRenderer.invoke('renderer-to-main', { TypeName: 'Task-Download-Win-Close', });
};
</script>
<style scoped lang='scss'>
.titlebar {
    -webkit-app-region: drag;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e7ed;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #fff;

    .title {
        font-size: 14px;
        font-weight: bold;
        color: #3c4a54;
    }

    .close {
        -webkit-app-region: no-drag;
        cursor: pointer;
    }
}

.footer {
    border-top: 1px solid #e4e7ed;
    position: sticky;
    bottom: 0;
    z-index: 9999;
    background-color: #fff;
}
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
