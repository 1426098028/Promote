<template>
    <div class="adminui-tags">
        <ul ref="tags">
            <li v-for="item in viewTags" :key="item.path" :class="isActive(item) ? 'active' : ''">
                <router-link :to="item.path">
                    <!-- 如果标签不是固定标签，则显示关闭图标 -->
                    <span>{{ item.name }}</span>
                    <el-icon v-if="!item.affix" @click.prevent.stop="closeTag(item)">
                        <el-icon-close />
                    </el-icon>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTagStore } from '@/pinia/useTagStore';
import { ITagRoute } from '@/interface/tag';

const Route = useRoute();
const TagStore = useTagStore();
const { viewTags } = storeToRefs(TagStore);
const isActive = (currentRoutes: ITagRoute) => currentRoutes.path === Route.path;
const closeTag = (currentRoutes: ITagRoute) => {
    const nowTagIndex: number = viewTags.value.findIndex(item => item.path == currentRoutes.path);
    TagStore.removeViewTags(currentRoutes);
    if (!isActive(currentRoutes)) return;
    const LeftView: ITagRoute = viewTags.value[nowTagIndex - 1];
    Route.push(LeftView ? LeftView.path : '/');
};
watch(Route, () => {
    const { name, path, meta: { affix } } = Route;
    const currentTag: ITagRoute = { name, path, affix };
    name && TagStore.pushViewTags(currentTag);
}, { immediate: true });
</script>

<style scoped lang='scss'>
.adminui-tags {
    height: 35px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
}

.adminui-tags ul {
    display: flex;
    overflow: hidden;
}

.adminui-tags li {
    font-size: 12px;
    cursor: pointer;
    display: inline-block;
    float: left;
    height: 34px;
    line-height: 34px;
    position: relative;
    flex-shrink: 0;
}

.adminui-tags li::after {
    content: " ";
    width: 1px;
    height: 100%;
    position: absolute;
    right: 0px;
    background-image: linear-gradient(#fff, #e6e6e6);
}

.adminui-tags li a {
    display: inline-block;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    color: #999;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.adminui-tags li i {
    margin-left: 10px;
    border-radius: 3px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.adminui-tags li i:hover {
    background: rgba(0, 0, 0, .2);
    color: #fff;
}

.adminui-tags li:hover {
    background: #ecf5ff;
}

.adminui-tags li.active {
    background: #409EFF;
}

.adminui-tags li.active a {
    color: #fff;
}
</style>
