<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="证书类型" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择证书类型">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" v-if="form.categoryId == 1 || form.categoryId == 3" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="加盟商名称" v-if="form.categoryId == 2 || form.categoryId == 4" prop="name">
          <el-input v-model="form.name" placeholder="请输入加盟商名称">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号" v-if="form.categoryId == 3 || form.categoryId == 4" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号">
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
      categoryList: [
        {
          name: '个人证书',
          id: 1
        },
        {
          name: '机构证书',
          id: 2
        },
        {
          name: '个人证书审核状态',
          id: 3
        },
        {
          name: '机构证书审核状态',
          id: 4
        }
      ],
      show: false,
      form: {
      },
      results: [],
      realData: [],
      rules: {
        categoryId: [{ required: true, message: '请选择证书类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
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
          if (this.form.categoryId == 1) {
            const params = {
              name: this.form.name
            }
            this.api.getWxCredPage(params).then((res) => {
              if (res.data.length) {
                // this.$router.push({ path: '/wx/cred', query: { info: JSON.stringify(res.data) }})
                let data = []
                for (let item of res.data) {
                  data.push({name: item.zsName})
                }
                this.results = data
                this.realData = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的证书')
              }
            })
          } else if (this.form.categoryId == 2) {
            const params = {
              name: this.form.name
            }
            this.api.getWxOrganCredPage(params).then((res) => {
              if (res.data.length) {
                // this.$router.push({ path: '/wx/cred', query: { info: JSON.stringify(res.data) }})
                this.results = res.data
                this.realData = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的证书')
              }
            })
          } else if (this.form.categoryId == 3) {
            const params = {
              name: this.form.name,
              idCard: this.form.idCard
            }
            this.api.getWxCredAudit(params).then((res) => {
              if (res.data.length) {
                // this.$router.push({ path: '/wx/applyPersonal', query: { info: JSON.stringify(res.data) }})
                let data = []
                for (let item of res.data) {
                  data.push({name: item.zsName})
                }
                this.results = data
                this.realData = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的证书')
              }
            })
          } else {
            const params = {
              name: this.form.name,
              idCard: this.form.idCard
            }
            this.api.getWxOrganCredAudit(params).then((res) => {
              if (res.data.length) {
                // this.$router.push({ path: '/wx/apply', query: { info: JSON.stringify(res.data) }})
                this.results = res.data
                this.show = true
              } else {
                this.$toast('没有符合条件的证书')
              }
            })
          }
        }
      })
    },

    onSelect(action, index) {
      console.log(index)
      this.show = false
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      if (this.form.categoryId == 1 || this.form.categoryId == 2) {
        this.$router.push({ path: '/wx/cred', query: { info: JSON.stringify(this.realData[index])}})
      }
      if (this.form.categoryId == 3) {
        this.$router.push({ path: '/wx/applyPersonal', query: { info: JSON.stringify(item)}})
      }
      if (this.form.categoryId == 4) {
        this.$router.push({ path: '/wx/apply', query: { info: JSON.stringify(item)}})
      }
      // this.$router.push({ path: '/wx/cred', query: { info: JSON.stringify(item) }})
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
