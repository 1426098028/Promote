<template>
  <div :bind="$attrs">
    <slot></slot>
    <slot name="slotText"></slot>
    <ul class="infinite-list" v-infinite-scroll="load">
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "InfiniteScrollView",

  props: {
    PropsScroll: {
      type: String,
      default: "234",
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  created() {
    console.log(this.PropsScroll);
    console.log(this.$props);
    console.log(this.$props.PropsScroll);
  },
  mounted() {
    this.$nextTick(() => {
      console.log("$el", this.$el);
      console.log("$parent", this.$parent);
      console.log("root", this.$root);
      console.log("slots", this.$slots);
      console.log("attrs", this.$attrs);
    });
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
