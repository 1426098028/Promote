<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }">
    <label>
      <input type="checkbox" />
      <span>xxxxx</span>
    </label>
    <button class="btn btn-danger" v-show="isShow">
      删除
    </button>
  </li>
</template>
<script lang="ts">
import { defineComponent, ref, } from 'vue'
// 引入接口
export default defineComponent({
  name: 'ItemName',
  setup() {
    // 背景色
    const bgColor = ref('white')
    // 前景色
    const myColor = ref('black')
    // 设置按钮默认不显示
    const isShow = ref(false)
    // 鼠标进入和离开事件的回调函数
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        // 鼠标进入
        bgColor.value = 'pink'
        myColor.value = 'green'
        isShow.value = true
      } else {
        // 鼠标离开
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }


    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
    }
  },
})
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 7px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>