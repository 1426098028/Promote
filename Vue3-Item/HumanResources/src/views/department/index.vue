<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row type="flex" justify="space-between" align="middle" style="width:100%">
            <el-col>{{ data.name }} </el-col>
            <el-col class="ColEnd">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
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
  </div>
</template>
<script>

import { getDepartment } from '@/api/department'

export default {
  name: 'Department',
  data() {
    return {
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment()
      console.log(res)
      this.depts = res
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
