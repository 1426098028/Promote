<template>
    <el-tabs v-model="Active">
        <el-tab-pane label="未读消息" name="unread">
            <el-empty v-if="list.unread?.length == 0" description="暂无相关通知"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="read">
            <el-empty v-if="list.read?.length == 0" description="暂无相关通知"></el-empty>
        </el-tab-pane>

        <div style=" max-height: 51vh;  overflow-x:auto ;font-size: 13px;">
            <el-card shadow="hover" v-for="(item, index) in  list[Active] " :key="index">
                <el-row slot="header" type="flex" justify="space-between">
                    <el-col>
                        <el-tag v-if="item.type === 1" size="mini" type="success">通知</el-tag>
                        <el-tag v-if="item.type === 2" size="mini" type="info">提示</el-tag>
                        <el-tag v-if="item.type === 3" size="mini" type="warning">重要</el-tag>
                        <el-tag v-if="item.type === 4" size="mini" type="danger">紧急</el-tag>
                    </el-col>
                    <el-col class="operate">
                        <div v-if="Active === 'unread'" class="read" @click="onRead(item)">标记为已读</div>
                        <div :class="{ time: Active === 'unread' }">{{ item.create_time }}</div>
                    </el-col>
                </el-row>
                <div style="font-size: 16px;">{{ item.content }}</div>
                <el-row type="flex" justify="space-between" style="padding: 10px 0 10px 0;">
                    <el-col style="text-align: end;">
                        发起人：{{ item.sendUser.username }}
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col>
                        更新时间：{{ item.update_time }}
                    </el-col>
                    <el-col v-if="Active === 'read'" style="text-align: end;">
                        <el-tag class="Delete" size="mini" type="danger" @click="onDelete(item)" effect="dark">删除通知</el-tag>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </el-tabs>
</template>
<script>


import { mapGetters, mapActions } from 'vuex'
import { UpdateMessage, DeleteMessage } from '@/api/employee'
export default {
    data() {
        return {
            Active: 'unread',
        };
    },
    computed: {
        ...mapGetters({ list: 'MessageList' })
    },
    methods: {
        ...mapActions('MessageNotification', ['Message']),
        async onRead({ id }) {
            await UpdateMessage({ id })
            this.Message()
            this.$message.success(`已标记为已读`)
        },
        async onDelete({ id }) {
            await DeleteMessage({ id })
            this.Message()
            this.$message.success(`删除成功`)
        },
    }
};
</script>

<style scoped lang="scss">
.el-card {
    margin: 0 0 18px 0;

}

.Delete:hover {
    cursor: pointer;
    background-color: red;
}


.operate {
    text-align: end;
    cursor: pointer;

    &:hover .read {
        display: block;
    }

    &:hover .time {
        display: none;
    }

    .read {
        color: #409EFF;
        display: none;
    }

    .time {
        display: block;
    }
}


/* 宽度和高度 */
::-webkit-scrollbar {
    width: 1px;
}

/* 轨道的颜色 */
::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

/* 滑块的颜色 */
::-webkit-scrollbar-thumb {
    background-color: #888;
}

/* 滑块悬停时的颜色 */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
</style>
