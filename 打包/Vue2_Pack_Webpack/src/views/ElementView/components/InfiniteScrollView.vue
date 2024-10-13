<template>
  <ul class="infinite-list" v-infinite-scroll="load">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script>
export default {
  name: "InfiniteScrollView",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    load() {
      this.count += 2;
    },
  },
};
</script>
<style scoped>
.infinite-list {
  overflow: auto;
  height: 60vh;
}

.infinite-list-item {
  margin: 10px;
  width: auto;
  padding: 10px;
  background-color: aquamarine;
  list-style: none;
}
</style>
