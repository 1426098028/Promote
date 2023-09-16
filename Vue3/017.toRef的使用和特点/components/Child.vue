<template>
    <div>Child组件 {{ age }}</div>
    <div>{{ length }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue'
function useGetAgeLength(age: Ref) {
    return computed(() => {
        return age.value.toString().length
    })
}
export default defineComponent({
    name: 'ChildName',
    props: ['age'],
    setup(props, ctx) {
        console.log(props)
        const length = useGetAgeLength(toRef(props, 'age'))
        return {
            length
        }
    },
})
</script>
