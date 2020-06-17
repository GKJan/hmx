<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场次" prop="sportId">
          <el-select v-model="form.sportId" placeholder="请选择场次">
            <el-option
              v-for="item in sessionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
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
        <el-form-item label="校区" prop="school">
          <el-input v-model="form.school" readonly placeholder="请输入校区"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="学员身高(cm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入学员身高"></el-input>
        </el-form-item>
        <el-form-item label="学员体重(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入学员体重"></el-input>
        </el-form-item>
        <el-form-item label="父亲身高(cm)" prop="FHeight">
          <el-input v-model="form.FHeight" placeholder="请输入父亲身高"></el-input>
        </el-form-item>
        <el-form-item label="母亲身高(cm)" prop="MHeight">
          <el-input v-model="form.MHeight" placeholder="请输入母亲身高"></el-input>
        </el-form-item>
        <el-form-item label="立定跳远(cm)" prop="legs">
          <el-input v-model="form.legs" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="网球掷远(m)" prop="szLimb">
          <el-input v-model="form.szLimb" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="双脚连续跳(秒)" prop="coordinate">
          <el-input v-model="form.coordinate" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="走平衡木(秒)" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="坐位体前屈(cm)" prop="flexibility">
          <el-input v-model="form.flexibility" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="10米折返跑(秒)" prop="sensitives">
          <el-input v-model="form.sensitives" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拍球(个)">
          <el-input v-model="form.racket" placeholder="请输入拍球个数"></el-input>
        </el-form-item>
        <el-form-item label="传球(个)">
          <el-input v-model="form.pass" placeholder="请输入传球个数"></el-input>
        </el-form-item>
        <el-form-item label="投篮(个)">
          <el-input v-model="form.shoot" placeholder="请输入投篮个数"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="record" class="login-btn" type="primary">录入</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
      },
      rules: {
        sportId: [{ required: true, message: '请选择场次', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        school: [{ required: true, message: '请输入校区', trigger: 'blur' }],
        birth: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        parentName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        height: [{ required: true, message: '请输入学员身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入学员体重', trigger: 'blur' }],
        FHeight: [{ required: true, message: '请输入父亲身高', trigger: 'blur' }],
        MHeight: [{ required: true, message: '请输入母亲身高', trigger: 'blur' }],
        legs: [{ required: true, message: '请输入', trigger: 'blur' }],
        szLimb: [{ required: true, message: '请输入', trigger: 'blur' }],
        coordinate: [{ required: true, message: '请输入', trigger: 'blur' }],
        balance: [{ required: true, message: '请输入', trigger: 'blur' }],
        flexibility: [{ required: true, message: '请输入', trigger: 'blur' }],
        sensitives: [{ required: true, message: '请输入', trigger: 'blur' }],
        racket: [{ required: true, message: '请输入拍球个数', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入传球个数', trigger: 'blur' }],
        shoot: [{ required: true, message: '请输入投篮个数', trigger: 'blur' }]
      },
      sessionList: []
    }
  },

  created () {
    this.getSessionList()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.form.school = userInfo.areaName
  },

  methods: {
    getSessionList () {
      this.api.getSessionList().then(res => {
        this.sessionList = res.data
      })
    },

    record () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.addReport(this.form).then((res) => {
            if (res.success) {
              this.$toast('录入成功')
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
