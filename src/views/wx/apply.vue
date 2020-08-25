<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="证书分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择证书分类">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="icon">
          <img-upload v-model="form.icon" />
        </el-form-item>
        <el-form-item label="生效日期" prop="stTime">
          <el-date-picker
            v-model="form.stTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期" prop="sxTime">
          <el-date-picker
            v-model="form.sxTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择失效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择所属区域">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="onApply" class="login-btn" type="primary">提交申请</el-button>
    </div>
  </div>
</template>

<script>
import ImgUpload from '@/components/upload'

export default {
  components: {
    ImgUpload
  },
  data () {
    return {
      form: {
        type: '机构证书'
      },
      rules: {
        categoryId: [{ required: true, message: '请选择证书分类', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        icon: [{ required: true, message: '请上次照片', trigger: 'blur' }],
        stTime: [{ required: true, message: '请选择证书开始有效期', trigger: 'blur' }],
        sxTime: [{ required: true, message: '请选择证书结束有效期', trigger: 'blur' }],
        areaId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }]
      },
      categoryList: [],
      areaList: []
    }
  },

  created () {
    this.getCategory()
    this.getArea()
  },

  methods: {
    getCategory () {
      this.api.getzsCategoryPage({ size: 20, type: this.form.type }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    getArea () {
      this.api.getRegionList().then(res => {
        if (res.success) {
          this.areaList = res.data
        }
      })
    },

    onApply () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.wxSaveCerd(this.form).then((res) => {
            if (res.success) {
              this.$toast('提交成功，请等待审核通过')
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  // height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  .login-form {
    // margin-top: 30%;
    width: 85%;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    .login-btn {
      width: 95%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
.login-container {
  .el-date-editor {
    width: 200px;
  }
}
</style>
