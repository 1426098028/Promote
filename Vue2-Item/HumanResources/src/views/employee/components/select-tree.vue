<template>
    <el-cascader size="mini" :value="value" :options="treeData" :props="props" @change="changeValue"
        placeholder="选择部门"></el-cascader>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
    props: {
        value: { type: Number, default: null }
    },
    data() {
        return {
            treeData: [],
            props: {
                label: 'name', // 要展示的字段
                value: 'id' // 要存储的字段
            }
        };
    },
    created() { this.getDepartment() },
    methods: {
        async getDepartment() { this.treeData = transListToTreeData(await getDepartment(), 0) },
        changeValue(value) {
            console.log(value)
            this.$emit('input', value[value.length - 1])
        },
    }
};
</script>
<style></style>
