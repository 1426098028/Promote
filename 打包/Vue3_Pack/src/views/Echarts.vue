<template>
  <div style="width: 600px; height: 400px;" ref="echartsEle"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
// import * as echarts from 'echarts';
const echartsEle = ref<HTMLDivElement | null>(null); // 确保类型为 HTMLDivElement
onMounted(async () => {
  await nextTick();
  if (echartsEle.value) {
    // 基于准备好的 dom，初始化 echarts 实例
    const myChart = echarts.init(echartsEle.value,);

    // 绘制图表
    myChart.setOption({
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }
});
</script>

<style scoped></style>
