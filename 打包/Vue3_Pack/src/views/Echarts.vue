<template>
  <div style="width: 600px; height: 400px;" ref="echartsEle"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const echartsEle = ref<HTMLDivElement | null>(null); // 确保类型为 HTMLDivElement

onMounted(() => {
  if (echartsEle.value) {
    // 基于准备好的 dom，初始化 echarts 实例
    const myChart = echarts.init(echartsEle.value, null, {
      width: 600,
      height: 400,
    });

    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 示例',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }
});
</script>

<style scoped></style>
