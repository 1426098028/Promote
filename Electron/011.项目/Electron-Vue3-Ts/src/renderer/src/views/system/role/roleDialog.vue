<template>
    <el-dialog append-to-body :model-value="IsVisible" :title='roleUpdateId ? "修改角色" : "新增角色"'
        :close-on-click-modal='false' @close="onCancel">
        <el-form :model='roleForm'>
            <el-form-item label="角色名称" required>
                <el-input v-model='roleForm.roleName' placeholder='请输入角色名称' />
            </el-form-item>
            <el-form-item label="权限字符" required>
                <el-input v-model='roleForm.rolePerm' placeholder='请输入权限字符' />
            </el-form-item>

            <el-form-item label="状态">
                <el-radio-group v-model='roleForm.enabled'>
                    <el-radio v-for='item in dicts["system_global_status"]' :key='item.id' :value="item.v * 1">
                        {{ item.k }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单权限">
                <div>
                    <!-- default-expand-all -->
                    <el-checkbox label="展开/折叠" v-model='Permission.ExpandAll' @change='onExpandAll' />
                    <!-- SelectAll -->
                    <el-checkbox label="全选/全不选" v-model='Permission.SelectAll' @change='onSelectAll' />
                    <!-- check-strictly -->
                    <el-checkbox label="父子(联动/不联动)" v-model='Permission.CheckStrictly' />
                    <el-tree ref='TreeRef' :data="Permission.treeList" show-checkbox accordion
                        :props="Permission.treeProps" :default-checked-keys='roleForm.permissionIds'
                        :default-expand-all='Permission.ExpandAll' :check-strictly='!Permission.CheckStrictly'
                        highlight-current node-key='id' />
                </div>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model='roleForm.descript' placeholder="请输入备注内容" :maxlength="200"
                    show-word-limit />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-Auths='["system:role:add", "system:role:update"]' type="primary"
                    @click="onSure">确定</el-button>
                <el-button @click="onCancel">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref, getCurrentInstance, watch } from 'vue';
import { roleAdd, roleDetail, roleUpdate } from '@/api/role';
import { useNormalizeMenuList } from '@/hooks/useNormalizeMenuList';


const Props = defineProps({
    IsVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    roleUpdateId: {
        type: String,
        default: ''
    },
});
const Emits = defineEmits(["update:IsVisible", "onUpdateListDtata"]);
let roleForm = reactive({
    roleName: "",//角色名称
    rolePerm: "",//角色权限编码
    enabled: 1,//是否启用（0：禁用；1：启用）
    descript: '',//描述
    permissionIds: []//菜单ID
});
const Permission = reactive({
    treeList: [],
    treeProps: {
        label: 'name'
    },
    ExpandAll: false,
    SelectAll: false,
    CheckStrictly: true,
});
const TreeRef = ref(null);
const { getMenuTree, MenuArr } = useNormalizeMenuList();
console.log(MenuArr);
onBeforeMount(async () => {
    const { proxy } = getCurrentInstance();
    proxy?.getDicts(['system_global_status']);
});
onBeforeMount(async () => {
    //获取权限菜单数据
    getMenuTree();
    Permission.treeList = MenuArr;
});
onBeforeMount(async () => {
    if (!Props.roleUpdateId) return false;
    let { data: { role, permissions } } = await roleDetail(Props.roleUpdateId);
    console.log(role, permissions);
    let { roleName, rolePerm, enabled, descript, id } = role;
    roleForm = Object.assign(roleForm, { roleName, rolePerm, enabled, descript, id, permissionIds: [...permissions] });
    TreeRef.value.setCheckedKeys(permissions);
});

// 展开/折叠
const onExpandAll = (e) => {
    const { store: { nodesMap } } = TreeRef!.value;
    Object.keys(nodesMap).map(key => { nodesMap[key].expanded = e; });
};
// 全选/全不选
const onSelectAll = (e) => {
    const { store: { nodesMap } } = TreeRef!.value;
    TreeRef.value.setCheckedKeys(e ? Object.keys(nodesMap).map(key => key) : []);
};

// 确定
const onSure = async (e) => {
    const res = Props.roleUpdateId ? await roleUpdate({ ...roleForm, permissionIds: TreeRef.value.getCheckedKeys() }) : await roleAdd({ ...roleForm, permissionIds: TreeRef.value.getCheckedKeys() });
    if (res.code != '200') return;
    Emits('onUpdateListDtata', false);
    await onCancel();
};
// 取消
const onCancel = () => {
    roleForm = Object.assign(roleForm, { roleName: "", rolePerm: "", enabled: "1", descript: '', permissionIds: [] });
    Emits('update:IsVisible', false);
};
</script>
