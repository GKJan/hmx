<template>
  <div class="message-container">
    <div class="select">
      <span>未读/已读消息：</span>
      <el-select v-model="listQuery.status" placeholder="已读/未读" @change="getList">
        <el-option v-for="item in duOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class="button">
      <el-button type="warning" @click="handleRead">标记为已读</el-button>
    </div>
    <div class="list" v-if="listQuery.status == 1">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
        <el-checkbox v-for="item in msgList" :label="item.id" :key="item.id">
          <div class="item">
            <div class="left">
              <el-button type="primary" plain size="mini">{{ item.type }}</el-button>
              <span>{{ item.msg }}</span>
            </div>
            <div class="right">{{ item.createTime }}</div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="list" v-else>
      <div class="item" v-for="item in msgList" :key="item.id">
        <div class="left">
          <el-button type="primary" plain size="mini">{{ item.type }}</el-button>
          <span>{{ item.msg }}</span>
        </div>
        <div class="right">{{ item.createTime }}</div>
      </div>
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
          value: 1
        },
        {
          label: '已读',
          value: 2
        }
      ],
      checkAll: false,
      isIndeterminate: false,
      checkedList: [],
      checkedAllList: [],
      msgList: [],
      listQuery: {
        size: 10,
        current: 1,
        status: 1
      },
      total: 0
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      this.isIndeterminate = false
      this.checkedList = []
      this.api.getMsgPage(this.listQuery).then(res => {
        if (res.success) {
          this.total = res.data.total
          this.msgList = res.data.records
          const ids = []
          for (let item of res.data.records) {
            ids.push(item.id)
          }
          this.checkedAllList = ids
          // this.msgList = this.msgList.concat(res.data.records)
        }
      })
    },

    handleCurrentChange (val) {
      this.listQuery.current = val
      this.getList()
    },

    handleCheckAllChange(val) {
      this.checkedList = val ? this.checkedAllList : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.checkedAllList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedAllList.length
    },

    handleRead () {
      if (!this.checkedList.length) {
        return this.$message.error('请至少选择一条消息')
      }
      this.api.getMsgYidu({ ids: this.checkedList.toString() }).then(res => {
        if (res.success) {
          this.$message.success('标记已读成功')
          this.getList()
          this.isIndeterminate = false
          this.bus.$emit('readLength', this.checkedList.length)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-container {
  background-color: #fff;
  .select {
    padding: 15px 0 10px 15px;
    span {
      font-size: 14px;
    }
  }
  .button {
    padding: 0 0 20px 20px;
  }
  .list {
    padding: 0 10px 0 20px;
    .item {
      // width: 95%;
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
    display: flex;
    align-items: center;
  }
  .el-checkbox__label {
    flex: 1;
  }
  // .el-checkbox__label {
  //   width: 80%;
  // }
}
</style>