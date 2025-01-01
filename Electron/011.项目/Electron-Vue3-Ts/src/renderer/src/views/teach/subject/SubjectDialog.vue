<template>
    <el-dialog append-to-body :model-value="IsVisible" :title='subjectUpdateId ? "修改科目" : "新增科目"'
        :close-on-click-modal='false' @close="onCancel">
        <el-form :model='SubjectForm' label-width="80px">
            <el-form-item label="科目名称" required>
                <el-input v-model='SubjectForm.subjectName' placeholder='请输入科目名称' />
            </el-form-item>

            <el-form-item label="科目状态">
                <el-select v-model="SubjectForm.enabled" clearable placeholder="请选择科目状态">
                    <el-option v-for='item in dicts[`system_global_status`]' :key='item.id' :label="item.k"
                        :value="item.v * 1" />
                </el-select>
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
import { onBeforeMount, reactive, ref, getCurrentInstance, watch } from 'vue';
import { SubjectAdd, SubjectDetail, SubjectUpdate } from '@/api/Teach/Subject';

const Props = defineProps({
    IsVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    subjectUpdateId: {
        type: String,
        default: ''
    },
});
const Emits = defineEmits(["update:IsVisible", "onUpdateListDtata"]);
let SubjectForm = reactive({
    subjectName: "",
    enabled: 1,
});


const TreeList = reactive({ Role: [], Post: [], Unit: [], });

onBeforeMount(async () => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
});

onBeforeMount(async () => {
    if (!Props.subjectUpdateId) return false;
    let { data: { id, subjectName, enabled, } } = await SubjectDetail(Props.subjectUpdateId);
    SubjectForm = Object.assign(SubjectForm, { id, subjectName, enabled, });
});

// 确定
const onSure = async (e) => {
    const res = Props.subjectUpdateId ? await SubjectUpdate(SubjectForm) : await SubjectAdd(SubjectForm);
    if (res.code != '200') return;
    Emits('onUpdateListDtata', false);
    await onCancel();
};
// 取消
const onCancel = () => {
    SubjectForm = Object.assign(SubjectForm, { username: "", password: "", realName: "", email: "", gender: '1', avatar: "", remark: "", phone: "", enabled: '1', roleIds: [], postIds: [], unitId: "" });
    Emits('update:IsVisible', false);
};
</script>
