<template>
  <div class="pagination">
    <el-pagination v-model:current-page="CurrentPage" v-model:page-size="CurrentSize"
      layout="total, sizes, prev, pager, next, jumper" :page-sizes="PageSizes" :total="Total"
      @size-change="onSizeChange" @current-change="onCurrentChange" />
  </div>
</template>
<script lang='ts' setup>
import { ref, } from 'vue';

const Props = defineProps({
  CurrentPage: {
    type: Number,
    default: 1
  },
  CurrentSize: {
    type: Number,
    default: 10
  },
  Total: {
    type: Number,
    default: 10
  },
  PageSizes: {
    type: Array,
    default: () => [10, 30, 50, 80]
  },
});
const Emits = defineEmits(['update:onSizeChange', 'update:onCurrentChange']);
const CurrentPage = ref<number>(Props.CurrentPage);
const CurrentSize = ref<number>(Props.CurrentSize);
const onSizeChange = (Size) => {
  CurrentSize.value = Size;
  Emits('update:onSizeChange', Size);
};
const onCurrentChange = (page) => {
  CurrentPage.value = page;
  Emits('update:onCurrentChange', page);
};
</script>

<style scoped lang='scss'>
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
