<template>
  <div class="wx-cred-container">
    <div class="img-wrapper" id="wrapper" v-if="type <= 2">
      <img :src="cover" class="base">
      <template v-if="type === 1">
        <img :src="photoPath" class="photo">
        <div class="info">
          <span>{{ detail.name }}</span>
          <span class="item item2">{{ detail.sex === 1 ? '男' : '女' }}</span>
          <span class="item item3">{{ detail.createTime && detail.createTime.substring(0, 10) }}</span>
          <span class="item item4">{{ detail.code }}</span>
          <span class="item item5">{{ detail.stTime && detail.stTime.substring(0, 10) }} ~ {{ detail.sxTime && detail.sxTime.substring(0, 10) }}</span>
        </div>
        <div class="name">{{ detail.name }}</div>
        <div class="time">
          <span>{{ time.year }}</span>
          <span>{{ time.month }}</span>
          <span>{{ time.date }}</span>
        </div>
      </template>
      <template v-else>
        <div class="name2">{{ detail.name }}</div>
        <div class="info2">
          <span>{{ detail.deptName }}</span>
          <span class="item2">{{ detail.code }}</span>
          <span class="item3">{{ detail.stTime && detail.stTime.substring(0, 10) }} ~ {{ detail.sxTime && detail.sxTime.substring(0, 10) }}</span>
        </div>
        <div class="time2">
          <span>{{ time.year }}</span>
          <span>{{ time.month }}</span>
        </div>
      </template>
    </div>

    <div class="img-wrapper2" id="wrapper" v-else>
      <img :src="cover" class="base">
      <img :src="photoPath" class="photo">
      <div class="name">{{ detail.name }}</div>
      <div class="time">
        <span>{{ time.year }}</span>
        <span>{{ time.month }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 1,
      cover: null,
      detail: {},
      photoPath: '',
      time: {},
    }
  },

  created () {
    this.getDetail()
  },

  methods: {
    getDetail () {
      this.api.getCredDetail({ id: this.$route.query.id }).then(res => {
        if (res.success) {
          if (res.data.categoryName === '星伙伴教练员') {
            this.cover = require('../../assets/img/星伙伴教练员.jpg')
          }
          if (res.data.categoryName === '俱乐部星教练') {
            this.cover = require('../../assets/img/俱乐部星教练.jpg')
          }
          if (res.data.categoryName === '星宝贝督导师') {
            this.cover = require('../../assets/img/星宝贝督导师.jpg')
          }
          if (res.data.categoryName === '星伙伴(代理)') {
            this.cover = require('../../assets/img/星伙伴.jpg')
            this.type = 2
          }
          if (res.data.categoryName === '初级教练') {
            this.cover = require('../../assets/img/初级教练.jpg')
            this.type = 3
          }
          if (res.data.categoryName === '初级校长') {
            this.cover = require('../../assets/img/初级校长.jpg')
            this.type = 3
          }
          if (res.data.categoryName === '初级课程顾问') {
            this.cover = require('../../assets/img/初级课程顾问.jpg')
            this.type = 3
          }
          this.detail = res.data
          this.time = {
            year: res.data.createTime.substring(0, 4),
            month: res.data.createTime.substring(5, 7),
            date: res.data.createTime.substring(8, 10)
          }
          this.photoPath = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + res.data.icon
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wx-cred-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-wrapper {
    position: relative;
    .base {
      width: 342px;
      height: 243px;
    }
    .photo {
      position: absolute;
      top: 73px;
      left: 63px;
      width: 65px;
      height: 76px;
    }
    .name {
      font-size: 8px;
      color: #D87830;
      position: absolute;
      bottom: 80px;
      left: 30px;
    }
    .time {
      width: 88px;
      position: absolute;
      bottom: 12px;
      right: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 8px;
      color: #D87830;
    }
    .info {
      position: absolute;
      top: 70px;
      right: 13px;
      display: flex;
      flex-direction: column;
      font-size: 8px;
      color: #D87830;s
      span {
        padding: 3px 0;
      }
      .item2 {
        padding-left: 5px;
      }
      .item5 {
        padding-top: 5px;
      }
    }
    .name2 {
      font-size: 48px;
      font-weight: 600;
      color: #D87830;
      position: absolute;
      top: 245px;
      left: 410px;
    }
    .info2 {
      position: absolute;
      bottom: 62px;
      left: 165px;
      display: flex;
      flex-direction: column;
      font-size: 20px;
      font-weight: 600;
      .item2 {
        margin-top: 3px;
      }
      .item3 {
        padding-left: 40px;
      }
    }
    .time2 {
      width: 120px;
      position: absolute;
      bottom: 55px;
      right: 115px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
    }
  }
  .img-wrapper2 {
    position: relative;
    .base {
      width: 333px;
      height: 465px;
    }
    .photo {
      width: 58px;
      height: 80px;
      position: absolute;
      top: 168px;
      left: 136px;
    }
    .name {
      position: absolute;
      bottom: 193px;
      left: 35px;
      font-size: 11px;
      font-weight: 600;
    }
    .time {
      width: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 173px;
      left: 82px;
      font-size: 10px;
      font-weight: 400;
    }
  }
}
</style>