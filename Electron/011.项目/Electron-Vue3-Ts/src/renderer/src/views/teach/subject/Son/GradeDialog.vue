<template>
    <el-dialog append-to-body :model-value="IsVisible" :title='gradeUpdateId.id ? "修改等级" : "新增等级"'
        :close-on-click-modal='false' @close="onCancel">
        <el-form :model='GradeForm' label-width="80px">
            <el-form-item label="当前科目Id" prop='subjectId' style="display: none;">
                <el-input v-model='GradeForm.subjectId' disabled placeholder='请输入当前科目Id' />
            </el-form-item>
            <el-form-item label="当前科目">
                <el-input v-model='gradeUpdateId.subjectName' disabled placeholder='请输入当前科目' />
            </el-form-item>
            <el-form-item label="等级名称" prop='gradeName' required>
                <el-input v-model='GradeForm.gradeName' placeholder='请输入等级名称' />
            </el-form-item>
            <el-form-item label="价格" prop='amount' required>
                <el-input v-model='GradeForm.amount' placeholder='请输入价格' />
            </el-form-item>
            <el-form-item label="状态" prop='enabled'>
                <el-select v-model="GradeForm.enabled" clearable placeholder="请选择状态">
                    <el-option v-for='item in dicts[`system_global_status`]' :key='item.id' :label="item.k"
                        :value="item.v * 1" />
                </el-select>
            </el-form-item>
            <el-form-item label="协议">
                <WangEditor v-model='GradeForm.protocol' />
            </el-form-item>
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
import { onBeforeMount, ref, reactive, getCurrentInstance, } from 'vue';
import { GradeAdd, GradeDetail, GradeUpdate } from '@/api/Teach/Grade';
import WangEditor from '@/components/WangEditor/index.vue';

const Props = defineProps({
    IsVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    gradeUpdateId: {
        type: Object,
        required: true,
        default: {}
    },
});
const Emits = defineEmits(["update:IsVisible", "onUpdateListDtata"]);
let GradeForm = reactive({
    gradeName: "",
    amount: '',
    enabled: 1,
    subjectId: Props.gradeUpdateId.subjectId,
    protocol: ''
});

onBeforeMount(async () => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
});
onBeforeMount(async () => {
    if (!Props.gradeUpdateId.id) return false;
    let { data: { amount, enabled, gradeName, protocol, subjectId, id } } = await GradeDetail(Props.gradeUpdateId.id);
    Object.assign(GradeForm, { amount, enabled, gradeName, protocol, subjectId, id });
    console.log('onBeforeMount', GradeForm);
});
// 确定
const onSure = async (e) => {
    const res = Props.gradeUpdateId.id ? await GradeUpdate(GradeForm) : await GradeAdd(GradeForm);
    if (res.code != '200') return;
    Emits('onUpdateListDtata', false);
    await onCancel();
};
// 取消
const onCancel = () => {
    GradeForm = Object.assign(GradeForm, { username: "", password: "", realName: "", email: "", gender: '1', avatar: "", remark: "", phone: "", enabled: '1', roleIds: [], postIds: [], unitId: "" });
    Emits('update:IsVisible', false);
};
</script>
