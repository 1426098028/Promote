<template>
  <div>AsyncComponent</div>
  <div>{{ data }}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, } from 'vue'
import axios from 'axios'
// 动态组件引入
export default defineComponent({
  name: 'AppName',
  // setup(props, ctx) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({})
  //     }, 1000);
  //   })
  // },
  // setup(props, ctx) {
  //   return axios.get('/data/address.json').then(({ data }) => ({ data }))
  // },
  async setup(props, ctx) {
    const { data } = await axios.get('/data/products.json')
    return {
      data
    }
  },
})
</script>