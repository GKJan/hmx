<template>
  <div class="report-container">
    <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button :loading="btnLoading" type="success" icon="el-icon-takeaway-box" @click="handlePrint">导出PDF</el-button>
    </div>
    <div class="wrapper" id="content">
      <div class="info-item">
        <img src="../../assets/pc/小鹅通评估报告pc端-02.png">
        <div class="text">
          <span class="text1">{{ info.name }}</span>
          <span class="text2">{{ info.sex === 1 ? '男' : '女' }}</span>
          <div class="text3">{{ info.birthday }}</div>
          <span class="text4">{{ info.createTime && info.createTime.substring(0,10) }}</span>
          <span class="text5">{{ info.age }}</span>
        </div>
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
    // bmiResult () {
    //   if (this.info.ibmScore === 1) {
    //     if (this.info.ibm > this.info.bmiAvg) {
    //       return '过胖'
    //     } else {
    //       return '过瘦'
    //     }
    //   }
    //   if (this.info.ibmScore === 3) {
    //     if (this.info.ibm > this.info.bmiAvg) {
    //       return '偏胖'
    //     } else {
    //       return '偏瘦'
    //     }
    //   }
    //   if (this.info.ibmScore === 5) {
    //     return '正常'
    //   }
    // },
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

  created () {
    this.api.getXxDetail({ id: this.$route.query.id }).then(res => {
      this.info = res.data
      this.total = res.data.heightScore + res.data.ibmScore +  res.data.feiHlScore +  res.data.tiaosScore + res.data.flexibilityScore +  res.data.sensitiveScore
      // this.infoData = [res.data.height, res.data.ibm, res.data.legs, res.data.szLimb, res.data.coordinate, res.data.balance, res.data.flexibility, res.data.sensitives]
      this.infoData = [res.data.heightScore, res.data.ibmScore, res.data.feiHlScore, res.data.tiaosScore, res.data.flexibilityScore, res.data.sensitiveScore]
      this.compareData = [
        {
          name: '身高', my: res.data.height, avg: res.data.hightAvg, unit: 'cm'
        },
        {
          name: 'BMI', my: res.data.ibm, avg: res.data.bmiAvg, unit: ''
        },
        {
          name: '肺活量', my: res.data.feiHl, avg: res.data.feiHlAvg, unit: 'ml'
        },
        {
          name: '跳绳', my: res.data.tiaos, avg: res.data.tiaosAvg, unit: '个/分钟'
        },
        {
          name: '柔韧性', my: res.data.flexibility, avg: res.data.flexibilityAvg, unit: 'cm'
        },
        {
         name: '灵敏性',  my: res.data.sensitiveAvg, avg: res.data.sensitives, unit: 'cm'
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
              {text: '身高', max: 20},
              {text: 'BMI', max: 20},
              {text: '肺活量', max: 1000},
              {text: '跳绳', max: 200},
              {text: '柔韧性', max: 10},
              {text: '灵敏性', max: 10}
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
  .buttons {
    position: fixed;
    padding: 10px 0 20px 20px;
  }
  .wrapper {
    width: 60vw;
    margin: 0 auto;
    .info-item {
      height: 85.3vw;
      background-image: url('../../assets/pc/小鹅通评估报告pc端_画板 1 副本 6.png');
      background-size: 100% 100%;
      position: relative;
      img {
        margin-top: 9vw;
        width: 60vw;
        height: 68vw;
      }
      .text {
        width: 30vw;
        bottom: 14vw;
        left: 20vw;
        font-size: 24px;
        font-weight: 600;
        color: #304890;
        position: relative;
        .text2 {
          margin-left: 17vw;
        }
        .text3 {
          position: absolute;
          top: 4vw;
          left: 4vw;
        }
        .text4 {
          position: absolute;
          top: 8.5vw;
          left: 2vw;
        }
        .text5 {
          position: absolute;
          top: 8.5vw;
          left: 24vw;
        }
      }
    }
    .part-item {
      height: 85.3vw;
      .header {
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
        width: 35vw;
        height: 7vw;
        margin: 5vw auto 0;
        position: relative;
        background-image: url('../../assets/primary/box.png');
        background-size: 100% 100%;
        font-size: 48px;
        font-weight: 600;
        color: #062f87;
        line-height: 7vw;
        text-align: center;
      }
      .box {
        width: 50vw;
        margin: 5vw auto;
        padding: 20px;
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
              width: 15vw;
              height: 10px;
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
              width: 15vw;
              height: 10px;
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
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 20px;
          .item {
            width: 23vw;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            span {
              width: 10vw;
              font-size: 16px;
              color: #062f87;
              text-align: right;
            }
            .compare {
              margin-left: 10px;
              .top1 {
                width: 8vw;
                height: 1vw;
                background-color: #fcd700;
              }
              .top2 {
                width: 10vw;
                height: 1vw;
                background-color: #fcd700;
              }
              .top3 {
                width: 12vw;
                height: 1vw;
                background-color: #fcd700;
              }
              .bottom {
                width: 10vw;
                height: 1vw;
                background-color: #062f87;
                margin-top: 5px;
              }
            }
          }
        }
        .box-title {
          padding: 1vw 0;
          text-align: center;
          background-color: #062f87;
          img {
            width: 530px;
            height: 32px;
          }
        }
      }
    }
  }
}
</style>

