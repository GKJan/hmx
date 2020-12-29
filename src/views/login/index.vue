<template>
  <div class="login-container">
    <div class="wrapper">
      <div class="left">
        <img src="../../assets/wx/logo.png">
        <div class="title">
          <img src="../../assets/wx/add.png">
          <span>华蒙星儿童体质测查系统</span>
        </div>
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
        <div class="title title2">
          <img src="../../assets/wx/add.png">
          <span>华蒙星儿童体测证书查询系统</span>
        </div>
        <div class="other">
          <el-button class="cred-btn" type="primary" @click="toApply">证书申请</el-button>
          <el-button class="cred-btn" type="primary" @click="toSearch">证书查询</el-button>
        </div>
      </div>
      <div class="login-form">
        <img src="../../assets/img/ob.png">
      </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
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
      showPwd: false,
      actions: [
        {
          name: '个人证书申请'
        },
        {
          name: '机构证书申请'
        }
      ],
      show: false
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

    toApply () {
      this.show = true
    },

    onSelect (val) {
      if (val.name === '个人证书申请') {
        this.$router.push('/wx/applyPersonal')
      } else {
        this.$router.push('/wx/apply')
      }
      this.show = false
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
  background-image: url('../../assets/img/bg.png');
  background-size: 110% 160%;
  background-position: 30% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    padding: 30px 50px;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .left {
      width: 300px;
      text-align: center;
      img {
        width: 120px;
        height: 100px;
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px 0;
        img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 14px;
          color: #384148;
        }
      }
      .title2 {
        margin: 20px;
      }
      .login-btn {
        width: 100%;
      }
      .other {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cred-btn {
          width: 45%;
        }
      }
    }
    .login-form {
      margin-left: 100px;
      img {
        width: 140px;
        height: 100px;
      }
    }
  }
}
</style>
<style lang="scss">
.login-container {
  .el-input__inner {
    border-radius: 20px;
  }
  .el-button--primary {
    background-color: #06338E;
    border-color: #06338E;
    border-radius: 20px;
  }
}
</style>