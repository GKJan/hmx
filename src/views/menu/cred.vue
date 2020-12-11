<template>
  <div class="cred-container">
    <!-- <el-tabs type="card" @tab-click="handleTab">
      <el-tab-pane label="个人证书"></el-tab-pane>
      <el-tab-pane label="机构证书"></el-tab-pane>
    </el-tabs> -->
    <table-panel
      v-loading="loading"
      ref="table"
      :apiMethod="api.getOrganCredPage"
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
          <span>加盟类型</span>
          <el-select v-model="listQuery.categoryId" clearable placeholder="请选择加盟类型">
            <el-option v-for="item in queryCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
        <!-- <div class="search-item">
          <span>姓名</span>
          <el-input v-model="listQuery.name" placeholder="请输入姓名"></el-input>
        </div> -->
        <!-- <div class="search-item">
          <span>机构名称</span>
          <el-input v-model="listQuery.deptName" placeholder="请输入单位名称"></el-input>
        </div>
        <div class="search-item">
          <span>证书编号</span>
          <el-input v-model="listQuery.code" placeholder="请输入证书编号"></el-input>
        </div> -->
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
          label="加盟商名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="加盟类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属区域"
          align="center">
        </el-table-column>
        <el-table-column
          prop="djxs"
          label="对接销售"
          align="center">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="加盟金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="company"
          label="所属子公司"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lxrName"
          label="联系人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lxrMobile"
          label="联系人电话"
          align="center">
        </el-table-column>
        <el-table-column
          prop="lxrPost"
          label="联系人职务"
          align="center">
        </el-table-column>
        <el-table-column
          prop="htNumber"
          label="合同编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="htgd"
          label="是否归档"
          align="center">
        </el-table-column>
        <el-table-column
          label="合同有效期"
          align="center">
          <template slot-scope="scope">{{ scope.row.htStartTime }} ~ {{ scope.row.htEndTime }}</template>
        </el-table-column>
      </template>
    </table-panel>
    <el-dialog width="500px" :title="action === 'add' ? '新增加盟商' : '编辑加盟商'" :visible.sync="dialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="加盟类型" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择加盟类型">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入加盟商名称"></el-input>
        </el-form-item>
        <el-form-item label="加盟商地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入加盟商地址"></el-input>
        </el-form-item>
        <el-form-item label="对接销售" prop="djxs">
          <el-input v-model="form.djxs" placeholder="请输入对接销售"></el-input>
        </el-form-item>
        <el-form-item label="加盟金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入加盟金额"></el-input>
        </el-form-item>
        <el-form-item label="所属子公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入所属子公司"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名" prop="frName">
          <el-input v-model="form.frName" placeholder="请输入法人姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入法人身份证号"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="lxrName">
          <el-input v-model="form.lxrName" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="lxrMobile">
          <el-input v-model="form.lxrMobile" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="lxrPost">
          <el-input v-model="form.lxrPost" placeholder="请输入联系人职务"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" prop="htNumber">
          <el-input v-model="form.htNumber" placeholder="请输入合同编号"></el-input>
        </el-form-item>
        <el-form-item label="合同归档" prop="htgd">
          <el-radio v-model="form.htgd" label="已归档"></el-radio>
          <el-radio v-model="form.htgd" label="未归档"></el-radio>
        </el-form-item>
        <el-form-item label="合同开始日期" prop="htStartTime">
          <el-date-picker
            v-model="form.htStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束日期" prop="htEndTime">
          <el-date-picker
            v-model="form.htEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            range-separator="至"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaCode">
          <el-cascader
            v-model="form.areaCode"
            :options="areaList"
            :props="areaProps"
          >
          </el-cascader>
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
      areaList: [],
      loading: true,
      areaProps: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: 'code',
        label: 'name',
        children: 'childArea',
        emitPath: false
      },
      listQuery: {},
      dialog: false,
      form: {
      },
      action: 'add',
      rules: {
        categoryId: [{ required: true, message: '请选择加盟类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入加盟商名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入加盟商地址', trigger: 'blur' }],
        djxs: [{ required: true, message: '请输入对接销售', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入加盟金额', trigger: 'blur' }],
        company: [{ required: true, message: '请输入所属子公司', trigger: 'blur' }],
        frName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' }],
        lxrName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        lxrMobile: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        lxrPost: [{ required: true, message: '请输入联系人职务', trigger: 'blur' }],
        htNumber: [{ required: true, message: '请输入合同编号', trigger: 'blur' }],
        htgd: [{ required: true, message: '合同是否归档', trigger: 'blur' }],
        htStartTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        htEndTime: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
        areaCode: [{ required: true, message: '请选择区域', trigger: 'change' }]
      },
      categoryList: [],
      queryCategoryList: [],
      typeList: [],
      selectList: []
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
    this.listQuery.categoryType = '机构证书'
    if (this.$route.query.cId) {
      this.$set(this.listQuery, 'categoryId', this.$route.query.cId)
    }
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

    handleChange () {
      this.$set(this.form, 'categoryId', '')
      this.getCategory()
    },

    getCategory () { // this.form.categoryType
      this.api.getzsCategoryPage({ size: 20, type: '机构证书' }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    getQueryCategory () {
      this.api.getzsCategoryPage({ size: 20, type: '机构证书' }).then(res => {
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
      const { id, categoryId, name, address, djxs, amount, company, frName, sex, idCard, lxrName, lxrMobile, lxrPost, htNumber, htgd, htStartTime, htEndTime, areaCode } = this.selectList[0]
      this.form = { id, categoryId, name, address, djxs, amount, company, frName, sex, idCard, lxrName, lxrMobile, lxrPost, htNumber, htgd, htStartTime, htEndTime, areaCode }
      // this.getCategory()
    },

    toDetail () {
      // this.$router.push({ path: '/cred/img', query: { id: this.selectList[0].id }})
      this.$router.push({ path: '/cred/img', query: { info: JSON.stringify(this.selectList[0]) }})
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            console.log(this.form)
            this.api.saveOrganCred(this.form).then((res) => {
              if (res.success) {
                this.$message.success('新增成功，审核通过后可查看')
                this.dialog = false
                this.form = {}
                this.$refs.table.getList()
              }
            })
          } else {
            this.api.updateOrganCred(this.form).then((res) => {
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
