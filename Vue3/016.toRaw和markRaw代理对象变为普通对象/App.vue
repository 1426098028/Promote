<template>
  <div>toRaw和markRaw代理对象变为普通对象</div>
  <div>{{ m1 }}</div>
  <button @click="onUp">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, readonly, shallowReadonly, toRaw, markRaw } from 'vue'

export default defineComponent({
  name: 'AppName',
  setup() {
    interface DataType {
      name: string;
      wife: object;
      likes?: string[]
    }
    /**
     *   toRaw   
     *                  作用: 把代理对象变为普通对象,数据变化,界面不变
     *                  
     */
    /**
     *  markRaw 
     *            理解:  被markRaw标记的对象数据,从此不再成为代理对象
     * 
     */
    const m1 = reactive<DataType>({ name: 'reactive', wife: { name: 'wife' } })


    const onUp = () => {
      // 把代理对象变为普通对象,数据变化,界面不变
      // const user = toRaw(m1)
      // user.name = 'toRaw'
      // console.log('toRaw', m1, user)


      // 被markRaw标记的对象数据,从此不再成为代理对象
      const likes = markRaw(['ssd', 'sds'])
      m1.likes = likes
      setInterval(() => {
        if (m1.likes) {
          m1.likes[0] += '--'
          console.log('markRaw', m1)
        }
      }, 500)
      m1.name += '--'
    }
    return {
      m1, onUp
    }
  },


})
</script>