<template>
  <div class="content-container">
    <table-panel
      ref="table"
      :apiMethod="api.getLogPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>操作人</span>
          <el-input v-model="listQuery.createBy" placeholder="请输入操作人"></el-input>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <!-- <el-button type="success" icon="el-icon-plus" @click="action = 'add';addDialog = true;form = {}">新增</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="editDisabled" @click="beforeEdit">编辑</el-button> -->
        <el-button type="info" icon="el-icon-printer" @click="handleExport">导出</el-button>
        <!-- <el-button type="danger" :disabled="delDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button> -->
      </template>
      <template #tableColumn>
        <el-table-column
          type="index"
          label="序号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip地址"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="操作人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作时间"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作时长"
          align="center">
          <template slot-scope="scope">{{ scope.row.times/1000 + '秒' }}</template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="操作接口"
          align="center">
        </el-table-column>
        <el-table-column
          prop="descs"
          label="操作结果"
          align="center">
        </el-table-column>
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增用户' : '编辑用户'" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="action === 'add'">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="所属园区" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择所属园区">
            <el-option v-for="item in parkList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio v-model="form.role" :label="1">管理员</el-radio>
          <el-radio v-model="form.role" :label="2">录入员</el-radio>
          <el-radio v-model="form.role" :label="3">园区管理员</el-radio>
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
      action: 'add',
      addDialog: false,
      form: {
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        areaId: [{ required: true, message: '请选择所属园区', trigger: 'change' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      parkList: [],
      selectList: []
    }
  },

  created () {
    this.getParkList()
  },

  mounted () {
    this.listQuery = this.$refs.table.listQuery
  },

  computed: {
    editDisabled () {
      if (this.selectList.length === 1) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    getParkList () {
      this.api.getParkList().then(res => {
        if (res.success) {
          this.parkList = res.data
        }
      })
    },

    beforeEdit () {
      this.action = 'edit'
      this.addDialog = true
      const { id, username, phone, areaId, role } = this.selectList[0]
      this.form = { id, username, phone, areaId, role }
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            this.api.addUser(this.form).then((res) => {
              if (res.success) {
                this.$message.success('增加成功')
              }
            })
          } else {
            this.api.editUser(this.form).then((res) => {
              if (res.success) {
                this.$message.success('修改成功')
              }
            })
          }
          this.addDialog = false
          this.$refs.table.getList()
        }
      })
    },

    handleExport () {
      this.api.exportLog({ createBy: this.listQuery.createBy }).then(res => {
        const link = document.createElement('a')
        let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = '日志列表' //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(error => {
        this.$message.error('导出失败，请联系管理员')
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