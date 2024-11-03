<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="统计数值" name="StatisticView">
      <StatisticView />
    </el-tab-pane>
    <el-tab-pane label="InfiniteScroll 无限滚动" name="InfiniteScroll">
      <InfiniteScrollView PropsScroll="测试">
        <div>默认插槽</div>
        <template v-slot:slotText>
          <div>具名插槽</div>
        </template>
      </InfiniteScrollView>
    </el-tab-pane>
    <el-tab-pane label="日历" name="CalendarView">
      <CalendarView />
    </el-tab-pane>
    <el-tab-pane label="树形控件" name="TreeView">
      <TreeView />
    </el-tab-pane>
    <el-tab-pane label="上传表单验证" name="UploadView">
      <UploadView ref="UploadViewRef" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import InfiniteScrollView from "./components/InfiniteScrollView.vue";
import CalendarView from "./components/CalendarView.vue";
import TreeView from "./components/TreeView.vue";
import UploadView from "./components/UploadView.vue";
import StatisticView from "./components/StatisticView.vue";
export default {
  name: "ElementView",
  data() {
    return {
      activeName: "InfiniteScroll",
    };
  },
  created() {
    console.log(this.activeName);
    console.log(this.$data.activeName);
  },
  mounted() {
    console.log(this.$options);
    console.log("refsUploadViewRef", this.$refs.UploadViewRef);

    this.$watch("activeName", (newValue, oldValue) => {
      console.log(`从 ${oldValue} 变为 ${newValue}`);
    });
  },
  components: {
    InfiniteScrollView,
    CalendarView,
    TreeView,
    UploadView,
    StatisticView,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
