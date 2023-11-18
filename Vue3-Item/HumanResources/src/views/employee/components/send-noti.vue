<template>
    <el-dialog :visible="SendShowDialog" title="群发通知" @close="close">
        <div
            style="width: 100%;min-height: 50px;padding: 10px; border-radius: 4px; border: 1px solid #DCDFE6;  margin-bottom: 10px; display: flex;gap: 10px; flex-wrap: wrap;">
            <el-tag :key="item.id" v-for="item in userIds" closable :disable-transitions="false"
                @close="onTagClose(item.id)">
                @{{ item.username }}
            </el-tag>
        </div>
        <el-form ref="FormMessage" label-width="auto" :model="FormMessage" :rules="rules">
            <el-form-item label="消息等级" prop="type">
                <el-select style="width: 100%;" size="mini" placeholder="请选择" v-model="FormMessage.type">
                    <el-option label="通知消息" :value="1" />
                    <el-option label="提示消息" :value="2" />
                    <el-option label="重要消息" :value="3" />
                    <el-option label="紧急消息" :value="4" />
                </el-select>
            </el-form-item>
            <el-form-item label="通知内容" prop="content">
                <el-input size="mini" type="textarea" v-model="FormMessage.content" placeholder="请输入通知内容"></el-input>
            </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="end">
            <el-col :span="12">
                <el-button size="mini" @click="close">取消</el-button>
                <el-button type="primary" size="mini" @click="btnOK">发送通知</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>
<script>
import { setMessageMuch } from '@/api/employee'

export default {
    props: {
        SendShowDialog: {
            type: Boolean,
            default: false
        },
        value: { type: Number, default: null },
        userIds: { type: Array, default: () => [] }
    },
    data() {
        return {
            FormMessage: {
                type: '',
                content: ''
            },
            rules: {
                type: [{ required: true, message: '请选择消息等级', trigger: 'blur' }],
                content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }, { min: 5, max: 100, message: '群发的消息内容，5-100个字符', trigger: 'blur' }],
            }
        }

    },
    methods: {
        btnOK() {

            this.$refs.FormMessage.validate(async (isOk) => {
                if (!isOk) return false
                if (this.userIds.length === 0) return this.$message.success(`请先选择要群发的员工`)
                const data = { ...this.FormMessage, userIds: this.userIds.map(item => item.id) }
                await setMessageMuch(data)
                this.$message.success(`群发消息成功`)
                this.close()
            })
        },
        close() {
            this.$emit('update:SendShowDialog', false)
        },
        onTagClose(id) {
            this.$emit('input', id)
        },
    },
}
</script>
<style></style>
