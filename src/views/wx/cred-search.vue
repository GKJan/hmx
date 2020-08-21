<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.code" placeholder="请输入证书编号">
          </el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.deptName" placeholder="请输入单位">
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
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入证书编号', trigger: 'blur' }],
        deptName: [{ required: true, message: '请输入单位', trigger: 'blur' }]
      },
      sessionList: []
    }
  },

  created () {
  },

  methods: {

    search () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.getWxCredPage(this.form).then((res) => {
            if (res.data.length) {
              // this.$router.push({ path: '/wx', query: { info: JSON.stringify(res.data) }})
              this.results = res.data
              this.show = true
            } else {
              this.$toast('没有符合条件的证书')
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
      this.$router.push({ path: '/wx/cred', query: { id: item.id }})
      // window.location.href = '/wx?id=' + item.id
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
