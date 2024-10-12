<template>
  <div>
    <img v-for='(item) in List' :key='item' :src='item' />
  </div>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue';
const List = ref([]);
const GetPicture = async () => {
  const response = await fetch('/Picture.json');
  const { data } = await response.json();
  List.value = data;
};
onMounted(() => {
  GetPicture();
});
</script>
