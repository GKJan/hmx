<template>
  <div class="cred-container">
    <table-panel
      v-loading="loading"
      ref="table"
      :apiMethod="api.getOrganCredAuditPage"
      @handleSelectionChange="handleSelectionChange"
    >
      <template #searchItem>
        <div class="search-item">
          <span>加盟类型</span>
          <el-select v-model="listQuery.categoryId" clearable placeholder="请选择加盟类型">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <div class="search-item">
          <span>审核状态</span>
          <el-select v-model="listQuery.auditStatus" clearable placeholder="请选择审核状态">
            <el-option v-for="item in auditStatusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="btnDisabled" @click="toAudit">审核通过</el-button>
        <el-button type="warning" icon="el-icon-edit-outline" :disabled="btnDisabled" @click="toDisAudit">审核不通过</el-button>
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
          prop="address"
          label="加盟商地址"
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
          prop="frName"
          label="法人姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="法人身份证号"
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
        <el-table-column
          label="审核状态"
          align="center">
          <template slot-scope="scope">{{ scope.row.auditStatus == 1 ? '审核通过' : (scope.row.auditStatus == 2 ? '审核不通过' : '待审核') }}</template>
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
      categoryList: [],
      auditStatusList: [
        {
          id: 0,
          name: '待审核'
        },
        {
          id: 1,
          name: '审核通过'
        },
        {
          id: 2,
          name: '审核不通过'
        }
      ],
      selectList: []
    }
  },

  created () {
    this.getAreaList()
    this.getCategory()
  },

  mounted () {
    this.listQuery = this.$refs.table.listQuery
    this.listQuery.categoryType = '机构证书'
    // setTimeout(() => {
    //   this.form.categoryType = '机构证书'
    //   this.$set(this.form, 'categoryType', '机构证书')
    // }, 1000)
  },

  computed: {
    btnDisabled () {
      if (this.selectList.length && this.selectList.every(item => item.auditStatus == 0)) {
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

    getCategory () { // this.form.categoryType
      this.api.getzsCategoryPage({ size: 20, type: '机构证书' }).then(res => {
        if (res.success) {
          this.categoryList = res.data.records
        }
      })
    },

    toAudit () {
      let ids = []
      for (let item of this.selectList) {
        ids.push(item.id)
      }
      this.api.auditOrganCred({ ids: ids.toString(), auditStatus: 1 }).then(res => {
        if (res.success) {
          this.$message.success('审核成功')
          this.$refs.table.getList()
        }
      })
    },

    toDisAudit () {
      let ids = []
      for (let item of this.selectList) {
        ids.push(item.id)
      }
      this.api.auditOrganCred({ ids: ids.toString(), auditStatus: 2 }).then(res => {
        if (res.success) {
          this.$message.success('审核成功')
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