<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" v-model="queryParams.keyword" prefix-icon="el-icon-search"
          @input="changeValue" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree ref="deptTree" node-key="id" highlight-current default-expand-all :data="depts" :props="defaultProps"
          @current-change="changePage"></el-tree>
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column align="center" prop="staffPhoto" label="头像">
            <template v-slot="{ row: { staffPhoto, username } }">
              <el-avatar v-if="staffPhoto" :src="staffPhoto"></el-avatar>
              <span class="username" v-else>{{ username?.charAt(0) }} </span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="username" label="姓名" />
          <el-table-column align="center" prop="mobile" label="手机号" sortable />
          <el-table-column align="center" prop="workNumber" label="工号" sortable />
          <el-table-column align="center" prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row: { formOfEmployment } }">
              <span v-if="formOfEmployment === 1">正式</span>
              <span v-else-if="formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="departmentName" label="部门" />
          <el-table-column align="center" prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column align="center" label="操作">
            <template v-slot="{ row }">
              <el-button size="mini" type="text" @click="$router.push('/employee/detail/' + row.id)">查看</el-button>
              <el-button size="mini" type="text" style="margin-right: 16px;" @click="btnRole(row.id)">角色</el-button>
              <el-popconfirm title="确定删除起行数据吗？" @onConfirm="confirmDel(row)">
                <el-button slot="reference" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-pagination layout="prev, pager, next" :current-page.sync='queryParams.page' :total="total" />
        </el-row>
      </div>
    </div>
    <import-excel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess='getEmployeeList' />
    <el-dialog :visible.sync="showRoleDialog" title="分配角色">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnRoleOK">确定</el-button>
          <el-button size="mini" @click="showRoleDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { getEmployeeList, exportEmployee, delEmployee, getEnableRoleList, getEmployeeDetail, assignRole } from '@/api/employee'
import { transListToTreeData } from '@/utils'
import FileSaver from 'file-saver'
import ImportExcel from './components/import-excel.vue'

export default {
  name: 'Employee',
  components: { 'import-excel': ImportExcel },
  data() {
    return {
      showExcelDialog: false,
      showRoleDialog: false,
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      list: [],
      roleList: [], // 接收角色列表
      roleIds: [],
      queryParams: {
        departmentId: null,
        keyword: '',
        page: 1,
        pagesize: 10,
      },
      total: 0,
      currentUserId: null,
    }
  },
  computed: {
    ChangeQueryParams() {
      const { page, departmentId, keyword } = this.queryParams
      return { page, departmentId, keyword }
    }

  },
  created() { this.getDepartment() },
  methods: {
    async getDepartment() {
      this.depts = transListToTreeData(await getDepartment(), 0)
      this.queryParams.departmentId = this.depts[0].id
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.depts[0].id)
      })
    },
    // 获取员工列表的方法
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    changePage({ id }) {
      this.queryParams.departmentId = id
      this.queryParams.page = 1
    },
    changeValue() { this.queryParams.page = 1 },
    async exportEmployee() {
      const res = await exportEmployee()
      console.log(res)
      FileSaver.saveAs(res, '员工信息表.xlsx')
    },
    async btnRole(id) {
      this.roleList = await getEnableRoleList()
      this.currentUserId = id
      const { roleIds } = await getEmployeeDetail({ id })
      this.roleIds = roleIds
      this.showRoleDialog = true
    },
    async btnRoleOK() {
      await assignRole({ id: this.currentUserId, roleIds: this.roleIds })
      this.$message.success('分配用户角色成功')
      this.showRoleDialog = false
    },
    async confirmDel({ id }) {
      await delEmployee({ id })
      if (this.list.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.$message.success('删除员工成功')
    },
  },
  watch: {
    ChangeQueryParams: {
      handler(newVlu, oldVlu) { this.getEmployeeList() },
      immediate: false,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>