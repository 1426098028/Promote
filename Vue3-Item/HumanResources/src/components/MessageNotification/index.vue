<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未读消息" name="unread" />
        <el-tab-pane label="已读消息" name="read" />


        <div style=" max-height: 50vh;  overflow-x:auto ;">
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时显示
            </el-card>

        </div>
    </el-tabs>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'second'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>