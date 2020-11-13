<template>
  <div class="content-container">
    <table-panel
      ref="table"
      :apiMethod="api.getzsCategoryPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>分类名称</span>
          <el-input v-model="listQuery.name" placeholder="请输入分类名称"></el-input>
        </div>
        <div class="search-item">
          <span>证书类型</span>
          <el-select v-model="listQuery.type" clearable placeholder="请选择证书类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <el-button type="success" icon="el-icon-plus" @click="action = 'add';dialog = true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="editDisabled" @click="toEdit">编辑</el-button>
        <el-button type="danger" :disabled="delDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button>
      </template>
      <template #tableColumn>
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column
          label="分类名称"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toCred(scope.row.type, scope.row.id)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="zsNum"
          label="证书数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="证书类型"
          align="center">
          <!-- <template slot-scope="scope">{{ scope.row.state ? '启用' : '停用' }}</template> -->
        </el-table-column>
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增分类' : '编辑分类'" :visible.sync="dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="证书类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择证书类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
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
      listQuery: {},
      dialog: false,
      form: {
        // state: 1
      },
      action: 'add',
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择证书类型', trigger: 'blur' }]
      },
      typeList: [],
      selectList: []
    }
  },

  created () {
    this.getType()
  },

  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.listQuery = this.$refs.table.listQuery
  },

  computed: {
    editDisabled () {
      if (this.selectList.length === 1) {
        return false
      } else {
        return true
      }
    },
    delDisabled () {
      if (this.selectList.length) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    getType () {
      this.api.getDictList({ code: 'zs' }).then(res => {
        if (res.success) {
          this.typeList = res.data
        }
      })
    },

    toEdit () {
      this.action = 'edit'
      this.dialog = true
      const { id, name, type } = this.selectList[0]
      this.form = { id, name, type }
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            this.api.savezsCategory(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.dialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          } else {
            this.api.updatezsCategory(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.dialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          }
        }
      })
    },

    handleDel () {
      this.$confirm('是否删除所选记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let item of this.selectList) {
          ids.push(item.id)
        }
        this.api.delzsCategory({ ids: ids.toString() }).then(res => {
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
    },

    toCred (type, id) {
      if (type === '个人证书') {
        this.$router.push({ path: '/cred-person', query: { cId: id }})
      } else {
        this.$router.push({ path: '/cred', query: { cId: id }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>