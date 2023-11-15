<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>

      </div>
      <el-table :data="list">
        <el-table-column prop="name" align="center" label="角色" />
        <el-table-column prop="state" align="center" label="启用">
          <template v-slot="{ row: { state } }">
            <span> {{ state === 1 ? "已启用" : state === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
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
  </div>
</template>
<script>
import { getRoleList, addRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      showDialog: false,
      list: [],
      pageParams: { page: 1, pagesize: 2, total: 0 },
      roleForm: { name: '', description: '', state: 0 },
      rules: { name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }], description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }] },
    }
  },
  created() { this.getRoleList() },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    async changePage(page) {
      this.pageParams.page = page
      console.log(page)
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
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
