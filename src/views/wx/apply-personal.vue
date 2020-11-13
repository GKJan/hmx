<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="115px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="icon">
          <img-upload v-model="form.icon" :tips="true" />
        </el-form-item>
        <el-form-item label="证书分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择证书分类" @change="handleChange">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号" prop="code">
          <el-input v-model="form.code" disabled placeholder="请输入证书编号"></el-input>
        </el-form-item>
        <el-form-item label="证书名称" prop="zsName">
          <el-input v-model="form.zsName" disabled placeholder="请输入证书名称"></el-input>
        </el-form-item>
        <el-form-item label="所属机构/园所">
          <el-input v-model="form.deptName" placeholder="请输入所属机构/幼儿园"></el-input>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-cascader
            v-model="form.areaCode"
            :options="areaList"
            :props="areaProps"
            clearable
          >
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item> -->
        <el-form-item label="培训名称">
          <el-input v-model="form.pxName" placeholder="请输入培训名称"></el-input>
        </el-form-item>
        <el-form-item label="参训期数">
          <el-input v-model="form.periodical" placeholder="请输入参训期数"></el-input>
        </el-form-item>
        <el-form-item label="授权内容">
          <el-input v-model="form.content" placeholder="请输入授权内容"></el-input>
        </el-form-item>
        <!-- <el-form-item label="证书生效日期" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证书失效日期" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择失效日期">
          </el-date-picker>
        </el-form-item> -->
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
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        icon: [{ required: true, message: '请上次照片', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择证书分类', trigger: 'change' }],
        code: [{ required: true, message: '请输入证书编号', trigger: 'blur' }],
        zsName: [{ required: true, message: '请输入证书名称', trigger: 'blur' }],
        pxName: [{ required: true, message: '请输入培训名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入授权内容', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择生效日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择失效日期', trigger: 'change' }]
      },
      categoryList: [],
      areaList: [],
      areaProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'code',
        label: 'name',
        children: 'childArea',
        emitPath: false
      }
    }
  },

  created () {
    this.getCategory()
    // this.getArea()
    this.getAreaList()
    if (this.$route.query.info) {
      this.$toast('审核暂未通过，可修改后重新提交')
      this.form = JSON.parse(this.$route.query.info)
    }
  },

  methods: {
    getCategory () {
      this.api.getzsCategoryWxPage({ size: 20, type: '个人证书' }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    handleChange (val) {
      this.api.getPersonCredCodeWx({ id: val }).then(res => {
        if (res.success) {
          this.$set(this.form, 'zsName', res.data.name)
          this.$set(this.form, 'code', res.data.code)
        }
      })
    },

    getAreaList () {
      this.api.getArea().then(res => {
        if (res.success) {
          this.areaList = res.data
        }
      })
    },

    getArea () {
      this.api.getWxRegionList().then(res => {
        if (res.success) {
          this.areaList = res.data
        }
      })
    },

    onApply () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$route.query.info) {
            this.api.updatePersonCredWx(this.form).then((res) => {
              if (res.success) {
                this.$toast('提交成功，请等待审核通过')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 500)
              }
            })
          } else {
            this.api.savePersonCredWx(this.form).then((res) => {
              if (res.success) {
                this.$toast('提交成功，请等待审核通过')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 500)
              }
            })
          }
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
    width: 88%;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    .login-btn {
      width: 98%;
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
