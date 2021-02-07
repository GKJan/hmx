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
        <el-form-item label="校区" prop="school">
          <el-input v-model="form.school" readonly placeholder="请输入校区"></el-input>
        </el-form-item>
        <el-form-item label="学员类型" prop="xyType">
          <el-radio v-model="form.xyType" label="华蒙星学员"></el-radio>
          <el-radio v-model="form.xyType" label="非学员"></el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="type">
          <el-radio v-model="form.type" :label="1">小班</el-radio>
          <el-radio v-model="form.type" :label="2">中班</el-radio>
          <el-radio v-model="form.type" :label="3">大班</el-radio>
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
        <!-- <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月"
            @change="handleChange">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="家长姓名">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="30秒胯下绕滚球" prop="rall">
          <el-input v-model="form.rall" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="30秒原地单手运球" prop="dsDribble">
          <el-input v-model="form.dsDribble" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="8米折返动感1+1拍球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 2" label="10米行进间直线运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 3" label="10米行进间绕障碍运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="传/抛球进圈" prop="pass">
          <el-input v-model="form.pass" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="原地投篮" prop="shoot">
          <el-input v-model="form.shoot" placeholder="请输入"></el-input>
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
      childAge: 0,
      form: {
      },
      rules: {
        sportId: [{ required: true, message: '请选择场次', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        school: [{ required: true, message: '请输入校区', trigger: 'blur' }],
        xyType: [{ required: true, message: '请选择学员类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择班级', trigger: 'change' }],
        parentName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入家长手机号', trigger: 'blur' }],
        rall: [{ required: true, message: '请输入', trigger: 'blur' }],
        dsDribble: [{ required: true, message: '请输入', trigger: 'blur' }],
        bat: [{ required: true, message: '请输入', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入', trigger: 'blur' }],
        shoot: [{ required: true, message: '请输入', trigger: 'blur' }]
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

    handleChange (val) {
      this.childAge = this.jsGetAge(val)
    },
    
    jsGetAge (strBirthday) {       
      let returnAge
      let strBirthdayArr=strBirthday.split("-")
      let birthYear = strBirthdayArr[0]
      let birthMonth = strBirthdayArr[1]
      let birthDay = strBirthdayArr[2]
      let d = new Date()
      let nowYear = d.getFullYear()
      let nowMonth = d.getMonth() + 1
      let nowDay = d.getDate()
      if (nowYear === birthYear) {
        returnAge = 0 // 同年 则为0岁
      } else {
        let ageDiff = nowYear - birthYear // 年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            let dayDiff = nowDay - birthDay // 日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff 
            }
          } else {
            let monthDiff = nowMonth - birthMonth // 月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff
            }
          }
        } else {
          returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge // 返回周岁年龄
    },

    record () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.addBasketReport(this.form).then((res) => {
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
