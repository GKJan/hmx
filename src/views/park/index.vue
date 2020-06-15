<template>
  <div class="content-container">
    <table-panel
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
        <el-button v-if="userInfo.role === 1" type="success" icon="el-icon-plus" @click="addDialog = true">新增</el-button>
        <!-- <el-button type="success" icon="el-icon-edit-outline">编辑</el-button> -->
        <el-button type="danger" :disabled="delDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button>
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
        <!-- <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">{{ scope.row.state ? '启用' : '停用' }}</template>
        </el-table-column> -->
      </template>
    </table-panel>
    <el-dialog width="500px" title="新增园区" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="园区名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入园区名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="园区状态" prop="state">
          <el-radio v-model="form.state" :label="1">启用</el-radio>
          <el-radio v-model="form.state" :label="0">停用</el-radio>
        </el-form-item> -->
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
      userInfo: {},
      tableData: [],
      listQuery: {},
      total: 0,
      addDialog: false,
      form: {
        // state: 1
      },
      rules: {
        name: [{ required: true, message: '请输入园区名称', trigger: 'blur' }],
        // state: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      selectList: []
    }
  },

  created () {
  },

  mounted () {
    // console.log(this.$refs.table)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.listQuery = this.$refs.table.listQuery
  },

  computed: {
    delDisabled () {
      if (this.selectList.length === 1) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.addPark(this.form).then((res) => {
            if (res.success) {
              this.$message.success('增加成功')
              this.addDialog = false
              this.form = {}
              this.$refs.table.getList()
            }
          })
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