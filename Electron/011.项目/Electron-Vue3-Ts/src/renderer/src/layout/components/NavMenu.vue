<template>
    <div v-if='!nextMenu || nextMenu.length <= 0'>
        没有子级菜单
    </div>
    <el-menu router :default-active='$route.path' v-else>
        <el-menu-item v-for='item in nextMenu' :key='item.id' :index='item.path'>
            <el-icon>
                <component :is='item.meta?.icon.replace("el-icon-", "") || "user"' />
            </el-icon>
            <template #title>
                <span>{{ item.name }}</span>
            </template>
        </el-menu-item>
    </el-menu>

</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Parent } from '@/interface/user';
defineProps({
    nextMenu: {
        type: Object as PropType<Parent[]>,
        required: true,
        default: () => []
    }
});
</script>
