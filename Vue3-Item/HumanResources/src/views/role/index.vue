<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <el-table :data="list">
        <el-table-column prop="name" align="center" label="角色">
          <template v-slot="{ row: { name, isEdit, editRow } }">
            <el-input v-if="isEdit" v-model="editRow.name" size="mini" />
            <span v-else>{{ name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" label="启用">
          <template v-slot="{ row: { state, isEdit, editRow } }">
            <el-switch v-if="isEdit" v-model="editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else> {{ state === 1 ? "已启用" : state === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row: { description, isEdit, editRow } }">
            <el-input v-if="isEdit" v-model="editRow.description" size="mini" type="textarea" :rows="1" />
            <span v-else>{{ description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text" @click="btnPermission(row)">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)" style="margin-right: 16px;">编辑</el-button>
              <el-popconfirm title="确定删除起行数据吗？" @onConfirm="confirmDel(row)">
                <el-button slot="reference" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="padding: 10px;" align="middle" justify="end">
        <el-pagination :current-page="pageParams.page" :page-size="pageParams.pagesize" :total="pageParams.total"
          layout="prev, pager, next" @current-change="changePage">
        </el-pagination>
      </el-row>
    </div>
    <el-dialog :visible.sync="showDialog" title="新增角色">
      <el-form label-width="auto" ref="roleForm" :model='roleForm' :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input size="mini" v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input size="mini" v-model="roleForm.description" type="textarea" :rows="3" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="24" style="text-align: center;">
          <el-button size="mini" type='primary' @click="btnOK">确定</el-button>
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <el-tree ref="permTree" check-strictly node-key="id" :data="permissionData" :props="{ label: 'name' }" show-checkbox
        default-expand-all :default-checked-keys="permIds" />
      <el-row slot="footer" type="flex" justify="end">
        <el-col :span="24">
          <el-button type="primary" size="mini" @click="btnPermissionOK">确定</el-button>
          <el-button size="mini" @click="showPermissionDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole, updateRole, delRole, getRoleDetail, assignPerm } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Role',
  data() {
    return {
      showDialog: false,
      showPermissionDialog: false,
      list: [],
      pageParams: { page: 1, pagesize: 10, total: 0 },
      roleForm: { name: '', description: '', state: 0 },
      rules: { name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }], description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }] },
      permissionData: [],
      permIds: [],
    }
  },
  created() { this.getRoleList() },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows.map(item => ({ ...item, isEdit: false, editRow: { name: item.name, state: item.state, description: item.description } }))
      this.pageParams.total = total
    },
    async changePage(page) {
      this.pageParams.page = page
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async (isOk) => {
        if (!isOk) return false
        await addRole(this.roleForm)
        this.$message.success('新增角色成功')
        this.getRoleList()
        this.btnCancel()
      })
    },

    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async btnPermission({ id }) {
      this.currentRoleId = id
      this.permissionData = transListToTreeData(await getPermissionList(), 0)
      const { permIds } = await getRoleDetail({ id })
      this.permIds = permIds
      this.showPermissionDialog = true
    },
    async btnPermissionOK() {
      await assignPerm({ id: this.currentRoleId, permIds: this.$refs.permTree.getCheckedKeys() })
      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOK(row) {
      const { editRow: { description, name, state }, id } = row
      if (description && name) {
        await updateRole({ description, name, state, id })
        Object.assign(row, { isEdit: false, description, name, state })
        this.$message.success('更新角色成功')
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },
    async confirmDel(row) {
      await delRole({ id: row.id })
      this.$message.success('删除角色成功')
      if (this.list.length === 1) this.pageParams.page--
      this.getRoleList()
    },
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
