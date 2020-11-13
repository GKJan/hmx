<template>
  <div class="cred-container">
    <!-- <el-tabs type="card" @tab-click="handleTab">
      <el-tab-pane label="个人证书"></el-tab-pane>
      <el-tab-pane label="机构证书"></el-tab-pane>
    </el-tabs> -->
    <table-panel
      ref="table"
      :apiMethod="api.getPersonCredPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <!-- <div class="search-item">
          <span>证书类型</span>
          <el-select v-model="listQuery.categoryType" clearable placeholder="请选择证书类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </div> -->
        <div class="search-item">
          <span>证书分类</span>
          <el-select v-model="listQuery.categoryId" clearable placeholder="请选择证书分类">
            <el-option v-for="item in queryCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <!-- <div class="search-item">
          <span>单位名称</span>
          <el-input v-model="listQuery.deptName" placeholder="请输入单位名称"></el-input>
        </div> -->
        <div class="search-item">
          <span>证书名称</span>
          <el-input v-model="listQuery.zsName" placeholder="请输入证书名称"></el-input>
        </div>
        <div class="search-item">
          <span>所属区域</span>
          <el-cascader
            v-model="listQuery.areaCode"
            :options="areaList"
            :props="areaProps"
            clearable
          >
          </el-cascader>
        </div>
        <div class="search-item">
          <span>状态</span>
          <el-select v-model="listQuery.status" clearable placeholder="请选择状态">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <el-button type="primary" icon="el-icon-search" @click="$refs.table.getList()">搜索</el-button>
        </div>
      </template>
      <template #operBtn>
        <el-button type="success" icon="el-icon-plus" @click="action = 'add';form = {};dialog = true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="editDisabled" @click="toEdit">编辑</el-button>
        <!-- <el-button type="warning" icon="el-icon-edit-outline" :disabled="qyDisabled" @click="toAudit(1)">启用</el-button>
        <el-button type="danger" icon="el-icon-edit-outline" :disabled="jyDisabled" @click="toAudit(2)">禁用</el-button> -->
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
        <!-- <el-table-column
          label="性别"
          align="center">
          <template slot-scope="scope">{{ scope.row.state === 1 ? '男' : '女' }}</template>
        </el-table-column> -->
        <el-table-column
          prop="categoryName"
          label="证书分类"
          align="center">
        </el-table-column>
        <el-table-column
          prop="code"
          label="证书编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="zsName"
          label="证书名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pxName"
          label="培训名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="授权内容"
          align="center">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属区域"
          align="center">
        </el-table-column>
        <el-table-column
          label="证书有效期"
          align="center">
          <template slot-scope="scope">{{ scope.row.startTime }} ~ {{ scope.row.endTime }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">{{ scope.row.status == 0 ? '待生效' : (scope.row.status == 1 ? '生效' : '失效') }}</template>
        </el-table-column>
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增证书' : '编辑证书'" :visible.sync="dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <!-- <el-form-item label="证书类型" prop="categoryType">
          <el-select v-model="form.categoryType" placeholder="请选择证书类型" @change="handleChange">
            <el-option v-for="item in typeList" :key="item.dictValue" :label="item.dictValue" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="icon">
          <img-upload :tips="true" v-model="form.icon" />
        </el-form-item>
        <el-form-item label="证书分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择证书分类" @change="handleChange">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书编号" prop="code">
          <!-- <el-input placeholder="请输入证书编号" v-model="form.code">
            <template slot="prepend">{{ preCode }}</template>
          </el-input> -->
          <el-input v-model="form.code" disabled placeholder="请输入证书编号"></el-input>
        </el-form-item>
        <el-form-item label="证书名称" prop="zsName">
          <el-input v-model="form.zsName" disabled placeholder="请输入证书名称"></el-input>
        </el-form-item>
        <el-form-item label="所属机构/园所">
          <el-input v-model="form.deptName" placeholder="请输入所属机构/幼儿园"></el-input>
        </el-form-item>
        <el-form-item label="所属区域">
          <el-cascader
            v-model="form.areaCode"
            :options="areaList"
            :props="areaProps"
            clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="培训名称">
          <el-input v-model="form.pxName" placeholder="请输入培训名称"></el-input>
        </el-form-item>
        <el-form-item label="参训期数">
          <el-input v-model="form.periodical" placeholder="请输入参训期数"></el-input>
        </el-form-item>
        <el-form-item label="授权内容">
          <el-input v-model="form.content" placeholder="请输入授权内容"></el-input>
        </el-form-item>
        <!-- <template v-if="form.categoryType === '个人证书'"> -->
          <!-- <el-form-item label="性别">
            <el-radio v-model="form.sex" :label="1">男</el-radio>
            <el-radio v-model="form.sex" :label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idCard" maxlength="18" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="照片">
            <img-upload v-model="form.icon" />
          </el-form-item> -->
        <!-- </template> -->
        <!-- <template v-if="form.categoryType === '机构证书'">
          <el-form-item label="单位名称">
            <el-input v-model="form.deptName" placeholder="请输入单位名称"></el-input>
          </el-form-item>
        </template> -->
        <!-- <el-form-item label="培训名称">
          <el-input v-model="form.pxName" placeholder="请输入培训名称"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="证书生效日期" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择生效日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="证书失效日期" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择失效日期">
          </el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="直传证书">
          <img-upload v-model="form.path" />
        </el-form-item> -->
        <!-- <el-form-item label="所属区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择所属区域">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
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
      statusList: [
        {
          id: 0,
          name: '待生效'
        },
        {
          id: 1,
          name: '生效'
        },
        {
          id: 2,
          name: '失效'
        }
      ],
      action: 'add',
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        icon: [{ required: true, message: '请上次照片', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择证书分类', trigger: 'change' }],
        code: [{ required: true, message: '请输入证书编号', trigger: 'blur' }],
        zsName: [{ required: true, message: '请输入证书名称', trigger: 'blur' }],
        pxName: [{ required: true, message: '请输入培训名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入授权内容', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择生效日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择失效日期', trigger: 'change' }]
      },
      categoryList: [],
      queryCategoryList: [],
      typeList: [],
      areaList: [],
      areaProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'code',
        label: 'name',
        children: 'childArea',
        emitPath: false
      },
      selectList: [],
      preCode: ''
    }
  },

  created () {
    this.getType()
    this.getQueryCategory()
    this.getCategory()
    // this.getArea()
    this.getAreaList()
  },

  mounted () {
    this.listQuery = this.$refs.table.listQuery
    if (this.$route.query.cId) {
      this.$set(this.listQuery, 'categoryId', this.$route.query.cId)
    }
    // this.listQuery.categoryType = '个人证书'
    // setTimeout(() => {
    //   this.form.categoryType = '机构证书'
    //   this.$set(this.form, 'categoryType', '机构证书')
    // }, 1000)
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
    },
    qyDisabled () {
      if (this.selectList.length && this.selectList.every(item => item.status == 0 || item.status == 2)) {
        return false
      } else {
        return true
      }
    },
    jyDisabled () {
      if (this.selectList.length && this.selectList.every(item => item.status == 1)) {
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

    getType () {
      this.api.getDictList({ code: 'zs' }).then(res => {
        if (res.success) {
          this.typeList = res.data
        }
      })
    },

    handleChange (val) {
      // this.$set(this.form, 'categoryId', '')
      // this.getCategory()
      this.api.getPersonCredCode({ id: val }).then(res => {
        if (res.success) {
          this.$set(this.form, 'zsName', res.data.name)
          this.$set(this.form, 'code', res.data.code)
          // this.preCode = res.data.code
        }
      })
    },

    getCategory () { // this.form.categoryType
      this.api.getzsCategoryPage({ size: 20, type: '个人证书' }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    getQueryCategory () {
      this.api.getzsCategoryPage({ size: 20, type: '个人证书' }).then(res => {
        if (res.success) {
          this.queryCategoryList = res.data.records
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
      const { id, name, icon, categoryId, code, zsName, pxName, content, startTime, endTime } = this.selectList[0]
      this.form = { id, name, icon, categoryId, code, zsName, pxName, content, startTime, endTime }
      // this.handleChange(this.selectList[0].categoryId)
    },

    toDetail () {
      // this.$router.push({ path: '/cred/img', query: { id: this.selectList[0].id }})
      this.$router.push({ path: '/cred/img', query: { info: JSON.stringify(this.selectList[0]) }})
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.code = this.preCode + this.form.code
          if (this.action === 'add') {
            this.api.savePersonCred(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功，审核通过后可查看')
                this.dialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          } else {
            this.api.updatePersonCred(this.form).then((res) => {
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
        this.api.delPersonCred({ ids: ids.toString() }).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table.listQuery.current = 1
            this.$refs.table.getList()
          }
        })
      })
    },

    toAudit (status) {
      let ids = []
      for (let item of this.selectList) {
        ids.push(item.id)
      }
      this.api.auditPersonCred({ auditStatus: status, ids: ids.toString() }).then(res => {
        if (res.success) {
          if (status == 1) {
            this.$message.success('启用成功')
          } else {
            this.$message.success('禁用成功')
          }
          this.$refs.table.getList()
        }
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
