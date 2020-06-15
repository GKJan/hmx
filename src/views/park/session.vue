<template>
  <div class="content-container">
    <table-panel
      ref="table"
      :apiMethod="api.getSessionPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>场次名称</span>
          <el-input v-model="listQuery.name" placeholder="请输入场次名称"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <el-button type="success" icon="el-icon-plus" @click="addDialog = true">新增</el-button>
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
          label="场次名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center">
        </el-table-column>
      </template>
    </table-panel>
    <el-dialog width="500px" title="新增场次" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="场次名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入场次名称"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTimes"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTimes"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
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
      listQuery: {},
      addDialog: false,
      form: {
        // state: 1
      },
      rules: {
        name: [{ required: true, message: '请输入场次名称', trigger: 'blur' }],
        startTimes: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endTimes: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
        // state: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      selectList: []
    }
  },

  created () {
  },

  mounted () {
    // console.log(this.$refs.table)
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
          this.api.addSession(this.form).then((res) => {
            if (res.success) {
              this.$message.success('添加成功')
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
        this.api.delSession({ id: this.selectList[0].id }).then(res => {
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