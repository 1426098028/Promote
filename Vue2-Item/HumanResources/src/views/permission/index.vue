<template>
  <div class="container">
    <div class="app-container">
      <div class="Permission-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加权限</el-button>
      </div>
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="code" label="标识" />
        <el-table-column align="center" prop="enVisible" label="启用">
          <template v-slot="{ row: { enVisible } }">
            <span> {{ enVisible == 1 ? "已启用" : enVisible === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type == 1" size="mini" type="text" @click="onAddPermission(row)">添加</el-button>
            <el-button size="mini" type="text" @click="onEditPermission(row)">编辑</el-button>
            <el-button size="mini" type="text" @click='onDel(row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="showDialog" title="新增权限">
      <el-form label-width="auto" ref="PermissionForm" :model='PermissionForm' :rules="rules">
        <el-form-item label="权限名称" prop="name">
          <el-input size="mini" v-model="PermissionForm.name" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input size="mini" v-model="PermissionForm.code" :rows="3" placeholder="请输入权限标识"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input size="mini" v-model="PermissionForm.description" type="textarea" :rows="3"
            placeholder="请输入权限描述"></el-input>
        </el-form-item>
        <el-form-item label="启用" prop="enVisible">
          <el-switch v-model="PermissionForm.enVisible" active-value="1" inactive-value="0" size="mini" />
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
import { getPermissionList, DelPermission, addPermission, EditPermission, DetPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      showDialog: false,
      list: [],
      PermissionForm: {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        pid: 0
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }, {
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            let result = await getPermissionList()
            if (this.PermissionForm.id && this.PermissionForm.type) {
              result = result.filter(item => item.code !== this.PermissionForm.code)
            }
            result.some(item => item.name === value) ? callback(new Error('该权限名称已有')) : callback()
          }
        }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }, {
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            let result = await getPermissionList()
            if (this.PermissionForm.id) {
              result = result.filter(item => item.code !== this.PermissionForm.code)
            }
            result.some(item => item.code === value) ? callback(new Error('该权限标识已有')) : callback()
          }
        }],
        description: [{ required: true, message: '权限描述不能为空', trigger: 'blur' }]
      },
    }
  },
  created() { this.getPermissionList() },
  methods: {
    async getPermissionList() { this.list = transListToTreeData(await getPermissionList(), 0) },
    async onAddPermission({ id, pid }) {
      this.TypeP = 'OneAdd'
      this.PermissionForm = { ...this.PermissionForm, id, pid }
      this.showDialog = true
    },
    async onEditPermission({ id, type }) {
      this.TypeP = type == 1 ? 'OneEdit' : 'TweEdit'
      this.PermissionForm = await DetPermission({ id })
      this.showDialog = true
    },
    btnOK() {
      this.$refs.PermissionForm.validate(async (isOk) => {
        if (!isOk) return false
        switch (this.TypeP) {
          case 'OneAdd':
            await addPermission(this.PermissionForm)
            this.$message.success('二级新增权限成功')
            break;
          case 'OneEdit':
            await EditPermission(this.PermissionForm)
            this.$message.success('一级修改权限成功')
            break;
          case 'TweEdit':
            await EditPermission(this.PermissionForm)
            this.$message.success('二级修改权限成功')
            break;
          default:
            await addPermission(this.PermissionForm)
            this.$message.success('新增权限成功')
            break;
        }
        this.getPermissionList()
        this.btnCancel()
      })
    },
    btnCancel() {
      this.showDialog = false
    },
    onDel({ id }) {
      this.$confirm('您确认要删除该权限吗', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(async () => {
        await DelPermission({ id })
        this.$message({ type: 'success', message: '删除成功!' });
        this.getPermissionList()
      })
    },
  },
  watch: {
    showDialog: {
      handler(newVal) {
        if (newVal) return false
        this.$refs.PermissionForm.resetFields()
        this.PermissionForm = { name: '', code: '', description: '', enVisible: '', pid: 0 }
      },
    }
  }
}
</script>
<style scoped>
.Permission-operate {
  padding: 10px;
}
</style>
