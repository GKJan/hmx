<template>
  <div class="login-container">
    <div class="left">
      <img src="../../assets/primary/logo.png">
      <span @click="toSearch">证书查询</span>
    </div>
    <div class="login-form">
      <div class="title">华蒙星儿童业务系统</div>
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

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.login(this.form).then((res) => {
            if (res.success) {
              this.$message.success('登录成功')
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              localStorage.setItem('loginTime', Date.now())
              if (res.data.role === 4 || res.data.role === 5) {
                this.$router.push('/cred')
              } else {
                this.$router.push('/report')
              }
            }
          })
        }
      })
    },

    toSearch () {
      this.$router.push({path: '/wx/cred/search', query: {from: 'pc'}})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    position: relative;
    img {
      width: 500px;
      height: 230px;
    }
    span {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #06338E;
      cursor: pointer;
    }
  }
  .login-form {
    width: 350px;
    text-align: center;
    .title {
      margin: 0 0 20px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>