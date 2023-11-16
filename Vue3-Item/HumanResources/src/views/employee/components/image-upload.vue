<template>
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload"
        :http-request="uploadImage">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
import COS from 'cos-js-sdk-v5';
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imageUrl: ''
        };
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].includes(file.type)
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG PNG GIF BMP 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        },
        uploadImage(params) {
            let cos = new COS({
                SecretId: `AKID3zlNuHSSBrTvEMI2e9d7OeqHdjdOuGao`,
                SecretKey: `64xhN2gIqEPQfk8Uow57vU2azMVYYWLE`
            });
            cos.putObject({
                Bucket: 'ylm-1256189464', // 存储桶名称
                Region: 'ap-guangzhou', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
            }, (err, data) => {
                console.log(data)

                //                 {
                //     "statusCode": 200,
                //     "headers": {
                //         "content-length": "0",
                //         "etag": "\"4dd70dfe9fdf17b01f10564911576cdc\"",
                //         "x-cos-request-id": "NjU1NWJlN2FfYjQyZjJjMGJfMjM1MTVfZDk5MTYxOA=="
                //     },
                //     "Location": "ylm-1256189464.cos.ap-guangzhou.myqcloud.com/89c95eb0f5d338df9703b4dfd83630cf.jpg",
                //     "ETag": "\"4dd70dfe9fdf17b01f10564911576cdc\"",
                //     "RequestId": "NjU1NWJlN2FfYjQyZjJjMGJfMjM1MTVfZDk5MTYxOA=="
                // }

                if (data.statusCode === 200 && data.Location) {
                    this.$emit('input', `http://${data.Location}`)
                } else {
                    this.$message.error(err)
                }
            })
        }
    }
}
</script>
<style >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

