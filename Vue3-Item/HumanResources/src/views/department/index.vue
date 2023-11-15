<template>
  <div class="container">
    <div class="app-container">
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row type="flex" justify="space-between" align="middle" style="width:100%">
            <el-col>{{ data.name }} </el-col>
            <el-col class="ColEnd">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept @getDepartments='getDepartments' :currentNodeId="currentNodeId" :show-dialog.sync="showDialog" />
  </div>
</template>
<script>

import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'

export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      currentNodeId: null,
      showDialog: false,
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartment()
      this.depts = transListToTreeData(res, 0)
    },
    operateDept(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      }
    }
  }
}
</script>
<style scoped>
.tree-manager {
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
}

.ColEnd {
  text-align: end;
  padding-right: 10px;
}
</style>
