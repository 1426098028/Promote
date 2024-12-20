<template>
  <section class="aminui-wrapper">
    <!--1级菜单-->
    <div class="aminui-side-split">
      <div class="aminui-side-split-top">
        <router-link to="/">
          <img class="logo" src="../assets/images/logo-r.png">
        </router-link>
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li class="active">
              <el-icon>
                <ChatRound />
              </el-icon>
              <p>首页</p>
            </li>
            <li>
              <el-icon>
                <ChatRound />
              </el-icon>
              <p>新媒体</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <!--2级菜单-->
    <div class="aminui-side">
      <div class="adminui-side-top">
        <h2>首页</h2>
      </div>
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu>
            <el-menu-item index="1">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon>
                <ChatRound />
              </el-icon>
              <span>仪表盘</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom">
        <el-icon><el-icon-expand /></el-icon>
      </div>
    </div>
    <!--右侧组件-->
    <div class="aminui-body">
      右侧内容
    </div>
  </section>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
onBeforeMount(() => {
  window.electron.ipcRenderer.invoke('resize-window');
});
</script>
<style scoped lang="scss">
.aminui-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .aminui-side-split {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 100vh;
    overflow: hidden;
    background: #222b45;

    .aminui-side-split-top {
      height: 49px;
      -webkit-app-region: drag;
    }

    .aminui-side-split-top a {
      display: inline-block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aminui-side-split-top .logo {
      height: 30px;
      vertical-align: bottom;
    }

    .adminui-side-split-scroll {
      overflow: auto;
      overflow-x: hidden;
      height: 100%;
      flex: 1;
    }

    li {
      cursor: pointer;
      width: 65px;
      height: 65px;
      color: #fff;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    li i {
      font-size: 18px;
    }

    li p {
      margin-top: 5px;
      font-size: 12px;
    }

    li:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    li.active {
      background: #409EFF;
    }
  }

  .aminui-side {
    display: flex;
    flex-flow: column;
    width: 210px;
    background: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
    border-right: 1px solid #e6e6e6;

    .adminui-side-top {
      -webkit-app-region: drag;
      border-bottom: 1px solid #ebeef5;
      height: 49px;
      line-height: 50px;
    }

    .adminui-side-top h2 {
      padding: 0 20px;
      font-size: 17px;
      color: #3c4a54;
    }

    .adminui-side-scroll {
      overflow: auto;
      overflow-x: hidden;
      flex: 1;
    }

    .adminui-side-bottom {
      border-top: 1px solid #ebeef5;
      height: 51px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .adminui-side-bottom i {
      font-size: 16px;
    }

    .adminui-side-bottom:hover {
      color: var(--el-color-primary);
    }
  }

  .aminui-body {
    flex: 1;
  }
}

.el-menu {
  border-right: 0px;
}
</style>

