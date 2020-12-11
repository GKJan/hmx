<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="加盟类型" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择加盟类型">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入加盟商名称"></el-input>
        </el-form-item>
        <el-form-item label="加盟商地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入加盟商地址"></el-input>
        </el-form-item>
        <el-form-item label="对接销售" prop="djxs">
          <el-input v-model="form.djxs" placeholder="请输入对接销售"></el-input>
        </el-form-item>
        <el-form-item label="加盟金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入加盟金额"></el-input>
        </el-form-item>
        <el-form-item label="所属子公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入所属子公司"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" prop="frName">
          <el-input v-model="form.frName" placeholder="请输入法人姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入法人身份证号"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="lxrName">
          <el-input v-model="form.lxrName" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="lxrMobile">
          <el-input v-model="form.lxrMobile" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="lxrPost">
          <el-input v-model="form.lxrPost" placeholder="请输入联系人职务"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="htNumber">
          <el-input v-model="form.htNumber" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="合同归档" prop="htgd">
          <el-radio v-model="form.htgd" label="已归档"></el-radio>
          <el-radio v-model="form.htgd" label="未归档"></el-radio>
        </el-form-item>
        <el-form-item label="合同开始日期" prop="htStartTime">
          <el-date-picker
            v-model="form.htStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束日期" prop="htEndTime">
          <el-date-picker
            v-model="form.htEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaCode">
          <el-cascader
            v-model="form.areaCode"
            :options="areaList"
            :props="areaProps"
          >
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="合作商/幼儿园名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入合作商/直联幼儿园名称"></el-input>
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
        <el-form-item label="法人姓名" prop="frName">
          <el-input v-model="form.frName" placeholder="请输入法人姓名"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入法人身份证号"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="htNumber">
          <el-input v-model="form.htNumber" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="合作开始日期" prop="htStartTime">
          <el-date-picker
            v-model="form.htStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合作结束日期" prop="htEndTime">
          <el-date-picker
            v-model="form.htEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择结束日期">
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
        categoryId: [{ required: true, message: '请选择加盟类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入加盟商名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入加盟商地址', trigger: 'blur' }],
        djxs: [{ required: true, message: '请输入对接销售', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入加盟金额', trigger: 'blur' }],
        company: [{ required: true, message: '请输入所属子公司', trigger: 'blur' }],
        frName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' }],
        lxrName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        lxrMobile: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        lxrPost: [{ required: true, message: '请输入联系人职务', trigger: 'blur' }],
        htNumber: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
        htgd: [{ required: true, message: '合同是否归档', trigger: 'blur' }],
        htStartTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        htEndTime: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        areaCode: [{ required: true, message: '请选择区域', trigger: 'change' }]
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
    this.getArea()
    if (this.$route.query.info) {
      this.$toast('审核暂未通过，可修改后重新提交')
      this.form = JSON.parse(this.$route.query.info)
    }
  },

  methods: {
    getCategory () {
      this.api.getzsCategoryWxPage({ size: 20, type: '机构证书' }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    getArea () {
      this.api.getArea().then(res => {
        if (res.success) {
          this.areaList = res.data
        }
      })
    },

    onApply () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$route.query.info) {
            this.api.updateOrganCredWx(this.form).then((res) => {
              if (res.success) {
                this.$toast('提交成功，请等待审核通过')
                setTimeout(() => {
                  this.$router.go(-1)
                }, 500)
              }
            })
          } else {
            this.api.saveOrganCredWx(this.form).then((res) => {
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
    width: 95%;
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
