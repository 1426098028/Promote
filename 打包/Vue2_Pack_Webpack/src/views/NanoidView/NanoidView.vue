<template>
  <div>局部 CDN 配置 Nanoid : {{ jSNanoid }}</div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "NanoidView",
  data() {
    return {
      jSNanoid: nanoid(),
    };
  },
  beforeCreate() {
    console.log("Nanoid值", nanoid());
  },
};
</script>
