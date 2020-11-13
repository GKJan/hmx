<template>
  <div class="img-upload-component">
    <el-upload
      name="multipartFile"
      accept="image/png, image/jpg, image/jpeg"
      :action="uploadApi"
      list-type="picture-card"
      :file-list="fileList"
      :limit="limit"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
    </el-upload>
    <span v-if="tips"><i style="color:#F56C6C;font-style:normal;margin-left:-20px;">*</i>请上传160*210尺寸、小于1M的照片</span>
    <el-dialog :visible.sync="dialogVisible" width="500px" :append-to-body="true">
      <img width="100%" :src="viewImg">
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 2
    },
    tips: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploadApi: process.env.VUE_APP_baseApi + 'upload/uploadFile',
      viewImg: '',
      dialogVisible: false
    }
  },

  computed: {
    fileList () {
      if (!this.value) return
      const arr = this.value.split(',')
      const fileList = []
      for (let item of arr) {
        fileList.push({
          name: item,
          response: {
            data: [{
              fileName: item
            }]
          },
          url: process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + item
        })
      }
      return fileList
    }
  },

  methods: {
    beforeAvatarUpload (file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isImg) {
        this.$message.error('上传图片只能是JPG或PNG格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过3MB!')
      }
      return isImg && isLt3M
    },

    handlePreview (file) {
      this.viewImg = file.url
      this.dialogVisible = true
    },

    handleRemove (file, fileList) {
      const files = []
      for (let item of fileList) {
        files.push(item.response.data[0].fileName)
      }
      this.$emit('input', files.join(','))
    },

    handleExceed () {
      this.$message.error(`最多上传${this.limit}张图片`)
    },

    handleSuccess (res, file, fileList) {
      const files = []
      console.log(fileList)
      for (let item of fileList) {
        files.push(item.response.data[0].fileName)
      }
      this.$emit('input', files.join(','))
    }
  }
}
</script>

<style lang="scss">
.img-upload-component {
  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 105px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
}
</style>
