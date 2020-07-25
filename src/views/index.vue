<template>
  <div class="layout-container">
    <div class="layout-header">
      <div class="header-left">
        <img src="../assets/img/logo.png">
        <span>{{ userInfo.areaName }}</span>
      </div>
      <el-popover
        placement="bottom"
        trigger="click"
      >
        <div slot="reference" class="header-right">
          <img v-if="userInfo.sex === 1" src="../assets/wx/小鹅通评估报告-34.jpg">
          <img v-else src="../assets/wx/小鹅通评估报告-34.jpg">
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="oper">
          <div style="padding-bottom: 5px;border-bottom: 1px solid #eee;cursor: pointer;" @click="dialog = true">修改密码</div>
          <div style="padding-top: 5px;cursor: pointer;" @click="logout">退出登录</div>
        </div>
      </el-popover>
    </div>
    <el-dialog width="500px" title="修改密码" :visible.sync="dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="updataPwd">确 定</el-button>
      </div>
    </el-dialog>
    <div class="layout-side" v-loading="menuloading">
      <slide-menu :list="menulist"></slide-menu>
    </div>
    <transition name="fade">
      <router-view class="layout-body"></router-view>
    </transition>
  </div>
</template>

<script>
import SlideMenu from '@/components/SlideMenu/index'

export default {
  components: {
    SlideMenu
  },

  data () {
    return {
      userInfo: {},
      menuloading: false,
      form: {},
      rules: {
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      },
      dialog: false,
      menulist: []
    }
  },

  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.form.id = this.userInfo.id
    if (this.userInfo.role === 1) {
      this.menulist = [
        {
          id: '1',
          name: '园区管理',
          path: '/park',
          children: [],
          icon: 'icon-yuanqu'
        },
        {
          id: '2',
          name: '场次管理',
          path: '/session',
          children: [],
          icon: 'icon-changciweixuanzhongGAI'
        },
        {
          id: '3',
          name: '信息报告',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '4',
          name: '用户管理',
          path: '/user',
          children: [],
          icon: 'icon-yonghu'
        },
        {
          id: '5',
          name: '日志管理',
          path: '/log',
          children: [],
          icon: 'icon-rizhi'
        },
        {
          id: '6',
          name: '证书管理',
          path: '/certificate',
          children: [],
          icon: 'icon-rizhi'
        }
      ]
    } else if (this.userInfo.role === 2 ) {
      this.menulist = [
        {
          id: '3',
          name: '信息报告',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        }
      ]
    } else if (this.userInfo.role === 3 ) {
      this.menulist = [
        {
          id: '2',
          name: '场次管理',
          path: '/session',
          children: [],
          icon: 'icon-changciweixuanzhongGAI'
        },
        {
          id: '3',
          name: '信息报告',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '4',
          name: '用户管理',
          path: '/user',
          children: [],
          icon: 'icon-yonghu'
        }
      ]
    }
  },

  methods: {
    updataPwd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.updatePassWord(this.form).then((res) => {
            if (res.success) {
              this.$message.success('修改成功，请重新登录')
              this.dialog = false
              setTimeout(() => {
                localStorage.removeItem('userInfo')
                this.$router.push('/login')
              }, 500)
            }
          })
        }
      })
    },

    logout () {
      localStorage.removeItem('userInfo')
      setTimeout(() => {
        this.$message.success('退出成功')
        this.$router.push('/login')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(http://at.alicdn.com/t/font_995795_8vzb832bril.css);

.layout-container {
  .layout-header {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    .header-left {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 24px;
        margin-left: 5px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
  .layout-side {
    position: absolute;
    top: 62px;
    bottom: 0;
    width: 200px;
    overflow-x: hidden;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
  .layout-body {
    position: absolute;
    top: 62px;
    bottom: 0;
    left: 200px;
    right: 0;
    background-color: #f8f8f8;
    padding: 10px;
    overflow-y: auto;
  }
}
</style>
