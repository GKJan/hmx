<template>
  <div class="content-container">
    <table-panel
      v-loading="loading"
      ref="table"
      :apiMethod="api.getParkPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>园区名称</span>
          <el-input v-model="listQuery.name" placeholder="请输入园区名称"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <el-button v-if="userInfo.role === 1" type="success" icon="el-icon-plus" @click="action = 'add';addDialog = true;form = {}">新增</el-button>
        <el-button v-if="userInfo.role === 1" type="warning" :disabled="btnDisabled" icon="el-icon-edit-outline" @click="beforeEdit">编辑</el-button>
        <el-button type="danger" :disabled="btnDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button>
      </template>
      <template #tableColumn>
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="园区名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属行政区"
          align="center">
        </el-table-column>
        <!-- <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">{{ scope.row.state ? '启用' : '停用' }}</template>
        </el-table-column> -->
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增园区' : '编辑园区'" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="园区名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入园区名称"></el-input>
        </el-form-item>
        <el-form-item label="所属行政区" prop="areaCode">
          <el-cascader
            v-model="form.areaCode"
            :options="areaList"
            :props="areaProps"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="form.type" label="场馆"></el-radio>
          <el-radio v-model="form.type" label="幼儿园"></el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePanel from '@/components/table'

export default {
  components: {
    TablePanel
  },
  data () {
    return {
      areaList: [],
      loading: false,
      userInfo: {},
      listQuery: {},
      addDialog: false,
      form: {
      },
      action: 'add',
      rules: {
        name: [{ required: true, message: '请输入园区名称', trigger: 'blur' }],
        areaCode: [{ required: true, message: '请选择所属行政区', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      selectList: [],
      areaProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'code',
        label: 'name',
        children: 'childArea'
      }
    }
  },

  created () {
    this.loading = true
    this.getAreaList()
  },

  mounted () {
    // console.log(this.$refs.table)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.listQuery = this.$refs.table.listQuery
  },

  computed: {
    btnDisabled () {
      if (this.selectList.length === 1) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    getAreaList () {
      this.api.getArea().then(res => {
        if (res.success) {
          this.areaList = res.data
          this.loading = false
        }
      })
    },

    beforeEdit () {
      this.action = 'edit'
      this.addDialog = true
      const { id, name, type } = this.selectList[0]
      this.form = { id, name, type }
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.areaCode = this.form.areaCode[this.form.areaCode.length - 1]
          if (this.action === 'add') {
            this.api.addPark(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.addDialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          } else {
            this.api.editPark(this.form).then((res) => {
              if (res.success) {
                this.$message.success('修改成功')
                this.addDialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          }
        }
      })
    },

    handleDel () {
      this.$confirm('是否删除这条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.api.delPark({ id: this.selectList[0].id }).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.listQuery.current = 1
            this.$refs.table.getList()
          }
        })
      })
    },

    handleSelectionChange (val) {
      this.selectList = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>