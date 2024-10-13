<template>
  <div id="ECharts" style="margin: 0; width: 100%; height: 90vh"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: "ECharts",
  data() {
    return {
      activeName: "InfiniteScroll",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.createEcharts();
    });
  },
  methods: {
    createEcharts() {
      let chartDom = document.getElementById("ECharts");

      if (!chartDom) {
        console.error("ECharts DOM element not found.");
        return;
      }
      let myChart = echarts.init(chartDom, "dark");

      let option;

      function createNodes(widthCount, heightCount) {
        let nodes = [];
        for (let i = 0; i < widthCount; i++) {
          for (let j = 0; j < heightCount; j++) {
            nodes.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              value: 1,
            });
          }
        }
        return nodes;
      }
      function createEdges(widthCount, heightCount) {
        let edges = [];
        for (let i = 0; i < widthCount; i++) {
          for (let j = 0; j < heightCount; j++) {
            if (i < widthCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + 1 + j * widthCount,
                value: 1,
              });
            }
            if (j < heightCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + (j + 1) * widthCount,
                value: 1,
              });
            }
          }
        }
        return edges;
      }
      let nodes = createNodes(50, 50);
      let edges = createEdges(50, 50);
      option = {
        series: [
          {
            type: "graphGL",
            nodes: nodes,
            edges: edges,
            itemStyle: {
              color: "rgba(255,255,255,0.8)",
            },
            lineStyle: {
              color: "rgba(255,255,255,0.8)",
              width: 3,
            },
            forceAtlas2: {
              steps: 5,
              jitterTolerence: 10,
              edgeWeightInfluence: 4,
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
