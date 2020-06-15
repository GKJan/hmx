<template>
  <div class="table-container">
    <div class="search-wrapper">
      <slot name="searchItem">
      </slot>
    </div>
    <div class="oper-wrapper">
      <slot name="operBtn">
      </slot>
    </div>
    <div class="table-wrapper">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange">
        <slot name="tableColumn">
        </slot>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="listQuery.current"
        :page-size="listQuery.size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // tableData: {
    //   type: Array,
    //   default: []
    // },
    // total: {
    //   type: Number,
    //   default: 0
    // },
    // listQuery: {
    //   type: Object,
    //   default: {}
    // },
    apiMethod: {
      type: Function
    }
  },

  data () {
    return {
      tableData: [],
      listQuery: {
        current: 1,
        size: 10
      },
      total: 0
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      this.apiMethod(this.listQuery).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },

    handleCurrentChange (val) {
      // this.$emit('handleCurrentChange', val)
      this.listQuery.current = val
      this.getList()
    },

    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  .search-wrapper {
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    .search-item {
      padding: 5px 0;
      // width: 30%;
      display: flex;
      align-items: center;
      margin: 0 3% 0 0;
      span {
        font-size: 14px;
        flex-shrink: 0;
        margin-right: 10px;
      }
    }
  }
  .oper-wrapper {
    margin-bottom: 10px;
    background-color: #fff;
    padding: 0 15px 10px;
    position: relative;
    input {
      position: absolute;
      opacity: 0;
      width: 80px;
      top: 5px;
      left: 100px;
      cursor: pointer;
    }
    a {
      position: absolute;
      opacity: 0;
      display: inline-block;
      width: 120px;
      height: 30px;
      top: 5px;
      left: 390px;
      cursor: pointer;
    }
  }
}
</style>
