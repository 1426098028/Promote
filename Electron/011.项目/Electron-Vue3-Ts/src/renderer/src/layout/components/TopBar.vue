<template>
    <div class="topbar">
        <div class="left-panel">
            <el-breadcrumb separator-icon="ArrowRight">
                <transition-group name="breadcrumb">
                    <template v-for="item in $route.matched" :key="item.path">
                        <el-breadcrumb-item v-if="item.path != '/'" :key="item.path">
                            <el-icon>
                                <component :is="item.meta?.icon.replace('el-icon-', '')" />
                            </el-icon>
                            {{ item.meta?.title }}
                        </el-breadcrumb-item>
                    </template>
                </transition-group>
            </el-breadcrumb>
        </div>
        <div class="center-panel"></div>
        <div class="right-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.topbar {
    display: flex;
    justify-content: space-between;
    height: 49px;
    border-bottom: 1px solid #ebeef5;
    background: #fff;

    .left-panel {
        display: flex;
        align-items: center;
    }

    .center-panel {
        flex: 1;
        -webkit-app-region: drag;
    }

    .right-panel {
        display: flex;
        align-items: center;
    }
}

.el-breadcrumb {
    margin-left: 15px;

    .el-breadcrumb__inner .el-icon {
        font-size: 14px;
        margin-right: 5px;
        float: left;
    }
}
</style>
