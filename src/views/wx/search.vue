<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="选择场次" prop="sportId">
          <el-select v-model="form.sportId" placeholder="请选择场次">
            <el-option
              v-for="item in sessionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小朋友姓名">
          <el-input v-model="form.childName" placeholder="请输入小朋友姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="家长手机号">
          <el-input v-model="form.phone" placeholder="请输入家长手机号">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button @click="search" class="login-btn" type="primary">搜索</el-button>
    </div>
    <van-action-sheet v-model="show" :actions="results" @select="onSelect" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      form: {
      },
      results: [],
      rules: {
        sportId: [{ required: true, message: '请选择场次', trigger: 'change' }],
        childName: [{ required: true, message: '请输入小朋友姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入家长手机号', trigger: 'blur' }]
      },
      sessionList: []
    }
  },

  created () {
    this.getSessionList()
  },

  methods: {
    getSessionList () {
      this.api.getWxSessionList().then(res => {
        this.sessionList = res.data
      })
    },

    search () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.getWxReport(this.form).then((res) => {
            if (res.data.length) {
              // this.$router.push({ path: '/wx', query: { info: JSON.stringify(res.data) }})
              this.results = res.data
              this.show = true
            } else {
              this.$toast('没有符合条件的报告')
            }
          })
        }
      })
    },

    onSelect(item) {
      this.show = false
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      // this.$router.push({ path: '/wx', query: { id: item.id }})
      window.location.href = '/wx?id=' + item.id
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
    .login-btn {
      width: 100%;
    }
  }
}
</style>
