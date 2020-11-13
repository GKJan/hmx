<template>
  <div class="cred-img-container">
    <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button :loading="btnLoading" type="success" icon="el-icon-takeaway-box" @click="handleDown">下载</el-button>
    </div>
    <div class="img-wrapper" id="wrapper" v-if="type <= 2">
      <img :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <template v-if="type === 0">
        <img :src="photoPath" class="photo0">
        <div class="info0">
          <span class="item01">{{ detail.name }}</span>
          <span class="item02">{{ detail.sex === 1 ? '男' : '女' }}</span>
          <span class="item03">{{ detail.createTime && detail.createTime.substring(0, 10) }}</span>
          <span class="item04">{{ detail.code }}</span>
          <!-- <span class="item05">{{ detail.startTime }} ~ {{ detail.endTime }}</span> -->
        </div>
        <!-- <div class="name">{{ detail.name }}</div> -->
        <div class="time">
          <span>{{ time.year }}</span>
          <span>{{ time.month }}</span>
          <span>{{ time.date }}</span>
        </div>
      </template>
      <template v-else-if="type === 1">
        <img :src="photoPath" class="photo">
        <div class="info">
          <span class="item">{{ detail.name }}</span>
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
          <span>{{ detail.company }}</span>
          <span class="item2">{{ detail.htNumber }}</span>
          <span class="item3">{{ detail.htStartTime }} ~ {{ detail.htEndTime }}</span>
        </div>
        <div class="time2">
          <span>{{ time.year }}</span>
          <span>{{ time.month }}</span>
        </div>
      </template>
    </div>

    <div class="img-wrapper2" id="wrapper" v-else-if="type === 3">
      <img :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <img :src="photoPath" class="photo">
      <div class="name">{{ detail.name }}</div>
      <div class="time">
        <span>{{ time.year }}</span>
        <span>{{ time.month }}</span>
      </div>
    </div>

    <div class="img-wrapper2" id="wrapper" v-else-if="type === 4">
      <img :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
      <img :src="photoPath" class="photo4">
      <div class="name4">{{ detail.name }}</div>
      <div class="code4">{{ detail.code }}</div>
      <!-- <div class="time">
        <span>{{ time.year }}</span>
        <span>{{ time.month }}</span>
      </div> -->
    </div>

    <div class="img-wrapper" v-else>
      <img :src="require('../../assets/zs/' + detail.categoryName + '.jpg')" class="base">
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  data () {
    return {
      type: 2,
      cover: null,
      detail: {},
      photoPath: '',
      time: {},
      btnLoading: false
    }
  },

  created () {
    this.getDetail()
  },

  methods: {
    getDetail () {
      this.detail = JSON.parse(this.$route.query.info)
      console.log(this.detail)
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
      if (this.detail.categoryName.includes('小小CBA')) {
        this.type = 5
      }
      this.time = {
        year: this.detail.createTime.substring(0, 4),
        month: this.detail.createTime.substring(5, 7),
        date: this.detail.createTime.substring(8, 10)
      }
      if (this.detail.icon) {
        let photoPath = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + this.detail.icon
        this.imgToBase64(photoPath)
      }
      // this.api.getCredDetail({ id: this.$route.query.id }).then(res => {
      //   if (res.success) {
      //     if (res.data.categoryName === '星伙伴教练员') {
      //       this.cover = require('../../assets/img/星伙伴教练员.jpg')
      //     } else if (res.data.categoryName === '俱乐部星教练') {
      //       this.cover = require('../../assets/img/俱乐部星教练.jpg')
      //     } else if (res.data.categoryName === '星宝贝督导师') {
      //       this.cover = require('../../assets/img/星宝贝督导师.jpg')
      //     } else if (res.data.categoryName === '星伙伴(代理)') {
      //       this.cover = require('../../assets/img/星伙伴.jpg')
      //       this.type = 2
      //     } else if (res.data.categoryName === '初级教练') {
      //       this.cover = require('../../assets/img/初级教练.jpg')
      //       this.type = 3
      //     } else if (res.data.categoryName === '初级校长') {
      //       this.cover = require('../../assets/img/初级校长.jpg')
      //       this.type = 3
      //     } else if (res.data.categoryName === '初级课程顾问') {
      //       this.cover = require('../../assets/img/初级课程顾问.jpg')
      //       this.type = 3
      //     } else {
      //       this.cover = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + res.data.path
      //       this.type = 4
      //     }
      //     this.detail = res.data
      //     this.time = {
      //       year: res.data.createTime.substring(0, 4),
      //       month: res.data.createTime.substring(5, 7),
      //       date: res.data.createTime.substring(8, 10)
      //     }
      //     let photoPath = process.env.VUE_APP_baseApi + '/upload/loadImgDataByFileName?fileName=' + res.data.icon
      //     this.imgToBase64(photoPath)
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
      this.btnLoading = true
      let canvasID = document.getElementById('wrapper')
      let a = document.createElement('a')
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'
        document.body.removeChild(dom)
        let blob = this.dataURLToBlob(dom.toDataURL('image/png'))
        a.setAttribute('href', URL.createObjectURL(blob))
        a.setAttribute('download', '证书.png')
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blob)
        document.body.removeChild(a)
        this.btnLoading = false
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
.cred-img-container {
  display: flex;
  .buttons {
  }
  .img-wrapper {
    margin-left: 20px;
    position: relative;
    .base {
      width: 855px;
      height: 605px;
    }
    .photo0 {
      position: absolute;
      top: 248px;
      left: 128px;
      width: 144px;
      height: 180px;
    }
    .photo {
      position: absolute;
      top: 180px;
      left: 160px;
      width: 160px;
      height: 188px;
    }
    .item01 {
      position: absolute;
      top: 245px;
      left: 415px;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
      width: 75px;
      text-align: center;
    }
    .item02 {
      position: absolute;
      top: 295px;
      left: 415px;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
      width: 75px;
      text-align: center;
    }
    .item03 {
      position: absolute;
      top: 403px;
      left: 415px;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
      width: 95px;
      text-align: center;
    }
    .item04 {
      position: absolute;
      top: 403px;
      left: 640px;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
      width: 95px;
      text-align: center;
    }
    .name {
      font-size: 20px;
      font-weight: 600;
      color: #D87830;
      position: absolute;
      bottom: 190px;
      left: 160px;
    }
    .time {
      width: 200px;
      position: absolute;
      bottom: 32px;
      right: 95px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
    }
    .info {
      width: 185px;
      position: absolute;
      top: 182px;
      right: 200px;
      display: flex;
      flex-direction: column;
      font-size: 18px;
      font-weight: 600;
      color: #D87830;
      .item {
        margin-top: 8px;
        text-align: center;
      }
      .item2 {
      }
      .item3 {
        margin-top: 20px;
      }
      .item4 {
        margin-top: 20px;
      }
      .item5 {
        margin-top: 18px;
        width: 250px;
      }
    }
    .name2 {
      font-size: 42px;
      font-weight: 600;
      // color: #D87830;
      position: absolute;
      top: 250px;
      left: 400px;
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
    margin-left: 20px;
    position: relative;
    .base {
      width: 445px;
      height: 618px;
    }
    .photo {
      width: 78px;
      height: 106px;
      position: absolute;
      top: 225px;
      left: 183px;
    }
    .photo4 {
      width: 80px;
      height: 106px;
      position: absolute;
      top: 269px;
      left: 185px;
    }
    .name {
      width: 65px;
      position: absolute;
      bottom: 255px;
      left: 43px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    .name4 {
      width: 110px;
      position: absolute;
      bottom: 180px;
      left: 180px;
      font-size: 12px;
      font-weight: 600;
      color: #D87830;
      text-align: center;
    }
    .code4 {
      width: 110px;
      position: absolute;
      bottom: 133px;
      left: 200px;
      font-size: 12px;
      font-weight: 600;
      color: #D87830;
      text-align: center;
    }
    .time {
      width: 73px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 230px;
      left: 112px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .img-wrapper3 {
    margin-left: 20px;
    position: relative;
    .base {
      max-width: 850px;
    }
  }
}
</style>
