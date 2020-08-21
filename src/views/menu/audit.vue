<template>
  <div class="cred-container">
    <table-panel
      ref="table"
      :apiMethod="api.getAuditCredPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>姓名</span>
          <el-input v-model="listQuery.name" placeholder="请输入姓名"></el-input>
        </div>
        <div class="search-item">
          <span>证书编号</span>
          <el-input v-model="listQuery.code" placeholder="请输入证书编号"></el-input>
        </div>
        <div class="search-item">
          <span>单位名称</span>
          <el-input v-model="listQuery.deptName" placeholder="请输入单位名称"></el-input>
        </div>
        <div class="search-item">
          <span>证书类型</span>
          <el-select v-model="listQuery.categoryType" clearable placeholder="请选择证书类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <el-button type="success" icon="el-icon-edit-outline" :disabled="btnDisabled" @click="toAudit">审核通过</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="btnDisabled" @click="disAudit">审核不通过</el-button>
      </template>
      <template #tableColumn>
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          align="center">
        </el-table-column>
        <el-table-column
          label="性别"
          align="center">
          <template slot-scope="scope">{{ scope.row.state === 1 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="证书编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="categoryType"
          label="证书类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="单位名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="证书有效期"
          align="center">
          <template slot-scope="scope">{{ scope.row.stTime }} ~ {{ scope.row.sxTime }}</template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          align="center">
          <template slot-scope="scope">{{ scope.row.auditStatus === 0 ? '待审核' : (scope.row.auditStatus === 1 ? '审核通过' : '审核不通过') }}</template>
        </el-table-column>
      </template>
    </table-panel>
  </div>
</template>

<script>
import TablePanel from '@/components/table'
import ImgUpload from '@/components/upload'

export default {
  components: {
    TablePanel,
    ImgUpload
  },
  data () {
    return {
      listQuery: {},
      form: {
      },
      categoryList: [],
      typeList: [],
      selectList: []
    }
  },

  created () {
    this.getType()
    this.getCategory()
  },

  mounted () {
    this.listQuery = this.$refs.table.listQuery
  },

  computed: {
    btnDisabled () {
      return this.selectList.some(item => {
        return item.auditStatus === 1 || item.auditStatus === 2
      })
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

    getCategory () {
      this.api.getzsCategoryList().then(res => {
        if (res.success) {
          this.categoryList = res.data
        }
      })
    },

    toAudit () {
      if (!this.selectList.length) return this.$message.error('请勾选选项')
      this.$confirm('是否审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let item of this.selectList) {
          ids.push(item.id)
        }
        this.api.toAudit({ ids: ids.toString(), auditStatus: 1 }).then(res => {
          if (res.success) {
            this.$message.success('审核成功')
            this.$refs.table.listQuery.current = 1
            this.$refs.table.getList()
          }
        })
      })
    },

    disAudit () {
      if (!this.selectList.length) return this.$message.error('请勾选选项')
      this.$confirm('是否审核不通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let item of this.selectList) {
          ids.push(item.id)
        }
        this.api.toAudit({ ids: ids.toString(), auditStatus: 2 }).then(res => {
          if (res.success) {
            this.$message.success('审核成功')
            this.$refs.table.listQuery.current = 1
            this.$refs.table.getList()
          }
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>