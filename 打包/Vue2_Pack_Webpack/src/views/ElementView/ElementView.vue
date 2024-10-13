<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="统计数值" name="StatisticView">
      <StatisticView />
    </el-tab-pane>
    <el-tab-pane label="InfiniteScroll 无限滚动" name="InfiniteScroll">
      <InfiniteScrollView />
    </el-tab-pane>
    <el-tab-pane label="日历" name="CalendarView">
      <CalendarView />
    </el-tab-pane>
    <el-tab-pane label="树形控件" name="TreeView">
      <TreeView />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import InfiniteScrollView from "./components/InfiniteScrollView.vue";
import CalendarView from "./components/CalendarView.vue";
import TreeView from "./components/TreeView.vue";
import StatisticView from "./components/StatisticView.vue";
export default {
  name: "ElementView",
  data() {
    return {
      activeName: "InfiniteScroll",
    };
  },
  components: {
    InfiniteScrollView,
    CalendarView,
    TreeView,
    StatisticView,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
