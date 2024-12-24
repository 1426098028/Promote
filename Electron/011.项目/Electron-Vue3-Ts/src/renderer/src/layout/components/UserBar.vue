<template>
    <div class="user-bar">
        <!--退出登录-->
        <el-dropdown class="panel-item">
            <div class="user-avatar">
                <el-avatar :size="30" :src="userInfo.avatar" />
                <el-icon>
                    <ArrowDown />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click='outLogin'>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <!--消息-->
        <div class="panel-item">
            <el-icon>
                <ChatDotRound />
            </el-icon>
        </div>

        <!--下载-->
        <div class="panel-item">
            <el-icon>
                <Download />
            </el-icon>
        </div>

        <!--缩小-->
        <div class="panel-item" @click="minWin">
            <el-icon>
                <Minus />
            </el-icon>
        </div>

        <!--放大-->
        <div class="panel-item" @click="maxWin">
            <el-icon>
                <FullScreen />
            </el-icon>
        </div>

        <!--关闭-->
        <div class="panel-item" @click='onClosureApp'>
            <el-icon>
                <Close />
            </el-icon>
        </div>

    </div>
</template>
<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/pinia/useUserStore';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const Router = useRouter();

const outLogin = () => {
    ElMessageBox.confirm(
        '确定退出吗. 继续?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            window.electron.ipcRenderer.invoke('out-login');
            localStorage.setItem("TOKEN", '');
            ElMessage({
                type: 'success',
                message: '退出成功',
            });
            Router.replace({ path: '/login' });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消成功',
            });
        });
};


// 窗口最小化
const minWin = () => {
    window.electron.ipcRenderer.invoke('min-win');
};
// 窗口最大化
const maxWin = () => {
    window.electron.ipcRenderer.invoke('max-win');
};

// 关闭应用
const onClosureApp = () => {
    ElMessageBox.confirm(
        '确定关闭应用吗. 继续?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            window.electron.ipcRenderer.invoke('win-close');
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消成功',
            });
        });
};
</script>
<style scoped lang="scss">
.user-bar {
    display: flex;
    align-items: center;
    height: 100%;

    .panel-item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 100%;
        cursor: pointer;

        .user-avatar {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
