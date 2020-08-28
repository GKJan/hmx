<template>
  <div class="login-container">
    <div class="login-form">
      <img src="../../assets/img/logo.png">
      <div class="title">华蒙星儿童体质测查系统</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template slot="prefix"><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :type="pwdType" placeholder="请输入密码">
            <template slot="prefix"><i class="el-icon-key"></i></template>
            <i slot="suffix" :class="pwdIcon" @click="togglePwd"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="other">
        <span></span>
        <span @click="toApply">证书申请</span>
      </div>
      <el-button @click="submit" class="login-btn" type="primary">登录</el-button>
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
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      showPwd: false
    }
  },

  computed: {
    pwdIcon () {
      return this.showPwd ? 'el-icon-unlock' : 'el-icon-lock'
    },
    pwdType () {
      return this.showPwd ? 'text' : 'password'
    }
  },

  methods: {
    togglePwd () {
      this.showPwd = !this.showPwd
    },

    toApply () {
      this.$router.push('/wx/apply')
    },

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.login(this.form).then((res) => {
            if (res.success) {
              this.$toast('登录成功')
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              localStorage.setItem('loginTime', Date.now())
              this.$router.push('/wx/personal')
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
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  .login-form {
    margin-top: 30%;
    width: 80%;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    .title {
      margin: 0 0 15px;
    }
    .other {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: -15px 0 10px;
      span {
        font-size: 14px;
        color: #409EFF;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
