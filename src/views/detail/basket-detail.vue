<template>
  <div class="report-container">
    <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button :loading="btnLoading" type="success" icon="el-icon-takeaway-box" @click="handlePrint">导出PDF</el-button>
    </div>
    <div class="wrapper" id="content">
      <div class="info-item">
        <!-- <div class="cover"></div> -->
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
            <!-- <div class="pingjun">
              <div></div>
              <span>全国平均值</span>
            </div> -->
          </div>
          <div class="content">
            <div class="item" v-for="item in compareData" :key="item.my">
              <span>{{ item.name }}：{{ item.my }}{{ item.unit }}</span>
              <div class="compare">
                <template v-if="item.my < item.avg">
                  <div class="top1"></div>
                  <!-- <div class="bottom"></div> -->
                </template>
                <template v-else-if="item.my > item.avg">
                  <div class="top3"></div>
                  <!-- <div class="bottom"></div> -->
                </template>
                <template v-else>
                  <div class="top2"></div>
                  <!-- <div class="bottom"></div> -->
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

      <div class="part-item">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="title">体态测试</div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目1：身高</div>
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
            <div class="zhanshi">
              <span class="left">{{ info.height }}cm</span>
              <template v-if="info.sex === 1">
                <img v-if="info.height < info.hightAvg" src="../../assets/wx/小鹅通评估报告-39.png">
                <img v-else-if="info.height > info.hightAvg" src="../../assets/wx/小鹅通评估报告-41.png">
                <img v-else src="../../assets/wx/小鹅通评估报告-40.png">
              </template>
              <template v-else>
                <img v-if="info.height < info.hightAvg" src="../../assets/wx/小鹅通评估报告-36.png">
                <img v-else-if="info.height > info.hightAvg" src="../../assets/wx/小鹅通评估报告-37.png">
                <img v-else src="../../assets/wx/小鹅通评估报告-38.png">
              </template>
              <span class="right">{{ info.hightAvg }}cm</span>
            </div>
            <div class="text" v-if="info.heightScore < 12">
              数据显示幼儿身高偏低，建议咨询相关生长发育的专家及教师，注重幼儿营养均衡，定期保证幼儿一定量和强度的运动，建议晚间9-10点必须入睡，保证优质睡眠。
            </div>
            <div class="text" v-else-if="info.heightScore >= 16">
              幼儿处于身体发育比较好的水平，但也不能大意，因为幼儿时期决定不了成年后的身高，如果有营养及体育锻炼，才能保障孩子打下坚实的基础。希望继续保持良好的作息、运动和饮食习惯。
            </div>
            <div class="text" v-else>
              幼儿身高处于正常发育水平，但如果想让孩子长高，注重幼儿营养均衡，定期保证幼儿一定量和强度的运动，建议晚间9-10点必须入睡，保证优质睡眠。
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目2：BMI</div>
            <div class="tushi">
              <div class="shiji">
                <div></div>
                <span>实际测量：{{ info.ibm }}</span>
              </div>
              <div class="pingjun">
                <div></div>
                <span>全国平均值：{{ info.bmiAvg }}</span>
              </div>
            </div>
            <div class="zhanshi">
              <div class="method">
                <span>计算公式：</span>
                <img src="../../assets/img/method.png" class="method">
              </div>
            </div>
            <div class="text" v-if="info.ibmScore === 4">
              特别注意一个警惕信号，如果孩子没有病态并导致这个情况，要么孩子过胖、要么过廋，过胖唯一解决孩子的方式是少吃多动，建立合理的饮食，少摄入脂肪，多进行一些有氧运动。过廋是因为身体的吸收能量过少导致，适当的运动可以让孩子身体机能活力增强，新陈代谢加快，促进胃腺的活动，增加孩子饥饿感，并增强食欲。
            </div>
            <div class="text" v-else-if="info.ibmScore === 20">
              体态非常优秀，希望继续保持，保持良好的饮食习惯和睡眠习惯，有规律的进行周期性运动。
            </div>
            <div class="text" v-else>
              身体发育正常，但与正常值有点偏，建议加强运动，合理饮食，保证良好的作息习惯，使身体肌肉的质量增加，增强协调性和灵敏性，是幼儿时期最重要的砝码。
            </div>
          </div>
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
                <span>
                  {{ rallScore }}
                </span>
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
                <span>
                  {{ dsDribbleScore }}
                </span>
              </div>
            </div>
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
                <span>
                  {{ batScore }}
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
                <span>
                  {{ passScore }}
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
                <span>
                  {{ shootScore }}
                </span>
              </div>
            </div>
          </div>
          <div class="right1">
            <img src="../../assets/primary/left1.png">
          </div>
        </div>
        <div class="logo">
          <img src="../../assets/img/basket.png">
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
        if (this.total < 60) {
          return `孩子身体协调能力比全国现年龄段孩子水平偏弱，如长期发展，会对孩子身心健康产生比较大影响。
          （1）合理安排户外运动 10 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，比如简单坐地面滚球、滚球打保龄球；
          （2）让孩子在运动中获得成功喜悦，多鼓励幼儿尝试，前期可以手把手教孩子拍球，每次练习不小于 10 分钟。`
        } else if (this.total > 59 && this.total < 80) {
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
        if (this.total < 60) {
          return `每周适当 2-3 次户外锻炼，有针对性加强身体的爬、走、跑、跳等。
          （1）合理安排户外运动 15 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，让孩子在运动中获得成功喜悦，多鼓励幼儿尝试，前期可以手把手教孩子拍球，每次练习不小于 15 分钟。`
        } else if (this.total > 59 && this.total < 80) {
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
        if (this.total < 60) {
          return '户外运动时，结合篮球游戏，让孩子乐意参与游戏中，切记不能采用机械训练。合理安排户外运动 20 分钟以上，一周不小于 2 次，培训孩子运动兴趣，家长共同参与，比如简单坐地面滚球、滚球打保龄球，让孩子在运动中获得成功喜悦，多鼓励幼儿尝试。'
        } else if (this.total > 59 && this.total < 80) {
          return `行进间运球由慢到快，运球平衡，并且灵活，10 米快速运球一周练习 5-8 次。
          （1）坚持运动让孩子更加自信，乐观，在兴趣基础上，增加运动时长和次数，孩子也越来越健康；
          （2）原地连续拍球 60 以上，增加非优势肢体锻炼，让左右手稳定拍球，左右脑得到有效锻炼，适合增加行进间运球速度，快速并且稳定左右手行进间运球 10 米返回。`
        } else {
          return `结合传球、投篮、运球，有针对性完成篮球作业，多参与篮球比赛活动，让孩子在篮球中找到快乐、自信。
          （1）孩子在运动中表现，及时肯定和表扬，让孩子在运动中找到快乐，快乐运动中，养成运动良好习惯；
          （2）在速度上，一周 2-3 次 10 米行进间运球，练习 3 组。在身体协调上，左右手都稳定拍球 65 个以上，一周练习 2-3 次。在上肢力量，投篮 1.8 米高篮筐，每次练习 3-5 次，每组 10 个。`
        }
      }
    },
    rallScore () {
      if (this.info.type == 1) {
        if (this.info.rallScore >= 4 && this.info.rallScore <= 8) {
          return '数据显示幼儿球感偏低，建意培养幼儿兴趣为主，加强身体的协助性，在家可以采用全蹲体前左右滚球，与家长面对面地滚球，眼睛看目标（球）滚动，每次练习4-6分钟，一周练习2-3次，期待着孩子进步'
        }
        if (this.info.rallScore >= 12 && this.info.rallScore <= 16) {
          return '测试结果幼儿球感处于中等水平，建意以幼儿手眼协助为主，通过胯下滚球，左右手交替协调滚球，坚持有效的练习，相信幼儿会取得更大的进步'
        }
        if (this.info.rallScore == 20) {
          return '测试显示幼儿球感非常优秀，建意每周坚持2-3次的球性练习，幼儿对球感越来越好，每次练习不小于10分钟，希望幼儿取得比较大的进步'
        }
      }
      if (this.info.type == 2) {
        if (this.info.rallScore >= 4 && this.info.rallScore <= 8) {
          return '数据显示幼儿球感偏低，建意培养幼儿兴趣为主，加强身体的协助性，在家可以采用全蹲体前左右滚球，与家长面对面地滚球，眼睛看目标（球）滚动，每次练习5-8分钟，一周练习2-3次，期待着孩子进步'
        }
        if (this.info.rallScore >= 12 && this.info.rallScore <= 16) {
          return '测试结果幼儿球感处于中等水平，建意练习以幼儿手眼协助为主，通过胯下滚球，左右手交替协调滚球，坚持有效的练习，相信幼儿会取得更大的进步'
        }
        if (this.info.rallScore == 20) {
          return '测试显示幼儿球感非常优秀，建意每周坚持2-3次的球性练习，幼儿对球感越来越好，每次练习不小于15分钟，希望幼儿取得比较大的进步'
        }
      }
      if (this.info.type == 3) {
        if (this.info.rallScore >= 4 && this.info.rallScore <= 8) {
          return '数据显示幼儿球感偏低，建意培养幼儿兴趣为主，加强身体的协助性，在家可以采用三绕环，将球围绕脖子、腰、膝盖转圈，眼睛看目标（球）滚动，每次练习5-8分钟，一周练习2-3次，期待着孩子进步'
        }
        if (this.info.rallScore >= 12 && this.info.rallScore <= 16) {
          return '测试结果幼儿球感处于中等水平，建意练习以幼儿手眼协助为主，通过胯下左右手交替8字滚球，坚持有效的练习，相信幼儿会取得更大的进步'
        }
        if (this.info.rallScore == 20) {
          return '测试显示幼儿球感非常优秀，建意每周坚持3-4次的球性练习，幼儿对球感越来越好，每次练习不小于20分钟，希望幼儿取得比较大的进步'
        }
      }
    },
    dsDribbleScore () {
      if (this.info.type == 1) {
        if (this.info.dsDribbleScore >= 4 && this.info.dsDribbleScore <= 8) {
          return '数据显示幼儿原地运球能力偏低，建意培养幼儿成功感，前期家长可以手握幼儿手原地运球，让幼儿找准节奏，再慢慢放手，可采用7号或者5号球，节奏感会更易把握'
        }
        if (this.info.dsDribbleScore >= 12 && this.info.dsDribbleScore <= 16) {
          return '测试结果幼儿原地运球能力处于中等水平，建意幼儿蹲下双手有节奏运球，家长与幼儿互动时，给予幼儿及时肯定，一周练习3-5次，每次能连续拍20下，可采用5号球，有节奏拍起球'
        }
        if (this.info.dsDribbleScore == 20) {
          return '测试显示幼儿原地运球非常优秀，建意坚持每周练习2-3次，连续拍球1分钟以上，拍球范围尽量在直径2米之内'
        }
      }
      if (this.info.type == 2) {
        if (this.info.dsDribbleScore >= 4 && this.info.dsDribbleScore <= 8) {
          return '数据显示幼儿原地运球能力偏低，建意培养幼儿成功感，前期家长可以手握幼儿手进行运球，让幼儿找准节奏，再慢慢放手，可采用5号球，节奏感会更易把握'
        }
        if (this.info.dsDribbleScore >= 12 && this.info.dsDribbleScore <= 16) {
          return '测试结果幼儿原地运球能力处于中等水平，建意幼儿站立两脚打开，双手有节奏运球，家长在与幼儿互动时，给予幼儿及时肯定，一周练习3-4次，每次能连续拍30下，可采用5号球，有节奏拍起球'
        }
        if (this.info.dsDribbleScore == 20) {
          return '测试显示幼儿原地运球非常优秀，建意坚持每周练习3-4次，连续拍球1分钟以上，拍球范围尽量在1-2米之内'
        }
      }
      if (this.info.type == 3) {
        if (this.info.dsDribbleScore >= 4 && this.info.dsDribbleScore <= 8) {
          return '数据显示幼儿原地运球能力偏低，建意培养幼儿成功感，前期幼儿可以蹲下双手有节奏运球，让幼儿找准节奏，再站立双手有节奏运球，采用7号或者5号球，节奏感会更易把握'
        }
        if (this.info.dsDribbleScore >= 12 && this.info.dsDribbleScore <= 16) {
          return '测试显示幼儿原地运球处于中等水平，建意在幼儿原地单手连续运球时，给予幼儿及时肯定，一周练习3-5次，每次能连续拍40下，可采用5号球，有节奏拍起球'
        }
        if (this.info.dsDribbleScore == 20) {
          return '测试显示幼儿原地运球非常优秀，建意坚持每周练习2-3次，连续运球1分钟以上，运球次数每一次都有所增加，运球范围尽量在1米之内'
        }
      }
    },
    batScore () {
      if (this.info.type == 1) {
        if (this.info.batScore >= 4 && this.info.batScore <= 8) {
          return '数据显示幼儿行进间运球水平偏低，建意让幼儿原地熟悉连续拍球30下，可以原地拍一下球，往前走一步，3米能连续运球，5米慢慢增加8米行进间运球'
        }
        if (this.info.batScore >= 12 && this.info.batScore <= 16) {
          return '测试结果幼儿原地运球能力处于中等水平，建意在原地熟悉连续拍球50下，尝试左手/右手，右左手交替运球，以幼儿最快最舒服的运球方式，起来到终点折返运球'
        }
        if (this.info.batScore == 20) {
          return '测试显示幼儿行进间运球非常优秀，建意坚持每周练习2-3次，8米直线行进间运球返回，多采用非优势手行进间运球或者左右手行进间运球'
        }
      }
      if (this.info.type == 2) {
        if (this.info.batScore >= 4 && this.info.batScore <= 8) {
          return '数据显示幼儿行进间运球水平偏低，建意让幼儿原地熟练连续拍球40下，可以原地拍一下球，往前走一步，5米能连续运球，8米慢慢增加10米行进间运球'
        }
        if (this.info.batScore >= 12 && this.info.batScore <= 16) {
          return '测试结果幼儿行进间运球能力处于中等水平，建意在原地熟悉连续拍球60下，尝试左手/右手，右左手交替运球，以幼儿最快最舒服的运球方式，起来到终点折返运球'
        }
        if (this.info.batScore == 20) {
          return '测试显示幼儿行进间运球非常优秀，建意坚持每周练习3-4次，10米直线行进间运球返回，多采用非优势手行进间运球，左右手交替行进间运球'
        }
      }
      if (this.info.type == 3) {
        if (this.info.batScore >= 4 && this.info.batScore <= 8) {
          return '数据显示幼儿行进间运球水平偏低，建意让幼儿原地熟悉连续拍球30下，可以原地拍一下球，往前走一步，5米能连续运球，8米慢慢增加10米行进间绕障碍运球'
        }
        if (this.info.batScore >= 12 && this.info.batScore <= 16) {
          return '测试结果幼儿行进间运球能力处于中等水平，建意在原地熟悉连续拍球50下，尝试左手/右手，右左手交替运球，10米绕障碍运球返回，提高行进间运球稳定性'
        }
        if (this.info.batScore == 20) {
          return '测试显示幼儿行进间运球非常优秀，建意坚持每周练习2-3次，10米行进间绕障碍返回，提升行进间运球速度和稳定性'
        }
      }
    },
    passScore () {
      if (this.info.type == 1) {
        if (this.info.passScore >= 4 && this.info.passScore <= 8) {
          return '数据显示幼儿传球水平偏低，建意朝着目标将球“滚出”，接着朝着目标“抛出”，让幼儿感兴趣，最后家长一周让幼儿练习3-4次'
        }
        if (this.info.passScore >= 12 && this.info.passScore <= 16) {
          return '测试结果幼儿传球能力处于中等水平，建意幼儿近距离击地传球，0.5米慢慢增加1米等，让幼儿掌握接球时机，过度胸前传球，距离由近到远'
        }
        if (this.info.passScore == 20) {
          return '测试显示幼儿传球非常优秀，建意保持一周练习2-3次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标抛/传球'
        }
      }
      if (this.info.type == 2) {
        if (this.info.passScore >= 4 && this.info.passScore <= 8) {
          return '数据显示幼儿传球水平偏低，建意朝着目标将球“滚出”，接着朝着目标“抛出”，让幼儿感兴趣，最后家长一周让幼儿练习3-4次'
        }
        if (this.info.passScore >= 12 && this.info.passScore <= 16) {
          return '测试结果幼儿传球能力处于中等水平，建意幼儿近距离击地传球，1米慢慢增加1.5米等，让幼儿掌握接球时机，过度胸前传球，距离由近到远'
        }
        if (this.info.passScore == 20) {
          return '测试显示幼儿传球非常优秀，建意保持一周练习2-3次，通过胸前传球到贴在墙壁目标，目标由大变小，让传球质量更高有效，目标性更强'
        }
      }
      if (this.info.type == 3) {
        if (this.info.passScore >= 4 && this.info.passScore <= 8) {
          return '数据显示幼儿传球水平偏低，建意朝着目标将球“滚出”，接着朝着目标“抛出”，让幼儿感兴趣，最后家长一周让幼儿练习3-4次'
        }
        if (this.info.passScore >= 12 && this.info.passScore <= 16) {
          return '测试结果幼儿传球能力处于中等水平，建意幼儿近距离击地传球，1.5米慢慢增加2米，让幼儿掌握接球时机，过度胸前传球，距离由近到远'
        }
        if (this.info.passScore == 20) {
          return '测试显示幼儿传球非常优秀，建意保持一周练习2-3次，胸前传球到墙壁目标由大到小，提高传球准确度'
        }
      }
    },
    shootScore () {
      if (this.info.type == 1) {
        if (this.info.shootScore >= 4 && this.info.shootScore <= 8) {
          return '数据显示幼儿原地投篮水平偏低，建意保持一周练习2-3次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标投篮，比如家长举起手，幼儿将球投到家长手上'
        }
        if (this.info.shootScore >= 12 && this.info.shootScore <= 16) {
          return '测试结果幼儿原地投篮处于中等水平，建意让幼儿获得成功喜悦，家长一周2-3次，让幼儿将球投到指点的位置，比如墙壁贴怪兽，让幼儿打怪兽等'
        }
        if (this.info.shootScore == 20) {
          return '测试显示幼儿原地投篮非常优秀，建意保持一周练习2-3次，建意1.4米适合的篮筐，让幼儿定点投篮，注意动作发力点'
        }
      }
      if (this.info.type == 2) {
        if (this.info.shootScore >= 4 && this.info.shootScore <= 8) {
          return '数据显示幼儿原地投篮水平偏低，建意保持一周练习3-4次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标投篮，比如家长举起手，幼儿将球投到家长手上'
        }
        if (this.info.shootScore >= 12 && this.info.shootScore <= 16) {
          return '测试结果幼儿原地投篮处于中等水平，建意让幼儿获得成功喜悦，家长一周3-4次，让幼儿将球投到指点的位置，比如墙壁贴怪兽，让幼儿打怪兽等'
        }
        if (this.info.shootScore == 20) {
          return '测试显示幼儿原地投篮非常优秀，建意保持一周练习3-4次，建意适合的1.6米篮筐，让幼儿定点投篮，注意动作发力点'
        }
      }
      if (this.info.type == 3) {
        if (this.info.shootScore >= 4 && this.info.shootScore <= 8) {
          return '数据显示幼儿原地投篮水平偏低，建意保持一周练习2-3次，适当通过手脚爬、手膝爬等爬行动作，来锻炼上肢力量，再进行有目标投篮，比如家长举起手，幼儿将球投到家长手上'
        }
        if (this.info.shootScore >= 12 && this.info.shootScore <= 16) {
          return '数据显示幼儿原地投篮属于中等水平，建意让幼儿获得成功喜悦，家长一周2-3次，让幼儿将球投到指点的位置，比如墙壁贴怪兽，让幼儿打怪兽等'
        }
        if (this.info.shootScore == 20) {
          return '数据显示幼儿原地投篮能力非常优秀，建意保持一周练习2-3次，建意1.8米适合的篮筐，让幼儿定点投篮，注意动作发力点'
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
          name: '身高', my: res.data.height, avg: res.data.hightAvg, unit: 'cm'
        },
        {
          name: '球感', my: res.data.rall, avg: 3, unit: '个'
        },
        {
          name: '原地运球', my: res.data.dsDribble, avg: 15, unit: '个'
        },
        {
          name: '行进间运球', my: res.data.bat, avg: 30, unit: '秒'
        },
        {
          name: '抛/传球', my: res.data.pass, avg: 3, unit: '个'
        },
        {
          name: '原地投篮', my: res.data.shoot, avg: 2, unit: '个'
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
      .cover {
        width: 420px;
        height: 80px;
        background-color: #fff;
        z-index: 1;
        position: absolute;
        bottom: 420px;
        left: 100px;
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
        left: 580px;
      }
    }
    .part-item {
      height: 1074px;
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
              white-space: nowrap;
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
            width: 400px;
            height: 400px;
            margin: -20px 0 -60px;
          }
          .pingyu {
            width: 280px;
            padding-top: 25px;
            font-size: 18px;
            color: #062f87;
            letter-spacing: 2px;
            text-indent: 2em;
            white-space: pre-line;
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
              display: flex;
              align-items: center;
              img {
                flex-shrink: 0;
              }
              .lq1 {
                width: 80px;
                height: 100px;
              }
              .lq2 {
                width: 160px;
                height: 100px;
              }
              .lq3 {
                width: 110px;
                height: 100px;
              }
              .lq4 {
                width: 155px;
                height: 110px;
              }
              span {
                font-size: 16px;
                color: #062f87;
                margin-left: 10px;
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
            font-size: 14px;
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
            width: 330px;
            height: 130px;
            transform: rotate(180deg);
            position: absolute;
            right: 0;
            right: -35px;
            bottom: 85px;
          }
        }
      }
      .logo {
        margin: 0 auto;
        img {
          width: 330px;
            height: 85px;
        }
      }
    }
  }
}
</style>

