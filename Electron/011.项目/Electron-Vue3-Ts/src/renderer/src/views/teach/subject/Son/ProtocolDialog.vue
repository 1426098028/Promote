<template>
    <el-dialog append-to-body :model-value="IsVisible" title='协议详情' :close-on-click-modal='false' @close="onCancel">
        <h1 style="text-align: center;">
            {{ ProtocolForm.subjectName }}
        </h1>
        <div class="update-time">
            更新于{{ tool.dateFormat(ProtocolForm.updateTime ? ProtocolForm.updateTime : ProtocolForm.createTime) }}
        </div>
        <div class="protocol" v-html="ProtocolForm.protocol"></div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onCancel">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, } from 'vue';
import { GradeAdd, GradeDetail, GradeUpdate } from '@/api/Teach/Grade';
import tool from '@/utils/tool';
const Props = defineProps({
    IsVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    protocolUpdateId: {
        type: Object,
        required: true,
        default: {}
    },
});
const Emits = defineEmits(["update:IsVisible", "onUpdateListDtata"]);
let ProtocolForm = reactive({});
onBeforeMount(async () => {
    if (!Props.protocolUpdateId.id) return false;
    let { data } = await GradeDetail(Props.protocolUpdateId.id);
    Object.assign(ProtocolForm, data);
});
// 取消
const onCancel = () => {
    ProtocolForm = Object.assign(ProtocolForm, {});
    Emits('update:IsVisible', false);
};
</script>
<style>
.update-time {
    text-align: center;
    font-size: 12px;
    line-height: 30px;
}

.protocol {
    overflow: scroll;
}

.protocol img {
    font-size: 14px;
    line-height: 20px;
    max-width: 100% !important;
}
</style>
