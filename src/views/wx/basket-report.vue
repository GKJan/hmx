<template>
  <div class="report-container">
    <!-- <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button :loading="btnLoading" type="success" icon="el-icon-takeaway-box" @click="handlePrint">导出PDF</el-button>
    </div> -->
    <div class="wrapper" id="content">
      <div class="info-item">
        <span class="text1">{{ info.name }}</span>
        <span class="text2">{{ info.sex === 1 ? '男' : '女' }}</span>
        <span class="text3">{{ info.birthday }}</span>
        <span class="text4">{{ info.createTime && info.createTime.substring(0,10) }}</span>
        <span class="text5">{{ info.type == 1 ? '小班' : (info.type == 2 ? '中班' : '大班') }}</span>
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
              <span>(满分：100分)</span>
            </div>
            <div class="md">{{ info.total }}</div>
            <div class="rg">分</div>
          </div>
        </div>
      </div>

      <div class="part-item" style="min-height: 1180px;">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="title">篮球技能</div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目1：球感</div>
            <div class="cssd" v-if="info.type == 3">测试方法：球在胯下 8 字滚球累计的次数，完成一个 8 字才算成功 1 个，双脚打开，在过程中球滚离手后，回来继续累计起来</div>
            <div class="cssd" v-else>测试方法：在30秒内，球在胯下O字滚球累计的次数，完成一个O字才算成功1个，双脚打开，在过程中球滚离手后，回来继续累计</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.rall }}个</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.rallScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq1.png" class="lq1">
                <span v-if="info.rallScore <= 8">
                  培养幼儿兴趣为主，加强身体的协助性，在家可以采用全蹲体前左右滚球，与家长面对面地滚球，眼睛看目标（球）滚动，每次练习 5-8 分钟，一周练习 2-3 次，期待着孩子进步
                </span>
                <span v-else-if="8 < info.rallScore < 16">
                  以幼儿手眼协助为主，通过胯下滚球，左右手交替协调滚球，坚持有效的练习，相信幼儿会取得更大的进步
                </span>
                <span v-else>每周坚持 2-3 次的球性练习，幼儿对球感觉越来越好，每次练习不小于 20 分钟，希望幼儿取得比较大的进步</span>
              </div>
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目2：原地运球</div>
            <div class="cssd" v-if="info.type == 1">测试方法：在直径 2 米的圈，在 30 秒内单手、左右手，双手拍球累积的个数（单次拍球连续 3 次以上）</div>
            <div class="cssd" v-if="info.type == 2">测试方法：在直径 1.5 米的圈，在 30 秒内原地单手拍球累积的个数（3 个以上累积进行数数，可以选择左右手交换运球）</div>
            <div class="cssd" v-if="info.type == 3">测试方法：在直径 1.0 米的圈，在 30 秒内左右手拍球累积的个数，要求必须左右交替运球</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.dsDribble }}个</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.dsDribbleScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq1.png" class="lq1">
                <span v-if="info.dsDribbleScore <= 8">
                  培养幼儿成功感，前期家长可以手握幼儿手，让幼儿找准节奏，再慢慢放手，采用 7 号或者 5 号球，节奏感会更易把握
                </span>
                <span v-else-if="8 < info.dsDribbleScore < 16">
                  在教幼儿时，给予幼儿及时肯定，一周练习 3-5 次，每次能连续拍 20 下，可采用 5 号球，有节奏拍起球
                </span>
                <span v-else>
                  坚持每周练习 2-3 次，连续拍球 1 分钟以上，拍球范围尽量在 1-2 米之内
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目3：行进间运球</div>
            <div class="cssd" v-if="info.type == 1">测试方法：8 米折返动感 1+1 拍球：走一步，原地拍接球一次，依次进行往返距离 8 米，若途中出现失误，拾球从新开始，秒表不停（根据能力情况可以选择单手行进间运球）</div>
            <div class="cssd" v-if="info.type == 2">测试方法：10 米直线行进间单手运球返回，若途中出现失误，拾球从新开始，秒表不停</div>
            <div class="cssd" v-if="info.type == 3">测试方法：球与球筐放置在起跑线后沿的队伍左侧。在直线方向上每隔 2 米放一个雪糕桶，总长 10 米，共 5 个雪糕桶。在前进方向上，雪糕桶之间为换手区</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.bat }}秒</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.batScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq2.png" class="lq2">
                <span v-if="info.batScore <= 8">
                  让幼儿原地熟悉连续拍球 30 下，可以原地拍一下球，往前走一步，3 米能连续运球，5 米慢慢增加 8 米行进间运球
                </span>
                <span v-else-if="8 < info.batScore < 16">
                  在原地熟悉连续拍球 50 下，尝试左手/右手，右左手交替运球，以幼儿最快最舒服的运球方式终于站后折返运球
                </span>
                <span v-else>
                  坚持每周练习 2-3 次，连续拍球 1 分钟以上，拍球范围尽量在 1-2 米之内
                </span>
              </div>
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目4：传球</div>
            <div class="cssd" v-if="info.type == 1">测试方法：用幼儿园三个轮胎叠起来，幼儿在远 1 米处进行传球/抛球进轮胎，有 10 次机会</div>
            <div class="cssd" v-if="info.type == 2">测试方法：用幼儿园三个轮胎叠起来，中间放一个坚起来的轮胎，幼儿在远 1.2 米处进行传球穿过坚起来轮胎，有 10 次机会</div>
            <div class="cssd" v-if="info.type == 3">测试方法：用幼儿园三个轮胎叠起来，中间放一个坚起来的轮胎，幼儿在远 1.5 米处进行传球穿过坚起来轮胎，有 10 次机会</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.pass }}个</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.passScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq3.png" class="lq3">
                <span v-if="info.passScore <= 8">
                  让幼儿原地熟悉连续拍球 30 下，可以原地拍一下球，往前走一步，3 米能连续运球，5 米慢慢增加 8 米行进间运球
                </span>
                <span v-else-if="8 < info.passScore < 16">
                  幼儿可练习地滚球，朝着目标将球“滚出”，接着朝着目标“抛出”，让幼儿感兴趣，最后家长一周让幼儿练习 2-3 次
                </span>
                <span v-else>
                  保持一周练习 2-3 次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标抛/传球
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目5：原地投篮</div>
            <div class="cssd" v-if="info.type == 1">测试方法：篮筐与地面高度 1.4 米，篮筐底线远 1.3 米处投/抛篮，10 个</div>
            <div class="cssd" v-if="info.type == 2">测试方法：篮筐与地面高度 1.6 米，篮筐底线远 1.5 米处投篮 10 个</div>
            <div class="cssd" v-if="info.type == 3">测试方法：篮筐与地面高度 1.8 米，篮筐底线远 1.8 米处投篮，10 个</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>我的成绩：{{ info.shoot }}个</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>超过全国：{{ info.shootScore | scoreFilter }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="basket">
                <img src="../../assets/primary/lq4.png" class="lq4">
                <span v-if="info.shootScore <= 6">
                  保持一周练习 2-3 次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标投篮，比如家长举起手，幼儿将球投到家长手上
                </span>
                <span v-else-if="6 < info.shootScore < 16">
                  让幼儿获得成功喜悦，家长一周 2-3 次，让幼儿将球投到指点的位置，比如墙壁贴怪兽，让幼儿打怪兽等
                </span>
                <span v-else>
                  保持一周练习 2-3 次，建意适合的篮筐，让幼儿定点投篮，注意动作发力点
                </span>
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
      if (this.info.type == 1) {
        if (this.total <= 40) {
          return `孩子身体协调能力比全国现年龄段孩子水平偏弱，如长期发展，会对孩子身心健康产生比较大影响。
          （1）合理安排户外运动 10 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，比如简单坐地面滚球、滚球打保龄球；
          （2）让孩子在运动中获得成功喜悦，多鼓励幼儿尝试，前期可以手把手教孩子拍球，每次练习不小于 10 分钟。`
        } else if (40 < this.total < 80) {
          return `孩子身体协调能力达到全国现年龄段孩子正常水平，坚持让孩子在运动中找到兴趣，让孩子乐于其中。
          （1）坚持运动让孩子更加自信，乐观，在兴趣基础上，增加运动时长和次数，孩子也越来越健康；
          （2）原地连续拍球 30 以上，增加非优势肢体锻炼，让左右手稳定拍球，左右脑得到有效锻炼，适合增加行进间运球速度，快速并且稳定左右手行进间运球 10 米返回。`
        } else {
          return `孩子水平超过全国现年龄段孩子水平，发展孩子优势，运动让孩子找到更多自信。
          （1）孩子在运动中表现，及时肯定和表扬，让孩子在运动中找到快乐，快乐运动中，养成运动良好习惯；
          （2）在速度上，一周 2-3 次 10 米行进间运球，练习 3 组。在身体协调上，左右手都稳定拍球 40 个以上，一周练习 2-3 次。在上肢力量，投篮 1.4 米高篮筐，每次练习 3-5 次，每组 10 个。`
        }
      }
      if (this.info.type == 2) {
        if (this.total <= 40) {
          return `每周适当 2-3 次户外锻炼，有针对性加强身体的爬、走、跑、跳等。
          （1）合理安排户外运动 15 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，让孩子在运动中获得成功喜悦，多鼓励幼儿尝试，前期可以手把手教孩子拍球，每次练习不小于 15 分钟。`
        } else if (40 < this.total < 80) {
          return `坚持每周球性练习，让孩子将球围绕头、腰、膝盖、胯下，转圈，动作由慢到快，巩固球性练习，打好基本功。
          （1）坚持运动让孩子更加自信，乐观，在兴趣基础上，增加运动时长和次数，孩子也越来越健康；
          （2）原地连续拍球 40 以上，增加非优势肢体锻炼，让左右手稳定拍球，左右脑得到有效锻炼，适合增加行进间运球速度，快速并且稳定左右手行进间运球 10 米返回。`
        } else {
          return `坚持每周 2-3 次基本球性练习，将球围绕头、腰、膝盖、胯下，转圈，以 1 分钟练习量，每次练习 10-15 分钟。
          （1）孩子在运动中表现，及时肯定和表扬，让孩子在运动中找到快乐，快乐运动中，养成运动良好习惯；
          （2）在速度上，一周 2-3 次 10 米行进间运球，练习 3 组。在身体协调上，左右手都稳定拍球 50 个以上，一周练习 2-3 次。在上肢力量，投篮 1.6 米高篮筐，每次练习 3-5 次，每组 10 个。`
        }
      }
      if (this.info.type == 3) {
        if (this.total <= 40) {
          return '户外运动时，结合篮球游戏，让孩子乐意参与游戏中，切记不能采用机械训练。合理安排户外运动 20 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，比如简单坐地面滚球、滚球打保龄球，让孩子在运动中获得成功喜悦，多鼓励幼儿尝试。'
        } else if (40 < this.total < 80) {
          return `行进间运球由慢到快，运球平衡，并且灵活，10 米快速运球一周练习 5-8 次。
          （1）坚持运动让孩子更加自信，乐观，在兴趣基础上，增加运动时长和次数，孩子也越来越健康；
          （2）原地连续拍球 60 以上，增加非优势肢体锻炼，让左右手稳定拍球，左右脑得到有效锻炼，适合增加行进间运球速度，快速并且稳定左右手行进间运球 10 米返回。`
        } else {
          return `结合传球、投篮、运球，有针对性完成篮球作业，多参与篮球比赛活动，让孩子在篮球中找到快乐、自信。
          （1）孩子在运动中表现，及时肯定和表扬，让孩子在运动中找到快乐，快乐运动中，养成运动良好习惯；
          （2）在速度上，一周 2-3 次 10 米行进间运球，练习 3 组。在身体协调上，左右手都稳定拍球 65 个以上，一周练习 2-3 次。在上肢力量，投篮 1.8 米高篮筐，每次练习 3-5 次，每组 10 个。`
        }
      }
    }
  },

  filters: {
    scoreFilter (score) {
      if (score == 4) {
        return '10%'
      }
      if (score == 8) {
        return '30%'
      }
      if (score == 12) {
        return '60%'
      }
      if (score == 16) {
        return '75%'
      }
      if (score == 20) {
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
          name: '总分', my: res.data.total, avg: 50, unit: ''
        },
        {
          name: '球感', my: res.data.rallScore, avg: 10, unit: ''
        },
        {
          name: '原地运球', my: res.data.dsDribbleScore, avg: 10, unit: ''
        },
        {
          name: '行进间运球', my: res.data.batScore, avg: 10, unit: ''
        },
        {
          name: '抛/传球', my: res.data.passScore, avg: 10, unit: ''
        },
        {
          name: '原地投篮', my: res.data.shootScore, avg: 10, unit: ''
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
              {text: '球感', max: 20},
              {text: '原地运球', max: 20},
              {text: '行进间运球', max: 20},
              {text: '抛/传球', max: 20},
              {text: '原地投篮', max: 20}
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
  .wrapper {
    width: 100%;
    .info-item {
      height: 142vw;
      background-image: url('../../assets/primary/cover2.jpg');
      background-size: 100% 100%;
      position: relative;
      span {
        font-size: 16px;
        // font-weight: 600;
        color: #304890;
        position: absolute;
      }
      .text1 {
        bottom: 67vw;
        left: 32vw;
      }
      .text2 {
        bottom: 67vw;
        left: 72vw;
      }
      .text3 {
        bottom: 57vw;
        left: 34vw;
      }
      .text4 {
        bottom: 49vw;
        left: 32vw;
        font-size: 14px;
      }
      .text5 {
        bottom: 49vw;
        left: 75vw;
      }
    }
    .part-item {
      min-height: 920px;
      padding-bottom: 20px;
      background-color: #f5f5f5;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .header {
        width: 96%;
        padding: 10px 2%;
        border-bottom: 2px solid #062f87;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: 110px;
          height: 14px;
        }
        .right {
          width: 140px;
          height: 14px;
        }
      }
      .title {
        width: 280px;
        height: 60px;
        // margin: 20px auto 0;
        position: relative;
        background-image: url('../../assets/primary/box.png');
        background-size: 100% 100%;
        font-size: 28px;
        font-weight: 600;
        color: #062f87;
        line-height: 65px;
        text-align: center;
      }
      .box {
        width: 340px;
        // margin: 20px auto;
        padding: 5px;
        border: 3px solid #062f87;
        border-radius: 0 0 10px 10px;
        .tushi {
          margin-top: 10px;
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
              width: 70px;
              height: 6px;
              background-color: #fcd700;
            }
            span {
              color: #fcd700;
              font-size: 15px;
              margin-left: 10px;
            }
          }
          .pingjun {
            display: flex;
            align-items: center;
            div {
              width: 70px;
              height: 6px;
              background-color: #062f87;
            }
            span {
              color: #062f87;
              font-size: 15px;
              margin-left: 10px;
            }
          }
        }
        .content {
          padding: 0 15px 0 0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 10px;
          .item {
            width: 160px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            span {
              width: 80px;
              font-size: 14px;
              color: #062f87;
              text-align: right;
              flex-shrink: 0;
            }
            .compare {
              margin-left: 10px;
              .top1 {
                width: 60px;
                height: 7px;
                background-color: #fcd700;
              }
              .top2 {
                width: 70px;
                height: 7px;
                background-color: #fcd700;
              }
              .top3 {
                width: 80px;
                height: 7px;
                background-color: #fcd700;
              }
              .bottom {
                width: 70px;
                height: 7px;
                background-color: #062f87;
                margin-top: 3px;
              }
            }
          }
        }
        .box-title {
          padding: 10px 0 5px;
          text-align: center;
          background-color: #062f87;
          img {
            width: 270px;
            height: 16px;
          }
        }
        .result-content {
          display: flex;
          flex-direction: column;
          // align-items: center;
          // justify-content: space-between;
          #chart {
            width: 330px;
            height: 330px;
            margin: -20px auto -20px;
          }
          .pingyu {
            // width: 100px;
            margin-top: -25px;
            font-size: 14px;
            color: #062f87;
            letter-spacing: 1px;
            text-indent: 2em;
          }
        }
      }
      .other {
        width: 360px;
        // margin: 20px auto 0;
        display: flex;
        justify-content: space-between;
        .left {
          width: 160px;
          height: 70px;
          padding: 0 10px;
          border: 3px solid #062f87;
          border-radius: 0 0 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          span {
            font-size: 15px;
            color: #062f87;
          }
        }
        .left1 {
          position: relative;
          img {
            position: absolute;
            width: 145px;
            height: 60px;
            left: 0;
            top: 10px;
          }
        }
        .right {
          width: 180px;
          height: 70px;
          padding: 0 10px;
          border: 3px solid #f0a818;
          background-color: #f0a818;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #fff;
          border-radius: 0 0 10px 10px;
          .lf {
            font-size: 14px;
            font-weight: 600;
            display: flex;
            flex-direction: column;
          }
          .md {
            font-size: 38px;
            font-weight: bold;
          }
          .rg {
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .box-content {
        width: 350px;
        // margin: 20px auto 0;
        display: flex;
        justify-content: space-between;
        .box-small {
          width: 160px;
          padding: 4px;
          border: 2px solid #062f87;
          border-radius: 0 0 10px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .small-title {
            height: 20px;
            background-color: #062f87;
            font-size: 12px;
            font-weight: 600;
            color: #fcd700;
            line-height: 20px;
            text-align: center;
          }
          .tushi {
            padding: 3px 15px;
            border: 1px solid #062f87;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            // align-items: center;
            // justify-content: space-around;
            margin: 10px 0;
            .shiji {
              display: flex;
              align-items: center;
              div {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #fcd700;
              }
              span {
                color: #fcd700;
                font-size: 12px;
                margin-left: 10px;
              }
            }
            .pingjun {
              display: flex;
              align-items: center;
              div {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #062f87;
              }
              span {
                color: #062f87;
                font-size: 12px;
                margin-left: 10px;
              }
            }
          }
          .zhanshi {
            display: flex;
            align-items: center;
            justify-content: space-around;
            .left {
              font-size: 14px;
              color: #fcd700;
            }
            img {
              width: 140px;
              height: 190px;
            }
            .right {
              font-size: 14px;
              color: #062f87;
            }
            .basket {
              .lq1 {
                width: 75px;
                height: 95px;
              }
              .lq2 {
                width: 145px;
                height: 90px;
              }
              .lq3 {
                width: 95px;
                height: 90px;
              }
              .lq4 {
                width: 145px;
                height: 95px;
              }
              span {
                font-size: 12px;
                color: #062f87;
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
            font-size: 10px;
            // font-weight: 600;
            color: #062f87;
            text-align: center;
            padding-top: 5px;
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
            width: 160px;
            height: 75px;
            transform: rotate(180deg);
            position: absolute;
            right: 0;
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

