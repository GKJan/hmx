<template>
  <div class="layout-container">
    <div class="layout-header">
      <div class="header-left">
        <img src="../assets/img/logo.png">
        <span>华蒙星体测系统</span>
      </div>
      <!-- {{ userInfo.areaName }} -->
      <div class="header-right">
        <span style="font-size: 14px;">当前位置：{{ routeTitle }}</span>
        <div class="right">
          <img v-if="userInfo.sex === 1" src="../assets/wx/小鹅通评估报告-34.jpg" class="avatar">
          <img v-else src="../assets/wx/小鹅通评估报告-34.jpg" class="avatar">
          <span>{{ userInfo.username }}</span>
          <span class="change" @click="dialog = true"><i class="el-icon-lock"></i>修改密码</span>
          <img src="../assets/img/close.png" class="close" @click="logout">
        </div>
      </div>
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
    <div class="layout-body">
      <router-view></router-view>
    </div>
    <!-- <transition name="fade">
      <router-view class="layout-body"></router-view>
    </transition> -->
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

  computed: {
    routeTitle () {
      return this.$route.meta.title
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
          icon: 'icon-changci'
        },
        {
          id: '3',
          name: '信息报告(幼儿园)',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '7',
          name: '信息报告(小学)',
          path: '/primaryReport',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '9',
          name: '信息报告(篮球)',
          path: '/basketReport',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '4',
          name: '用户管理',
          path: '/user',
          children: [],
          icon: 'icon-user'
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
          icon: 'icon-zhengshu'
        },
        {
          id: '8',
          name: '数据统计',
          path: '/statistic',
          children: [],
          icon: 'icon-tongji'
        }
      ]
    } else if (this.userInfo.role === 2 ) {
      this.menulist = [
        {
          id: '3',
          name: '信息报告(幼儿园)',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '7',
          name: '信息报告(小学)',
          path: '/primaryReport',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '9',
          name: '信息报告(篮球)',
          path: '/basketReport',
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
          icon: 'icon-changci'
        },
        {
          id: '3',
          name: '信息报告(幼儿园)',
          path: '/report',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '7',
          name: '信息报告(小学)',
          path: '/primaryReport',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '9',
          name: '信息报告(篮球)',
          path: '/basketReport',
          children: [],
          icon: 'icon-baogao'
        },
        {
          id: '4',
          name: '用户管理',
          path: '/user',
          children: [],
          icon: 'icon-user'
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
@import url(http://at.alicdn.com/t/font_995795_py42tkwez4j.css);

.layout-container {
  .layout-header {
    height: 62px;
    display: flex;
    // box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    .header-left {
      width: 200px;
      display: flex;
      align-items: center;
      // justify-content: center;
      background-color: #545c64;
      img {
        width: 30px;
        height: 30px;
        margin-left: 10px;
      }
      span {
        font-size: 20px;
        color: #fff;
        margin-left: 5px;
      }
    }
    .header-right {
      width: calc(100% - 250px);
      padding: 0 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        .avatar {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .change {
          font-size: 13px;
          margin: 0 15px;
          cursor: pointer;
          i {
            font-size: 18px;
            margin-right: 5px;
            color: #666;
          }
        }
        .close {
          width: 15px;
          height: 16px;
          cursor: pointer;
        }
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
    background-color: #545c64;
  }
  .layout-side::-webkit-scrollbar {
    display: none;
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
