<template>
  <div class="Element-Plus">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Infinite Scroll 无限滚动" name="first">
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
          <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="Virtualized Table 虚拟化表格" name="second">
        <div style="height: 400px">
          <el-auto-resizer>
            <template #default="{ height, width }">
              <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
            </template>
          </el-auto-resizer>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Tree V2 虚拟化树形控件" name="third">
        <el-tree-v2 style="max-width: 600px" :data="treedata" :height="208" :props="props" show-checkbox
          :default-checked-keys="defaultCheckedKeys" :default-expanded-keys="defaultExpandedKeys" />

      </el-tab-pane>
      <el-tab-pane label="日期时间选择器" name="fourth">
        <div>
          <el-icon :size="20">
            <Edit />
          </el-icon>
          <el-icon color="#409efc" class="no-inherit">
            <Share />
          </el-icon>
          <el-icon>
            <Delete />
          </el-icon>
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          <el-button type="primary">
            <el-icon style="vertical-align: middle">
              <Search />
            </el-icon>
            <span style="vertical-align: middle"> Search </span>
          </el-button>
          <div style="font-size: 20px">
            <!-- 由于SVG图标默认不携带任何属性 -->
            <!-- 你需要直接提供它们 -->
            <Edit style="width: 1em; height: 1em; margin-right: 8px" />
            <Share style="width: 1em; height: 1em; margin-right: 8px" />
            <Delete style="width: 1em; height: 1em; margin-right: 8px" />
            <Search style="width: 1em; height: 1em; margin-right: 8px" />
          </div>

        </div>
        <el-date-picker v-model="value2" type="datetimerange" start-placeholder="Start date" end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd" time-format="A hh:mm:ss" />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext, Column } from 'element-plus';



const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const count = ref(0);
const load = () => {
  count.value += 2;
};








const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 200);










interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`;
};

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
};

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
};
const treedata = createData(4, 30, 40);
const checkedKeys: string[] = [];
const expanedKeys: string[] = [];
for (const datum of treedata) {
  const children = datum.children;
  if (children) {
    expanedKeys.push(datum.id);
    checkedKeys.push(children[0].id);
    break;
  }
}

const defaultCheckedKeys = ref(checkedKeys);
const defaultExpandedKeys = ref(expanedKeys);





const value2 = ref('')


</script>
<style scoped>
/* @media (min-width: 1024px) {
  .Element-Plus {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}





.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}

.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
}

.line {
  width: 1px;
  background-color: var(--el-border-color);
}
</style>
