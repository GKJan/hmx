<template>
  <div class="login-container">
    <div class="login-form">
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
      <el-button class="login-btn" type="primary" @click="submit">登录</el-button>
      <div class="title title2">
        <img src="../../assets/wx/add.png">
        <span>华蒙星儿童体测证书查询系统</span>
      </div>
      <div class="other">
        <el-button class="cred-btn" type="primary" @click="toApply">证书申请</el-button>
        <el-button class="cred-btn" type="primary" @click="toQuery">证书查询</el-button>
      </div>
    </div>
    <div class="bottom-link">
      <div class="item" @click="toLink1">
        <img src="../../assets/wx/tri.png">
        <span>掌上华蒙星</span>
      </div>
      <div class="item" @click="toLink2">
        <img src="../../assets/wx/tri.png">
        <span>体育学院</span>
      </div>
      <div class="item" @click="toLink3">
        <img src="../../assets/wx/tri.png">
        <span>华蒙星商城</span>
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
      show: false,
      actions: [
        {
          name: '个人证书申请'
        },
        {
          name: '机构证书申请'
        }
      ]
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
      this.show = true
      // this.$router.push('/wx/apply')
    },

    toQuery () {
      this.$router.push('/wx/cred/search')
    },

    onSelect (val) {
      if (val.name === '个人证书申请') {
        this.$router.push('/wx/applyPersonal')
      } else {
        this.$router.push('/wx/apply')
      }
      this.show = false
    },

    toLink1 () {
      window.location.href = 'https://app9VoK1sbY2661.h5.xiaoeknow.com/mp/eyJpZCI6MTIyNDU1M30'
    },

    toLink2 () {
      window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MTU2MjIzOA==&scene=124#wechat_redirect'
    },

    toLink3 () {
      this.$toast('暂未开放')
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
      margin: 40px 0 20px;
    }
    .other {
      padding-bottom: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cred-btn {
        width: 45%;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
  .bottom-link {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-image: url('../../assets/wx/radius.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      display: flex;
      align-items: flex-end;
      img {
        width: 10px;
        height: 12px;
      }
      span {
        font-size: 13px;
        color: #fff;
        margin-left: 5px;
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
