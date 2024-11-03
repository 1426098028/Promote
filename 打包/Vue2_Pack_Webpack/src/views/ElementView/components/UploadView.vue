<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="文件上传" prop="file">
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :before-upload="beforeUpload"
        :on-change="handleChange"
        :file-list="fileList"
        :on-remove="handleRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">拖拽文件到这里，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传 *.jpg/*.png 格式的文件，且大小不能超过 2MB
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        file: null,
      },
      fileList: [],
      rules: {
        file: [{ required: true, message: "请上传文件", trigger: "change" }],
      },
    };
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        this.$message.error("上传文件只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      if (file.status === "success") {
        this.form.file = file.response; // 假设上传成功后，服务器返回文件路径
      } else if (file.status === "error") {
        this.$message.error(`${file.name} 文件上传失败.`);
      }
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.form.file = null; // 清空文件路径
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 提交表单数据
          console.log("提交:", this.form);
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.upload-demo {
  cursor: pointer;
}
</style>
