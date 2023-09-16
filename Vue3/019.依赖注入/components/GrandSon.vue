<template>
    <h2>注入</h2>
    <div>provide传递过来的数据 {{ color }}</div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
    name: 'ChildName',
    setup(props, ctx) {
        const color = inject('color')
        return {
            color
        }
    },
})
</script>
