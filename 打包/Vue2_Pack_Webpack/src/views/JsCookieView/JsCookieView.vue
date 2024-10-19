<template>
  <div>JsCookie值:{{ JsCookie }}</div>
</template>

<script>
import CookieJs from "js-cookie";
console.log("jsCookie", CookieJs);

export default {
  name: "jsCookie",
  data() {
    return {
      JsCookie: "YLM",
    };
  },
  beforeCreate() {
    // eslint-disable-next-line no-undef
    CookieJs.set("Vue2", "jsCookie引入CDN测试局部");
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.JsCookie = CookieJs.get("Vue2");
  },
};
</script>
