<template>
  <div class="report-container">
    <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button :loading="btnLoading" type="success" icon="el-icon-takeaway-box" @click="handlePrint">导出PDF</el-button>
    </div>
    <div class="wrapper" id="content">
      <div class="info-item">
        <span class="text1">{{ info.name }}</span>
        <span class="text2">{{ info.sex === 1 ? '男' : '女' }}</span>
        <span class="text3">{{ info.birthday }}</span>
        <span class="text4">{{ info.createTime && info.createTime.substring(0,10) }}</span>
        <span class="text5">{{ info.age }}</span>
      </div>

      <div class="part-item">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="title">数据总结</div>
        <div class="box">
          <div class="tushi">
            <div class="shiji">
              <div></div>
              <span>实际测量</span>
            </div>
            <div class="pingjun">
              <div></div>
              <span>全国平均值</span>
            </div>
          </div>
          <div class="content">
            <div class="item" v-for="item in compareData" :key="item.my">
              <span>{{ item.name }}：{{ item.my }}{{ item.unit }}</span>
              <div class="compare">
                <template v-if="item.my < item.avg">
                  <div class="top1"></div>
                  <div class="bottom"></div>
                </template>
                <template v-else-if="item.my > item.avg">
                  <div class="top3"></div>
                  <div class="bottom"></div>
                </template>
                <template v-else>
                  <div class="top2"></div>
                  <div class="bottom"></div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-title">
            <img src="../../assets/primary/result.png">
          </div>
          <div class="result-content">
            <div id="chart"></div>
            <div class="pingyu">{{ pingyu }}</div>
          </div>
        </div>
        <div class="other">
          <!-- <div class="left">
            <span>拍球：{{ info.racket }}个</span>
            <span>传球：{{ info.pass }}个</span>
            <span>投篮：{{ info.shoot }}个</span>
          </div> -->
          <div class="left1">
            <img src="../../assets/primary/left1.png">
          </div>
          <div class="right">
            <div class="lf">
              <span>五项总成绩：</span>
              <span>(满分：25分)</span>
            </div>
            <div class="md">{{ info.total }}</div>
            <div class="rg">分</div>
          </div>
        </div>
      </div>

      <div class="part-item">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="title">篮球技能</div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目1：30秒胯下O字绕滚球</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.rall }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.rallScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq1.png" class="lq1">
              </div>
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目2：30秒原地单手运球</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.dsDribble }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.dsDribbleScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq1.png" class="lq1">
              </div>
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目3：拍球/运球</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.bat }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.batScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq2.png" class="lq2">
              </div>
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目4：传球进圈</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.pass }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.passScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq3.png" class="lq3">
              </div>
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目5：原地投篮</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.shoot }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.shootScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq4.png" class="lq4">
              </div>
            </div>
          </div>
          <div class="right1">
            <img src="../../assets/primary/left1.png">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入雷达图组件
require('echarts/lib/chart/radar')
// 引入提示框组件
require('echarts/lib/component/tooltip')
import JsPDF from "jspdf"
import html2Canvas from "html2canvas"

export default {
  data () {
    return {
      btnLoading: false,
      info: {},
      total: 0,
      infoData: [],
      compareData: []
    }
  },

  computed: {
    pingyu () {
      if (this.total >= 85) {
        return '幼儿身体素质发展水平处于优秀水平，但也要关注相关的指标数据的变化和提升，希望继续周期性有规划的保持锻炼，保证锻炼的科学性和有效性，在空余时间可以陪孩子参加各种各样的体育游戏活动。'
      }
      if (this.total >= 75 && this.total <= 84) {
        return '幼儿身体素质处于中等发展水平，数据显示身体素质的综合性相对较好，但部分身体素质依然有较大的提升空间，希望继续保持孩子的运动，尽可能在额外的时间增加多项运动的练习，保护好孩子对运动的兴趣。'
      }
      if (this.total >= 65 && this.total <= 74) {
        return '幼儿身体素质发展整体处于中等稍微偏低水平，孩子的部分身体素质有较大的提升空间，特别关注分值比较低的身体素质指标，建议针对指标的数据，可以多让孩子参加各种各样的体育活动以弥补，提升其综合性的身体素质水平。'
      }
      if (this.total >= 50 && this.total <= 64) {
        return '根据测试数据显示，孩子的身体素质存在一些小问题，我们建议可以进一步定期进行相关的身体素质的测试，并且有目的有计划的进行相关的运动安排，以期为了孩子身体素质的正常发展提供有效措施，为了孩子的健康，我们共同努力。'
      }
      if (this.total < 49) {
        return '根据测试数据显示，孩子的身体素质存在很大问题，我们建议进行相关专家咨询，并及时为孩子进行运动的处方、营养的搭配和合理的作息，，并且建议定期到医院进行问诊和咨询，为了孩子的健康，我们共同努力。'
      }
    },
    racketScore () {
      if (this.info.racketScore < 24) {
        return '及格'
      } else if (this.info.racketScore >= 40) {
        return '优秀'
      } else {
        return '良好'
      }
    },
    passScore () {
      if (this.info.passScore < 18) {
        return '及格'
      } else if (this.info.passScore >= 30) {
        return '优秀'
      } else {
        return '良好'
      }
    },
    shootScore () {
      if (this.info.shootScore < 18) {
        return '及格'
      } else if (this.info.shootScore >= 30) {
        return '优秀'
      } else {
        return '良好'
      }
    }
  },

  filters: {
    scoreFilter (score) {
      if (score == 1) {
        return '10%'
      }
      if (score == 2) {
        return '30%'
      }
      if (score == 3) {
        return '60%'
      }
      if (score == 4) {
        return '75%'
      }
      if (score == 5) {
        return '90%'
      }
    }
  },

  created () {
    this.api.getBasketDetail({ id: this.$route.query.id }).then(res => {
      this.info = res.data
      this.total = res.data.batScore + res.data.dsDribbleScore + res.data.passScore + res.data.rallScore + res.data.shootScore
      // this.infoData = [res.data.height, res.data.ibm, res.data.legs, res.data.szLimb, res.data.coordinate, res.data.balance, res.data.flexibility, res.data.sensitives]
      this.infoData = [res.data.batScore, res.data.dsDribbleScore, res.data.passScore, res.data.rallScore, res.data.shootScore]
      this.compareData = [
        {
          name: '总分', my: res.data.total, avg: 12, unit: ''
        },
        {
          name: '滚球', my: res.data.rallScore, avg: 2, unit: ''
        },
        {
          name: '单手运球', my: res.data.dsDribbleScore, avg: 2, unit: ''
        },
        {
          name: '运球', my: res.data.batScore, avg: 2, unit: ''
        },
        {
          name: '传球', my: res.data.passScore, avg: 2, unit: ''
        },
        {
          name: '投篮', my: res.data.shootScore, avg: 2, unit: ''
        }
      ]
    })
  },

  mounted () {
    let myChart = echarts.init(document.getElementById('chart'))
    setTimeout(() => {
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            radius:'66%',
            name: {
              textStyle: {
                color: '#304890',
                fontSize:'12',
              }
            },
            indicator: [
              {text: '滚球', max: 5},
              {text: '单手运球', max: 5},
              {text: '运球', max: 5},
              {text: '传球', max: 5},
              {text: '投篮', max: 5}
            ]
          }
        ],
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(41,73,146,.8)'
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'rgba(41,73,146,1)',
                    width: 1
                  }
                },
                data: [
                    {
                        value: this.infoData,
                        name: '各项成绩得分'
                    }
                ]
            }
        ]
      })
    }, 500)
  },

  methods: {
    handlePrint () {
      let that = this
      that.btnLoading = true
      html2Canvas(document.querySelector('#content')).then(function (canvas) {
        // let contentWidth = canvas.width
        // let contentHeight = canvas.height
        // let pageData = canvas.toDataURL('image/jpeg', 0.4)
        // let pdfWidth = (contentWidth + 10) / 2 * 0.75
        // let pdfHeight = (contentHeight + 10) / 2 * 0.75 // 500为底部留白
        // let imgWidth = pdfWidth
        // let imgHeight = (contentHeight / 2 * 0.75) //内容图片这里不需要留白的距离
        // let pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight])
        // pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight)
        // pdf.save(that.info.name + '-评估报告.pdf')
        // that.btnLoading = false
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        let pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //页面偏移
        let position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 595.28;
        let imgHeight = 592.28 / contentWidth * contentHeight;
        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        let pdf = new JsPDF('', 'pt', 'a4');
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save(that.info.name + '-评估报告.pdf');
        that.btnLoading = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.report-container {
  background-color: #fff;
  padding: 10px;
  .buttons {
    position: fixed;
  }
  .wrapper { // *1.3
    width: 770px;
    margin: 0 auto;
    .info-item {
      height: 1094px;
      background-image: url('../../assets/primary/cover2.jpg');
      background-size: 100% 100%;
      position: relative;
      span {
        font-size: 32px;
        // font-weight: 600;
        color: #304890;
        position: absolute;
      }
      .text1 {
        bottom: 520px;
        left: 230px;
      }
      .text2 {
        bottom: 520px;
        left: 560px;
      }
      .text3 {
        bottom: 445px;
        left: 260px;
      }
      .text4 {
        bottom: 375px;
        left: 250px;
        font-size: 30px;
      }
      .text5 {
        bottom: 375px;
        left: 600px;
      }
    }
    .part-item {
      height: 1094px;
      padding-bottom: 20px;
      background-color: #f5f5f5;
      // margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .header {
        width: 740px;
        padding: 10px 15px;
        border-bottom: 3px solid #062f87;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: 172px;
          height: 20px;
        }
        .right {
          width: 212px;
          height: 20px;
        }
      }
      .title {
        width: 370px;
        height: 80px;
        // margin: 20px auto 0;
        position: relative;
        background-image: url('../../assets/primary/box.png');
        background-size: 100% 100%;
        font-size: 48px;
        font-weight: 600;
        color: #062f87;
        line-height: 80px;
        text-align: center;
      }
      .box {
        width: 680px;
        // margin: 20px auto;
        padding: 10px;
        border: 4px solid #062f87;
        border-radius: 0 0 20px 20px;
        .tushi {
          padding: 5px 0;
          border: 2px solid #062f87;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .shiji {
            display: flex;
            align-items: center;
            div {
              width: 160px;
              height: 8px;
              background-color: #fcd700;
            }
            span {
              color: #fcd700;
              font-size: 18px;
              margin-left: 10px;
            }
          }
          .pingjun {
            display: flex;
            align-items: center;
            div {
              width: 160px;
              height: 8px;
              background-color: #062f87;
            }
            span {
              color: #062f87;
              font-size: 18px;
              margin-left: 10px;
            }
          }
        }
        .content {
          padding: 0 20px 0 0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 15px;
          .item {
            width: 300px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            span {
              width: 140px;
              font-size: 16px;
              color: #062f87;
              text-align: right;
            }
            .compare {
              margin-left: 10px;
              .top1 {
                width: 120px;
                height: 7px;
                background-color: #fcd700;
              }
              .top2 {
                width: 135px;
                height: 7px;
                background-color: #fcd700;
              }
              .top3 {
                width: 150px;
                height: 7px;
                background-color: #fcd700;
              }
              .bottom {
                width: 135px;
                height: 7px;
                background-color: #062f87;
                margin-top: 5px;
              }
            }
          }
        }
        .box-title {
          padding: 10px 0 5px;
          text-align: center;
          background-color: #062f87;
          img {
            width: 530px;
            height: 32px;
          }
        }
        .result-content {
          display: flex;
          justify-content: space-between;
          #chart {
            width: 380px;
            height: 380px;
          }
          .pingyu {
            width: 300px;
            padding-top: 25px;
            font-size: 16px;
            color: #062f87;
            letter-spacing: 2px;
            text-indent: 2em;
          }
        }
      }
      .other {
        width: 700px;
        // margin: 20px auto 0;
        display: flex;
        justify-content: space-between;
        .left {
          width: 300px;
          height: 130px;
          padding: 0 10px;
          border: 4px solid #062f87;
          border-radius: 0 0 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          span {
            font-size: 16px;
            color: #062f87;
          }
        }
        .left1 {
          position: relative;
          img {
            position: absolute;
            width: 312px;
            height: 134px;
            left: -35px;
          }
        }
        .right {
          width: 320px;
          height: 130px;
          padding: 0 10px;
          border: 4px solid #f0a818;
          background-color: #f0a818;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #fff;
          border-radius: 0 0 20px 20px;
          .lf {
            font-size: 16px;
            font-weight: 600;
            display: flex;
            flex-direction: column;
          }
          .md {
            font-size: 88px;
            font-weight: bold;
          }
          .rg {
            font-size: 26px;
            font-weight: 600;
          }
        }
      }
      .box-content {
        width: 700px;
        // margin: 20px auto 0;
        display: flex;
        justify-content: space-between;
        .box-small {
          width: 320px;
          padding: 8px;
          border: 3px solid #062f87;
          border-radius: 0 0 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .small-title {
            height: 35px;
            background-color: #062f87;
            font-size: 20px;
            font-weight: 600;
            color: #fcd700;
            line-height: 35px;
            text-align: center;
          }
          .tushi {
            padding: 5px 0;
            border: 1px solid #062f87;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 10px 0;
            .shiji {
              display: flex;
              align-items: center;
              div {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #fcd700;
              }
              span {
                color: #fcd700;
                font-size: 14px;
                margin-left: 10px;
              }
            }
            .pingjun {
              display: flex;
              align-items: center;
              div {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #062f87;
              }
              span {
                color: #062f87;
                font-size: 14px;
                margin-left: 10px;
              }
            }
          }
          .zhanshi {
            display: flex;
            align-items: center;
            justify-content: space-around;
            .left {
              font-size: 16px;
              color: #fcd700;
            }
            img {
              width: 140px;
              height: 190px;
            }
            .right {
              font-size: 16px;
              color: #062f87;
            }
            .basket {
              .lq1 {
                width: 128px;
                height: 160px;
              }
              .lq2 {
                width: 274px;
                height: 163px;
              }
              .lq3 {
                width: 177px;
                height: 162px;
              }
              .lq4 {
                width: 234px;
                height: 169px;
              }
            }
            .method {
              display: flex;
              flex-direction: column;
              span {
                font-size: 16px;
                font-weight: 600;
                color: #062f87;
              }
              img {
                width: 185px;
                height: 100px;
                margin-top: 10px;
              }
            }
            .feihuo {
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 120px;
                height: 105px;
              }
              .ts {
                width: 115px;
                height: 190px;
              }
            }
            .long {
              display: flex;
              flex-direction: column;
              align-items: center;
              .long1 {
                width: 260px;
                height: 75px;
              }
              .long2 {
                width: 220px;
                height: 75px;
              }
              .long3 {
                width: 240px;
                height: 75px;
              }
            }
            .time {
              width: 200px;
              padding: 10px 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
              img {
                width: 46px;
                height: 46px;
              }
            }
          }
          .cssd {
            font-size: 16px;
            font-weight: 600;
            color: #062f87;
            text-align: center;
            // margin-top: 10px;
          }
          .text {
            margin-top: 10px;
            font-size: 15px;
            color: #062f87;
          }
        }
        .box-mini {
          width: 212px;
          padding: 5px;
          border: 3px solid #062f87;
          border-radius: 0 0 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .mini-title {
            height: 30px;
            background-color: #062f87;
            font-size: 18px;
            font-weight: 600;
            color: #fcd700;
            line-height: 30px;
            text-align: center;
          }
          .tushi {
            padding: 5px 0;
            border: 1px solid #062f87;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 10px 0;
            .shiji {
              display: flex;
              align-items: center;
              div {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #fcd700;
              }
              span {
                color: #fcd700;
                font-size: 14px;
                margin-left: 10px;
              }
            }
            .pingjun {
              display: flex;
              align-items: center;
              div {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #062f87;
              }
              span {
                color: #062f87;
                font-size: 14px;
                margin-left: 10px;
              }
            }
          }
          .my-result {
            color: #062f87;
            font-size: 18px;
            font-weight: 600;
            margin-top: 10px;
          }
          .pingyu {
            color: #062f87;
            font-size: 16px;
            margin: 10px 0;
          }
          img {
            width: 160px;
            height: 55px;
            display: block;
            margin: 0 auto;
          }
        }
        .right1 {
          position: relative;
          img {
            width: 330px;
            height: 134px;
            transform: rotate(180deg);
            position: absolute;
            right: -35px;
            bottom: 60px;
          }
        }
      }
      .logo {
        width: 400px;
        height: 60px;
        display: block;
        margin: 50px auto 0;
      }
    }
  }
}
</style>

