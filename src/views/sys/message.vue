<template>
  <div class="message-container">
    <div class="select">
      <el-select v-model="listQuery.status" placeholder="已读/未读" @change="getList">
        <el-option v-for="item in duOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="list">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
        <el-checkbox v-for="item in msgList" :label="item.id" :key="item.id">
          <div class="item">
            <div class="left">
              <!-- <i class="el-icon-chat-dot-square"></i> -->
              <el-button type="primary" plain size="mini">{{ item.type }}</el-button>
              <span>{{ item.msg }}</span>
            </div>
            <div class="right">{{ item.createTime }}</div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
      <!-- <div class="item" v-for="item in msgList" :key="item.id">
        <div class="left">
          <i class="el-icon-chat-dot-square"></i>
          <el-button type="primary" plain size="mini">{{ item.type }}</el-button>
          <span>{{ item.msg }}</span>
        </div>
        <div class="right">{{ item.createTime }}</div>
      </div> -->
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="listQuery.current"
      :page-size="listQuery.size"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      duOption: [
        {
          label: '未读',
          value: 2
        },
        {
          label: '已读',
          value: 1
        }
      ],
      checkAll: false,
      isIndeterminate: true,
      checkedList: [],
      msgList: [],
      listQuery: {
        size: 15,
        current: 1,
        status: 2
      },
      total: 0
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      this.api.getMsgPage(this.listQuery).then(res => {
        if (res.success) {
          this.total = res.data.total
          this.msgList = res.data.records
          this.msgList = this.msgList.concat(res.data.records)
        }
      })
    },

    handleCurrentChange (val) {
      this.listQuery.current = val
      this.getList()
    },

    handleCheckAllChange(val) {
      this.checkedList = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style lang="scss" scoped>
.message-container {
  background-color: #fff;
  .select {
    padding: 15px 0 10px 15px;
  }
  .list {
    padding: 0 10px;
    .item {
      width: 95%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>

<style lang="scss">
.message-container {
  .el-button--mini {
    height: 20px;
    padding: 0 8px;
    font-size: 10px;
    line-height: 20px;
    margin: 0 10px 0 0;
  }
  .el-checkbox {
    width: 100%;
    display: block;
  }
  // .el-checkbox__label {
  //   width: 80%;
  // }
}
</style>