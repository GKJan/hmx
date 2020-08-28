<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="报告来源" prop="source">
          <el-select v-model="form.source" placeholder="请选择报告来源">
            <el-option
              v-for="item in sources"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
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
      sources: ['幼儿园', '小学', '篮球'],
      form: {
      },
      results: [],
      rules: {
        source: [{ required: true, message: '请选择来源', trigger: 'change' }],
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
          const form = {
            sportId: this.form.sportId,
            childName: this.form.childName,
            phone: this.form.phone
          }
          if (this.form.source === '幼儿园') {
            this.api.getWxReport(form).then((res) => {
              if (res.data.length) {
                this.results = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的报告')
              }
            })
          } else if (this.form.source === '小学') {
            this.api.getXxWxReport(form).then((res) => {
              if (res.data.length) {
                this.results = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的报告')
              }
            })
          } else {
            this.api.getBasketWxReport(form).then((res) => {
              if (res.data.length) {
                this.results = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的报告')
              }
            })
          }
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
      if (this.form.source === '幼儿园') {
        window.location.href = '/wx?id=' + item.id
      } else if (this.form.source === '小学') {
        window.location.href = '/wx/primaryReport?id=' + item.id
      } else {
        window.location.href = '/wx/basketReport?id=' + item.id
      }
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
