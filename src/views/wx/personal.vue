<template>
  <div class="personal-container">
    <div class="header">
      <img v-if="userInfo.sex === 1" src="../../assets/wx/小鹅通评估报告-34.jpg">
      <img v-else src="../../assets/wx/小鹅通评估报告-34.jpg">
      <span>{{ userInfo.username }}</span>
    </div>
    <div class="menu" @click="toSearch">
      <span>报告查询</span>
      <span class="arrow">></span>
    </div>
    <div class="menu" @click="toRecord">
      <span>数据录入</span>
      <span class="arrow">></span>
    </div>
    <!-- <div class="menu" @click="$router.push('/wx/apply')">
      <span>证书申请</span>
      <span class="arrow">></span>
    </div> -->
    <div class="menu" @click="toSearchCred">
      <span>证书相关</span>
      <span class="arrow">></span>
    </div>
    <div class="menu" @click="show = true">
      <span>修改密码</span>
      <span class="arrow">></span>
    </div>
    <div class="logout" @click="logout">
      <span>退出登录</span>
    </div>
    <van-popup v-model="show" class="wrapper">
      <div class="form">
        <el-form ref="form" :model="form" :rules="rules" label-width="65px">
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submit">确认修改</el-button>
      </div>
    </van-popup>
    <van-action-sheet v-model="showS" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="showC" :actions="actionsC" @select="onSelectC" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      showS: false,
      showC: false,
      actions: [
        {
          name: '幼儿园'
        },
        {
          name: '小学'
        },
        {
          name: '篮球'
        }
      ],
      actionsC: [
        {
          name: '证书申请'
        },
        {
          name: '证书查询'
        }
      ],
      userInfo: {},
      form: {},
      rules: {
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },

  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },

  methods: {
    toSearch () {
      this.$router.push('/wx/search')
    },

    toSearchCred () {
      // this.$router.push('/wx/cred/search')
      this.showC = true
    },

    onSelectC (val) {
      if (val.name === '证书申请') {
        this.$router.push('/wx/apply')
      } else {
        this.$router.push('/wx/cred/search')
      }
      this.showC = false
    },

    toRecord () {
      // this.$router.push('/wx/record')
      this.showS = true
    },

    onSelect (val) {
      if (val.name === '幼儿园') {
        this.$router.push('/wx/record')
      } else if (val.name === '小学') {
        this.$router.push('/wx/primaryRecord')
      } else {
        this.$router.push('/wx/basketRecord')
      }
      this.showS = false
    },

    toPriRecord () {
      this.$router.push('/wx/primaryRecord')
    },

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.updatePassWord(this.form).then((res) => {
            if (res.success) {
              this.$toast('修改成功，请重新登录')
              setTimeout(() => {
                localStorage.removeItem('userInfo')
                this.$router.replace('/wx/login')
              }, 500)
            }
          })
        }
      })
    },

    logout () {
      localStorage.removeItem('userInfo')
      this.$toast('退出成功')
      setTimeout(() => {
        this.$router.replace('/wx/login')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-container {
  padding: 0 15px;
  min-height: 100%;
  // background-color: #f8f8f8;
  .header {
    padding: 25px 10px 15px;
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #ddd;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .menu {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    .arrow {
      transform: scale(1, 1.5);
    }
  }
  .logout {
    margin-top: 50px;
    text-align: center;
    span {
      color: #304890;
      border-bottom: 1px solid #304890;
    }
  }
  .wrapper {
    border-radius: 10px;
    .form {
      text-align: center;
      padding: 15px;
      width: 250px;
      background-color: #fff;
    }
  }
}
</style>
