<template>
  <div class="wx-cred-container" v-loading="loading">
    <div class="img-wrapper" id="wrapper" v-if="type <= 2">
      <img v-if="realSrc" :src="realSrc" class="base">
      <img v-else :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <template v-if="type === 0">
        <img :src="photoPath" class="photo0">
        <div class="info0">
          <span class="item01">{{ detail.name }}</span>
          <span class="item02">{{ detail.sex === 1 ? '男' : '女' }}</span>
          <span class="item03">{{ detail.createTime && detail.createTime.substring(0, 7) }}</span>
          <span class="item04">{{ detail.code }}</span>
        </div>
        <div class="time">
          <span>{{ time.year }}</span>
          <span>{{ time.month }}</span>
          <span>{{ time.date }}</span>
        </div>
      </template>
      <template v-else-if="type === 1">
        <img :src="photoPath" class="photo">
        <div class="info">
          <span>{{ detail.name }}</span>
          <span class="item item2">{{ detail.sex === 1 ? '男' : '女' }}</span>
          <span class="item item3">{{ detail.createTime && detail.createTime.substring(0, 10) }}</span>
          <span class="item item4">{{ detail.code }}</span>
          <span class="item item5">{{ detail.startTime }} ~ {{ detail.endTime }}</span>
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

    <div class="img-wrapper2" id="wrapper" v-else-if="type === 3">
      <img v-if="realSrc" :src="realSrc" class="base">
      <img v-else :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <img :src="photoPath" class="photo">
      <div class="name">{{ detail.name }}</div>
      <div class="time">
        <span>{{ time.year }}</span>
        <span>{{ time.month }}</span>
      </div>
    </div>

    <div class="img-wrapper2" id="wrapper" v-else-if="type === 4">
      <img v-if="realSrc" :src="realSrc" class="base">
      <img v-else :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <img :src="photoPath" class="photo4">
      <div class="name4">{{ detail.name }}</div>
      <div class="code4">{{ detail.code }}</div>
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
      loading: true,
      type: 1,
      realSrc: '',
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
      this.detail = JSON.parse(this.$route.query.info)
      if (this.detail.categoryName.includes('幼儿篮球裁判员')) {
        this.type = 0
      }
      if (this.detail.categoryName.includes('WEAC') || this.detail.categoryName.includes('认证培训') || this.detail.categoryName.includes('公益培训')) {
        this.type = 1
      }
      if (this.detail.categoryName.includes('初级')) {
        this.type = 3
      }
      if (this.detail.categoryName === '幼儿篮球教师资格证书') {
        this.type = 4
      }
      this.time = {
        year: this.detail.createTime.substring(0, 4),
        month: this.detail.createTime.substring(5, 7),
        date: this.detail.createTime.substring(8, 10)
      }
      let photoPath = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + this.detail.icon
      this.imgToBase64(photoPath)
      // this.api.getCredDetail({ id: this.$route.query.id }).then(res => {
      //   if (res.success) {
      //     if (res.data.categoryName === '星伙伴教练员') {
      //       this.cover = require('../../assets/img/星伙伴教练员.jpg')
      //     }
      //     if (res.data.categoryName === '俱乐部星教练') {
      //       this.cover = require('../../assets/img/俱乐部星教练.jpg')
      //     }
      //     if (res.data.categoryName === '星宝贝督导师') {
      //       this.cover = require('../../assets/img/星宝贝督导师.jpg')
      //     }
      //     if (res.data.categoryName === '星伙伴(代理)') {
      //       this.cover = require('../../assets/img/星伙伴.jpg')
      //       this.type = 2
      //     }
      //     if (res.data.categoryName === '初级教练') {
      //       this.cover = require('../../assets/img/初级教练.jpg')
      //       this.type = 3
      //     }
      //     if (res.data.categoryName === '初级校长') {
      //       this.cover = require('../../assets/img/初级校长.jpg')
      //       this.type = 3
      //     }
      //     if (res.data.categoryName === '初级课程顾问') {
      //       this.cover = require('../../assets/img/初级课程顾问.jpg')
      //       this.type = 3
      //     }
      //     this.detail = res.data
      //     this.time = {
      //       year: res.data.createTime.substring(0, 4),
      //       month: res.data.createTime.substring(5, 7),
      //       date: res.data.createTime.substring(8, 10)
      //     }
      //     this.photoPath = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + res.data.icon
      //   }
      // })
    },

    // 将在线图片转为base64
    imgToBase64 (photoPath) {
      let that = this
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let image = new Image()
      image.src = photoPath
      // image.src = src + '?v=' + Math.random() // 处理缓存
      image.crossOrigin = '*' // 支持跨域图片
      image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        that.photoPath = canvas.toDataURL('image/png') // 可选其他值 image/jpeg
      }
    },

    // html导出图片
    handleDown () {
      let that = this
      let canvasID = document.getElementById('wrapper')
      let a = document.createElement('a')
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'
        document.body.removeChild(dom)
        let blob = this.dataURLToBlob(dom.toDataURL('image/png'))
        that.realSrc = URL.createObjectURL(blob)
        that.loading = false
        // a.setAttribute('href', URL.createObjectURL(blob))
        // a.setAttribute('download', '证书.png')
        // document.body.appendChild(a)
        // a.click()
        // URL.revokeObjectURL(blob)
        // document.body.removeChild(a)
      })
    },

    dataURLToBlob (dataurl) { //ie 图片转格式
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {type: mime})
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
    .photo0 {
      position: absolute;
      top: 100px;
      left: 50px;
      width: 60px;
      height: 72px;
    }
    .item01 {
      position: absolute;
      top: 90px;
      left: 165px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      width: 40px;
      text-align: center;
    }
    .item02 {
      position: absolute;
      top: 112px;
      left: 166px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      width: 30px;
      text-align: center;
    }
    .item03 {
      position: absolute;
      top: 156px;
      left: 151px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      width: 75px;
      text-align: center;
    }
    .item04 {
      position: absolute;
      top: 156px;
      left: 250px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      width: 35px;
      text-align: center;
    }
    .photo {
      position: absolute;
      top: 73px;
      left: 63px;
      width: 65px;
      height: 76px;
    }
    .name {
      width: 45px;
      text-align: center;
      font-size: 8px;
      color: #D87830;
      position: absolute;
      bottom: 80px;
      left: 46px;
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
      width: 75px;
      position: absolute;
      top: 68px;
      right: 80px;
      display: flex;
      flex-direction: column;
      font-size: 8px;
      color: #D87830;
      span {
        // padding: 3px 0;
        text-align: center;
      }
      .item2 {
        // padding-left: 5px;
      }
      .item4 {
        margin-top: 2px;
      }
      .item5 {
        margin-top: 4px;
        width: 150px;
        // padding-top: 5px;
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
    .photo4 {
      position: absolute;
      top: 202px;
      left: 137px;
      width: 62px;
      height: 80px;
    }
    .name4 {
      width: 75px;
      position: absolute;
      bottom: 136px;
      left: 135px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      text-align: center;
    }
    .code4 {
      width: 75px;
      position: absolute;
      bottom: 102px;
      left: 155px;
      font-size: 8px;
      // font-weight: 600;
      color: #D87830;
      text-align: center;
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
