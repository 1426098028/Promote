<template>
  <section class="aminui-wrapper">
    <!--1级菜单-->
    <div class="aminui-side-split">
      <div class="aminui-side-split-top" @mousedown.stop.capture.prevent='onMousedown'
        @mousemove.stop.capture.prevent='onMousemove' @mouseup.stop.capture.prevent='onMouseup'>
        <router-link to="/">
          <img class="logo" src="../assets/images/logo-r.png">
        </router-link>
      </div>
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for='item in ParentMenu' :key='item.id' :class="item.path == CurrentAndNextMenu.path ? 'active' : ''"
              @click='tabMenu(item)'>
              <el-icon>
                <component :is='item.name == "小鹿线" ? "house" : item.meta?.icon.replace("el-icon-", "")'>
                </component>
              </el-icon>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <!--2级菜单-->
    <div :class="menuIsCollapse ? 'aminui-side' : 'aminui-side IsCollapse'">
      <div class="adminui-side-top" @mousedown.stop.capture.prevent='onMousedown'
        @mousemove.stop.capture.prevent='onMousemove' @mouseup.stop.capture.prevent='onMouseup'>
        <h2 :class="menuIsCollapse ? '' : 'IsCollapseTop'">{{ CurrentAndNextMenu.name }}</h2>
      </div>
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <NavMenu :nextMenu="CurrentAndNextMenu.children" :IsCollapse="!menuIsCollapse"></NavMenu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom" @click='toggle_menuIsCollapse'>
        <el-icon>
          <el-icon-expand v-if="menuIsCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <!--右侧组件-->
    <div class="aminui-body">
      <TopBar>
        <UserBar />
      </TopBar>
      <TagBar />
      <el-main class='Main'>
        <router-view></router-view>
      </el-main>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useMenuStore } from '@/pinia/useMenuStore';
import { Parent } from '@/interface/user';
import NavMenu from '@/layout/components/NavMenu.vue';
import TopBar from '@/layout/components/TopBar.vue';
import UserBar from '@/layout/components/UserBar.vue';
import TagBar from '@/layout/components/TagBar.vue';
import useWindowDrag from '@/hooks/useWindowDrag';
import { useRoute, useRouter } from 'vue-router';
const ParentMenu = ref<Parent[]>([]);
const CurrentAndNextMenu = ref<Parent[] | undefined>([]);
const menuIsCollapse = ref<boolean>(true);
const { onMousedown, onMousemove, onMouseup } = useWindowDrag();
const Router = useRouter();
const Route = useRoute();
onBeforeMount(() => {
  window.electron.ipcRenderer.invoke('resize-window');
});
const UpdateRouter = () => {
  const RouterMenu = Router.getRoutes();
  RouterMenu.forEach(items => {
    items.name == 'layout' && (ParentMenu.value = items.children);
    items.path == Router.currentRoute.value.meta.ParentPath && (CurrentAndNextMenu.value = items);
  });
};

const tabMenu = (item) => {
  CurrentAndNextMenu.value = item;
};
const toggle_menuIsCollapse = (): void => {
  menuIsCollapse.value = !menuIsCollapse.value;
};
watch(Route, UpdateRouter, { immediate: true });
</script>
<style scoped lang="scss">
.aminui-wrapper {
  display: flex;
  width: 100vmax;
  height: 100vh;
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
      

      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo {
        height: 30px;
        vertical-align: bottom;
      }
    }




    .adminui-side-split-scroll {
      overflow: auto;
      overflow-x: hidden;
      height: 100%;
      flex: 1;

      .active {
        background: #409EFF;
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

        i {
          font-size: 18px;
        }

        p {
          margin-top: 5px;
          font-size: 12px;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }

  .aminui-side {
    display: flex;
    flex-flow: column;
    width: 210px;
    background: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
    border-right: 1px solid #e6e6e6;
    transition: width 0.3s;

    .adminui-side-top {
      border-bottom: 1px solid #ebeef5;
      height: 49px;
      line-height: 49px;

      h2 {
        padding: 0 20px;
        font-size: 17px;
        color: #3c4a54;
      }

      .IsCollapseTop {
        text-align: center;
        transform: scale(0.8);
        padding: 0;
        margin: 0;
      }
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

      i {
        font-size: 16px;
      }

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .IsCollapse {
    width: 65px;
  }

  .aminui-body {
    display: flex;
    flex-direction: column;
    flex: 1;

    .Main {
      flex: 1;
      overflow: auto;
    }
  }
}

.el-menu {
  border-right: 0px;
}
</style>
