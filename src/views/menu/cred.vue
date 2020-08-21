<template>
  <div class="cred-container">
    <!-- <el-tabs type="card" @tab-click="handleTab">
      <el-tab-pane label="个人证书"></el-tab-pane>
      <el-tab-pane label="机构证书"></el-tab-pane>
    </el-tabs> -->
    <table-panel
      ref="table"
      :apiMethod="api.getCredPage"
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
        <el-button type="success" icon="el-icon-plus" @click="action = 'add';form = {};dialog = true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="editDisabled" @click="toEdit">编辑</el-button>
        <el-button type="danger" :disabled="delDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button>
        <el-button type="warning" icon="el-icon-view" :disabled="editDisabled" @click="toDetail">预览</el-button>
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
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增分类' : '编辑分类'" :visible.sync="dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="证书类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择证书类型" @change="handleChange">
            <el-option v-for="item in typeList" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" maxlength="18" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="icon">
          <img-upload v-model="form.icon" />
        </el-form-item>
        <!-- <el-form-item label="证书" prop="path">
          <img-upload v-model="form.path" />
        </el-form-item> -->
        <el-form-item label="证书分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择证书分类">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="证书编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入证书编号"></el-input>
        </el-form-item>
        <el-form-item label="证书开始有效期" prop="stTime">
          <el-date-picker
            v-model="form.stTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证书结束有效期" prop="sxTime">
          <el-date-picker
            v-model="form.sxTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择所属区域">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import ImgUpload from '@/components/upload'

export default {
  components: {
    TablePanel,
    ImgUpload
  },
  data () {
    return {
      listQuery: {},
      dialog: false,
      form: {
      },
      action: 'add',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        icon: [{ required: true, message: '请上次照片', trigger: 'blur' }],
        type: [{ required: true, message: '请选择证书类型', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择证书分类', trigger: 'blur' }],
        areaId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        deptName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入证书编号', trigger: 'blur' }],
        stTime: [{ required: true, message: '请选择证书开始有效期', trigger: 'blur' }],
        sxTime: [{ required: true, message: '请选择证书结束有效期', trigger: 'blur' }]
      },
      categoryList: [],
      typeList: [],
      areaList: [],
      selectList: []
    }
  },

  created () {
    this.getType()
    // this.getCategory()
    this.getArea()
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

    handleChange () {
      this.$set(this.form, 'categoryId', '')
      this.getCategory()
    },

    getCategory () {
      this.api.getzsCategoryPage({ size: 20, type: this.form.type }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    getArea () {
      this.api.getRegionList().then(res => {
        if (res.success) {
          this.areaList = res.data
        }
      })
    },

    toEdit () {
      this.action = 'edit'
      this.dialog = true
      const { id, name, sex, idCard, icon, categoryId, deptName, code, stTime, sxTime, areaId } = this.selectList[0]
      this.form = { id, name, sex, idCard, icon, categoryId, deptName, code, stTime, sxTime, areaId }
      this.$set(this.form, 'type', this.selectList[0].categoryType)
      this.getCategory()
    },

    toDetail () {
      this.$router.push({ path: '/cred/img', query: { id: this.selectList[0].id }})
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            this.api.saveCerd(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功，审核通过后可查看')
                this.dialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          } else {
            this.api.updateCerd(this.form).then((res) => {
              if (res.success) {
                this.$message.success('编辑成功')
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
        this.api.delCerd({ ids: ids.toString() }).then(res => {
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