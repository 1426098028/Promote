<template>
  <div>
    <img v-for="item in List" :key="item" :src="item" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      List: [],
    };
  },
  mounted() {
    this.GetPicture();
  },
  methods: {
    async GetPicture() {
      const response = await fetch("/Picture.json");
      const { data } = await response.json();
      this.List = data;
    },
  },
};
</script>
