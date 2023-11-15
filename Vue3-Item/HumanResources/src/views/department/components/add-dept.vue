<template>
    <el-dialog :visible="showDialog" @close="close">
        <el-form ref="addDept" label-width="auto" :model="formData" :rules="rules">
            <el-form-item :label="showTitle" prop="name">
                <el-input v-model="formData.name" placeholder="2-10个字符" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="部门编码" prop="code">
                <el-input v-model="formData.code" placeholder="2-10个字符" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人" prop="managerId">
                <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 100%;" size="mini">
                    <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" :rows="4" size="mini" />
            </el-form-item>
            <el-form-item>
                <!-- 按钮 -->
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
                        <el-button size="mini" @click="close">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>


    </el-dialog>
</template>
<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'


export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false,
            required: true
        },
        currentNodeId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            managerList: [], // 存储负责人列表

            formData: {
                pid: '', // 父级部门的id
                name: '', // 部门名称
                code: '', // 部门编码
                managerId: '', // 部门负责人id
                introduce: '', // 部门介绍
            },
            rules: {
                name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' }, {
                    trigger: 'blur', validator: async (rule, value, callback) => {
                        let res = await getDepartment()
                        if (this.formData.id) {
                            res = res.filter((item) => item.id !== this.formData.id)
                        }
                        res.some((item) => item.name === value) ? callback(new Error('部门名称已存在')) : callback()
                    }
                }], // 部门名称
                code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' }, {
                    trigger: 'blur', validator: async (rule, value, callback) => {
                        let res = await getDepartment()
                        if (this.formData.id) {
                            res = res.filter((item) => item.id !== this.formData.id)
                        }
                        res.some((item) => item.code === value) ? callback(new Error('部门编码已存在')) : callback()
                    }
                }], // 部门编码
                managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }], // 部门负责人id
                introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' },], // 部门介绍
            },
        }
    },
    computed: {
        showTitle() {
            return this.formData.id ? '编辑部门' : '新增部门'
        }
    },
    created() {
        this.getManagerList()
    },
    methods: {


        async getManagerList() {
            this.managerList = await getManagerList()
        },


        close() {
            this.formData = { code: '', introduce: '', managerId: '', name: '', pid: '' }
            this.$refs.addDept.resetFields()
            this.$emit('update:showDialog', false)
        },
        btnOK() {
            this.$refs.addDept.validate(async (isOk) => {
                if (!isOk) return false
                let msg = '新增'
                // 通过formData中id
                if (this.formData.id) {
                    // 编辑场景
                    msg = '更新'
                    await updateDepartment(this.formData)
                } else {
                    // 新增场景
                    await addDepartment({ ...this.formData, pid: this.currentNodeId })
                }
                // 通知父组件更新
                this.$emit('getDepartments')
                // 提示消息
                this.$message.success(`${msg}部门成功`)
                this.close()
            })
        },

        async getDepartmentDetail() {
            this.formData = await getDepartmentDetail({ id: this.currentNodeId })
        }
    }
}
</script>
<style></style>