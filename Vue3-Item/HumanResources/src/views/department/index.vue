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
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        {
          "id": 1,
          "pid": 0,
          "name": "传智教育",
          "code": "CZJY",
          "managerId": 1,
          "managerName": "管理员",
          "introduce": "总部",
          "createTime": "2022-10-26 09:13:37"
        },
        {
          "id": 2,
          "pid": 1,
          "name": "总裁办",
          "code": "ZCB",
          "managerId": 1,
          "managerName": "管理员",
          "introduce": "公司战略部",
          "createTime": "2022-10-26 09:13:37"
        },
        {
          "id": 3,
          "pid": 1,
          "name": "行政部",
          "code": "XZB",
          "managerId": 4,
          "managerName": "黑马文吉星",
          "introduce": "行政部",
          "createTime": "2022-10-26 09:13:39"
        },
        {
          "id": 4,
          "pid": 1,
          "name": "人事部",
          "code": "RSB",
          "managerId": 8,
          "managerName": "黑马周乐天",
          "introduce": "人事部",
          "createTime": "2022-10-26 09:13:42"
        },
        {
          "id": 5,
          "pid": 1,
          "name": "财务部",
          "code": "CWB",
          "managerId": 5,
          "managerName": "黑马巴思慧",
          "introduce": "财务部",
          "createTime": "2022-10-26 09:13:40"
        },
        {
          "id": 6,
          "pid": 1,
          "name": "技术部",
          "code": "JSB",
          "managerId": 11,
          "managerName": "黑马罗英卓",
          "introduce": "技术部",
          "createTime": "2022-10-26 09:13:44"
        },
        {
          "id": 7,
          "pid": 1,
          "name": "运营部",
          "code": "YYB",
          "managerId": 2,
          "managerName": "黑马孙财",
          "introduce": "运营部",
          "createTime": "2022-10-26 09:13:38"
        },
        {
          "id": 8,
          "pid": 1,
          "name": "市场部",
          "code": "SCB",
          "managerId": 7,
          "managerName": "黑马董昊空",
          "introduce": "市场部",
          "createTime": "2022-10-26 09:13:42"
        },
        {
          "id": 9,
          "pid": 4,
          "name": "财务核算部",
          "code": "CWHSB",
          "managerId": 9,
          "managerName": "黑马吕勇锐",
          "introduce": "财务核算部",
          "createTime": "2022-10-26 09:13:43"
        },
        {
          "id": 10,
          "pid": 4,
          "name": "税务管理部",
          "code": "SWGLB",
          "managerId": 5,
          "managerName": "黑马巴思慧",
          "introduce": "税务管理部",
          "createTime": "2022-10-26 09:13:40"
        },
        {
          "id": 11,
          "pid": 4,
          "name": "薪资管理部",
          "code": "XZGLB",
          "managerId": 3,
          "managerName": "黑马罗晓晓",
          "introduce": "薪资管理部",
          "createTime": "2022-10-26 09:13:39"
        },
        {
          "id": 14,
          "pid": 5,
          "name": "PHP研发部",
          "code": "PHYSB",
          "managerId": 10,
          "managerName": "黑马袁永安",
          "introduce": "PHP研发部",
          "createTime": "2022-10-26 09:13:44"
        },
        {
          "id": 15,
          "pid": 7,
          "name": "上海事业部",
          "code": "SHSYB",
          "managerId": 6,
          "managerName": "黑马乔海",
          "introduce": "上海事业部",
          "createTime": "2022-10-26 09:13:41"
        },
        {
          "id": 16,
          "pid": 7,
          "name": "北京事业部",
          "code": "BJSYB",
          "managerId": 16,
          "managerName": "黑马瞿光明",
          "introduce": "北京事业部",
          "createTime": "2022-10-26 09:13:48"
        },
        {
          "id": 24,
          "pid": 23,
          "name": "行政部子部门",
          "code": "XZBZBM",
          "managerId": 6,
          "managerName": "黑马乔海",
          "introduce": "行政部子部门",
          "createTime": "2022-10-26 09:13:41"
        },
        {
          "id": 35,
          "pid": 33,
          "name": "1234",
          "code": "1234",
          "managerId": 6,
          "managerName": "黑马乔海",
          "introduce": "123",
          "createTime": "2022-10-26 09:13:41"
        },
        {
          "id": 60,
          "pid": 1,
          "name": "测试部门",
          "code": "CSBM",
          "managerId": 3,
          "managerName": "黑马罗晓晓",
          "introduce": "测试部门测试部门",
          "createTime": "2022-10-26 09:13:39"
        },
        {
          "id": 61,
          "pid": 3,
          "name": "ASD",
          "code": "ASDF",
          "managerId": 2,
          "managerName": "黑马孙财",
          "introduce": "ASDF",
          "createTime": "2022-10-26 09:13:38"
        },
        {
          "id": 64,
          "pid": 3,
          "name": "行政部子部门1",
          "code": "XZBZBML",
          "managerId": 6,
          "managerName": "黑马乔海",
          "introduce": "行政部子部门1",
          "createTime": "2022-10-26 09:13:41"
        },
        {
          "id": 65,
          "pid": 61,
          "name": "qqqq",
          "code": "21222",
          "managerId": 76,
          "managerName": "旺旺",
          "introduce": "企鹅全额请问多无大所多所",
          "createTime": "2023-11-14 11:55:03"
        },
        {
          "id": 66,
          "pid": 3,
          "name": "帅彭",
          "code": "撒大声地",
          "managerId": 28,
          "managerName": "耀扬",
          "introduce": "行政村是的撒啊实打实发发疯万",
          "createTime": "2023-11-14 06:43:39"
        },
        {
          "id": 67,
          "pid": 65,
          "name": "12321",
          "code": "123123",
          "managerId": 6,
          "managerName": "黑马乔海",
          "introduce": "123",
          "createTime": "2022-10-26 09:13:41"
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>
<style scoped>
.tree-manager {
  /* width: 50px; */
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
}

.ColEnd {
  text-align: end
}
</style>
