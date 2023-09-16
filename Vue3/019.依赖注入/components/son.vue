<template>
    <div>子组件</div>
    <hr>
    <GrandSon />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import GrandSon from './GrandSon.vue'
export default defineComponent({
    name: 'ChildName',
    components: {
        GrandSon
    },
})
</script>
