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
            <div class="height">
              预测身高：{{ info.resultHeight }}cm
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
          <div class="left">
            <span>拍球：{{ info.racket }}个</span>
            <span>传球：{{ info.pass }}个</span>
            <span>投篮：{{ info.shoot }}个</span>
          </div>
          <div class="right">
            <div class="lf">
              <span>八项体质总成绩：</span>
              <span>(满分：100分)</span>
            </div>
            <div class="md">{{ total }}</div>
            <div class="rg">分</div>
          </div>
        </div>
      </div>

      <div class="part-item">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="title">1.体态测试</div>
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
              幼儿身高处于正常发育水平，若希望孩子有更好发育水平，则需注重幼儿营养均衡，定期保证幼儿适当量与强度的运动，建议晚间9-10点必须入睡，保证优质睡眠。
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
              特别注意一个警惕信号，如果孩子没有病态并导致这个情况，要么孩子过胖、要么过廋，过胖胖解决的办法是少吃多动，建立合理的饮食，少摄入脂肪，多进行一些有氧运动。过廋是因为身体的吸收能量过少导致，适当的运动可以让孩子身体机能活力增强，新陈代谢加快，促进胃腺的活动，增加孩子饥饿感，并增强食欲。
            </div>
            <div class="text" v-else-if="info.ibmScore === 20">
              体态非常优秀，希望继续保持，保持良好的饮食习惯和睡眠习惯，有规律的进行周期性运动。
            </div>
            <div class="text" v-else>
              身体发育正常，但与全国平均值比较有点偏差，建议加强运动，合理饮食，保证良好的作息习惯，使身体肌肉的质量增加，增强协调性和灵敏性，是幼儿时期最重要的砝码。
            </div>
          </div>
        </div>
        <div class="title">2.体质测试</div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目1：下肢力量</div>
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
              <div class="long">
                <img v-if="info.legs > info.legsAvg" src="../../assets/primary/long1.png" class="long1">
                <img v-else-if="info.legs < info.legsAvg" src="../../assets/primary/long1.png" class="long2">
                <img v-else src="../../assets/primary/long1.png" class="long3">
                <span class="left">{{ info.legs }}cm</span>
                <img v-if="info.legs > info.legsAvg" src="../../assets/primary/long2.png" class="long2">
                <img v-else-if="info.legs < info.legsAvg" src="../../assets/primary/long2.png" class="long1">
                <img v-else src="../../assets/primary/long2.png" class="long3">
                <span class="right">{{ info.legsAvg }}cm</span>
              </div>
            </div>
            <div class="cssd">测试手段： 立定跳远</div>
            <div class="text" v-if="info.legsScore < 6">
              数据显示幼儿下肢力量偏低，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏，定期进行下肢力量的测试。
            </div>
            <div class="text" v-else-if="info.legsScore >= 8">
              幼儿处于下肢力量发育比较好的水平，希望继续保持良好的运动习惯和饮食习惯。
            </div>
            <div class="text" v-else>
              幼儿下肢力量数据处于中等水平，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏进行下肢力量的提升。
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目2：上肢力量</div>
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
              <div class="long">
                <img v-if="info.szLimb > info.limbAvg" src="../../assets/primary/long1.png" class="long1">
                <img v-else-if="info.szLimb < info.limbAvg" src="../../assets/primary/long1.png" class="long2">
                <img v-else src="../../assets/primary/long1.png" class="long3">
                <span class="left">{{ info.szLimb }}m</span>
                <img v-if="info.szLimb > info.limbAvg" src="../../assets/primary/long2.png" class="long2">
                <img v-else-if="info.szLimb < info.limbAvg" src="../../assets/primary/long2.png" class="long1">
                <img v-else src="../../assets/primary/long2.png" class="long3">
                <span class="right">{{ info.limbAvg }}m</span>
              </div>
            </div>
            <div class="cssd">测试手段： 网球掷投</div>
            <div class="text" v-if="info.limbScore < 6">
              数据显示幼儿上肢力量偏低，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂、推小车等多种上肢力量性游戏，定期进行上肢力量的测试。
            </div>
            <div class="text" v-else-if="info.limbScore >= 8">
              幼儿处于上肢力量发育比较好的水平，希望继续保持良好的运动习惯、上下肢均衡性练习，和良好饮食与睡眠习惯。
            </div>
            <div class="text" v-else>
              幼儿上肢力量数据处于中等水平，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂等玩多种上肢力量性游戏。
            </div>
          </div>
        </div>
      </div>

      <div class="part-item">
        <div class="header">
          <img src="../../assets/primary/title.png" class="left">
          <img src="../../assets/primary/web.png" class="right">
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目3：协调性</div>
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
              <div class="time">
                <img src="../../assets/primary/time1.png">
                <span class="left">{{ info.coordinate }}s</span>
                <img src="../../assets/primary/time2.png">
                <span class="right">{{ info.coordinateAvg }}s</span>
              </div>
            </div>
            <div class="cssd">测试手段：双脚连续跳</div>
            <div class="text" v-if="info.coordinateScore < 6">
              数据显示幼儿协调性数据偏低，建议定期保证幼儿进行上肢一定相关协调性开发的运动，例如打篮球、踢毽子、跳格子、跳绳等协调性的开发，并且定期进行协调性的测试。
            </div>
            <div class="text" v-else-if="info.coordinateScore >= 8">
              幼儿的协调性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与协调性相关的游戏练习。
            </div>
            <div class="text" v-else>
              幼儿协调性数据处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如打篮球、踢毽子、跳格子、跳绳等协调性的运动。
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目4：平衡性</div>
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
              <div class="time">
                <img src="../../assets/primary/time1.png">
                <span class="left">{{ info.balance }}s</span>
                <img src="../../assets/primary/time2.png">
                <span class="right">{{ info.balanceAvg }}s</span>
              </div>
            </div>
            <div class="cssd">测试手段：走平衡木</div>
            <div class="text" v-if="info.balanceScore < 6">
              数据显示幼儿平衡能力偏弱，建议定期保证幼儿进行一系列有关平衡性的运动，例如走独木桩、单脚站立、单脚跳、走台阶等平衡能力的游戏，并且定期进行平衡性的测试。
            </div>
            <div class="text" v-else-if="info.balanceScore >= 8">
              幼儿平衡能力处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与平衡能力相关的游戏练习。
            </div>
            <div class="text" v-else>
              幼儿平衡能力处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如走独木桩、单脚站立、单脚跳、走台阶等平衡能力的游戏运动。
            </div>
          </div>
        </div>
        <div class="box-content">
          <div class="box-small">
            <div class="small-title">项目5：柔韧性</div>
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
              <div class="long">
                <img v-if="info.flexibility > info.flexibilityAvg" src="../../assets/primary/long1.png" class="long1">
                <img v-else-if="info.flexibility < info.flexibilityAvg" src="../../assets/primary/long1.png" class="long2">
                <img v-else src="../../assets/primary/long1.png" class="long3">
                <span class="left">{{ info.flexibility }}cm</span>
                <img v-if="info.flexibility > info.flexibilityAvg" src="../../assets/primary/long2.png" class="long2">
                <img v-else-if="info.flexibility < info.flexibilityAvg" src="../../assets/primary/long2.png" class="long1">
                <img v-else src="../../assets/primary/long2.png" class="long3">
                <span class="right">{{ info.flexibilityAvg }}cm</span>
              </div>
            </div>
            <div class="cssd">测试手段：坐位体前屈</div>
            <div class="text" v-if="info.flexibilityScore < 6">
              数据显示幼儿柔韧性偏弱，建议定期保证幼儿进行一系列有关柔韧性的运动，例如关节拉伸的节奏操、操节运动等音乐游戏，也可以游戏化的进行不负重的关节拉伸锻炼，并且定期进行平衡性的测试。
            </div>
            <div class="text" v-else-if="info.flexibilityScore >= 8">
              幼儿柔韧性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与柔韧能力相关的游戏练习。
            </div>
            <div class="text" v-else>
              幼儿柔韧性处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如关节拉伸的节奏操、操节运动等音乐游戏。
            </div>
          </div>
          <div class="box-small">
            <div class="small-title">项目6：灵敏性</div>
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
              <div class="time">
                <img src="../../assets/primary/time1.png">
                <span class="left">{{ info.sensitives }}s</span>
                <img src="../../assets/primary/time2.png">
                <span class="right">{{ info.sensitiveAvg }}s</span>
              </div>
            </div>
            <div class="cssd">测试手段：10米折返跑</div>
            <div class="text" v-if="info.sensitiveScore < 6">
              数据显示幼儿灵敏性偏弱，建议定期保证幼儿进行一系列有关灵敏性的运动，例如猫捉老鼠、跳格子、追逐类的游戏，并且定期进行灵敏性的测试。
            </div>
            <div class="text" v-else-if="info.sensitiveScore >= 8">
              幼儿灵敏性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与灵敏能力相关的游戏练习。
            </div>
            <div class="text" v-else>
              幼儿灵敏性处于中等水平，建议继续保持幼儿进行一系列有关灵敏性的运动，例如猫捉老鼠、跳格子、追逐类的游戏。
            </div>
          </div>
        </div>
        <div class="title">篮球技能</div>
        <div class="box-content">
          <div class="box-mini">
            <div class="mini-title">项目一：拍球</div>
            <div class="my-result">我的成绩：{{ info.racket }}个，评价：{{ racketScore  }}</div>
            <div class="pingyu" v-if="info.racketScore < 24">
              数据显示幼儿拍球能力偏弱，建议开展一系列拍球的游戏，追逐类、比赛类都是拍球熟练的一种练习手段，并且定期为孩子测量拍球的熟练程度测试。
            </div>
            <div class="pingyu" v-else-if="info.racketScore >= 40">
              幼儿拍球能力处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与拍球能力相关的游戏练习，注重多种形式的组合，开发非优势肢体的拍球能力。
            </div>
            <div class="pingyu" v-else>
              幼儿拍球能力处于中等水平，建议继续保持幼儿进行一系列拍球的游戏，追逐类、比赛类拍球游戏，注重多种形式的组合，开发非优势肢体的拍球能力。
            </div>
            <img src="../../assets/primary/lq.png">
          </div>
          <div class="box-mini">
            <div class="mini-title">项目二：传球</div>
            <div class="my-result">我的成绩：{{ info.pass }}个，评价：{{ passScore  }}</div>
            <div class="pingyu" v-if="info.passScore < 18">
              数据显示幼儿传球命中精准度能力偏弱，建议开展一系列传球准确度的游戏，上肢力量锻炼、亲子传球比远和比准活动都是传球命中的一种练习手段，注重幼儿的上肢力量锻炼，并且定期为孩子测量传球精准度。
            </div>
            <div class="pingyu" v-else-if="info.passScore >= 30">
              幼儿传球精准度能力处于发展比较好的水平，希望继续保持良好的传球锻炼注重多种技能形式的组合。
            </div>
            <div class="pingyu" v-else>
              幼儿传球精准度能力能力处于中等水平，建议继续保持幼儿一系列传球准确度的游戏，上肢力量锻炼、亲子传球比远和比准活动，注重幼儿的上肢力量锻炼。
            </div>
            <img src="../../assets/primary/lq.png">
          </div>
          <div class="box-mini">
            <div class="mini-title">项目三：投篮</div>
            <div class="my-result">我的成绩：{{ info.shoot }}个，评价：{{ shootScore  }}</div>
            <div class="pingyu" v-if="info.shootScore < 18">
              数据显示幼儿投篮精准度能力偏弱，建议开展一系列投掷准确度的游戏，投目标、亲子投篮活动都是投篮精准度的一种练习手段，注重幼儿的上肢力量锻炼，并且定期为孩子测量投篮精准度。
            </div>
            <div class="pingyu" v-else-if="info.shootScore >= 30">
              幼儿投篮精准度能力处于发展比较好的水平，希望继续保持良好的投篮运动习惯注重多种技能形式的组合。
            </div>
            <div class="pingyu" v-else>
              幼儿投篮精准度能力能力处于中等水平，建议继续保持幼儿进行一系列投掷准确度的游戏，投目标、亲子投篮活动都是投篮精准度的一种练习手段，注重幼儿的上肢力量锻炼。
            </div>
            <img src="../../assets/primary/lq.png">
          </div>
        </div>
        <!-- <img src="../../assets/primary/text.png" class="logo"> -->
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
        return '根据测试数据显示，孩子的身体素质存在很大问题，我们建议进行相关专家咨询，并及时为孩子进行运动的处方、营养的搭配和合理的作息，并且建议定期到医院进行问诊和咨询，为了孩子的健康，我们共同努力。'
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
    this.api.getDetail({ id: this.$route.query.id }).then(res => {
      this.info = res.data
      this.total = res.data.heightScore + res.data.ibmScore +  res.data.legsScore +  res.data.limbScore +  res.data.coordinateScore +  res.data.balanceScore +  res.data.flexibilityScore +  res.data.sensitiveScore
      // this.infoData = [res.data.height, res.data.ibm, res.data.legs, res.data.szLimb, res.data.coordinate, res.data.balance, res.data.flexibility, res.data.sensitives]
      this.infoData = [res.data.heightScore, res.data.ibmScore, res.data.legsScore, res.data.limbScore, res.data.coordinateScore, res.data.balanceScore, res.data.flexibilityScore, res.data.sensitiveScore]
      this.compareData = [
        {
          name: '身高', my: res.data.height, avg: res.data.hightAvg, unit: 'cm'
        },
        {
          name: 'BMI', my: res.data.ibm, avg: res.data.bmiAvg, unit: ''
        },
        {
          name: '下肢力量', my: res.data.legs, avg: res.data.legsAvg, unit: 'cm'
        },
        {
          name: '上肢力量', my: res.data.szLimb, avg: res.data.limbAvg, unit: 'm'
        },
        {
          name: '协调性', my: res.data.coordinate, avg: res.data.coordinateAvg, unit: 's'
        },
        {
          name: '平衡性', my: res.data.balance, avg: res.data.balanceAvg, unit: 's'
        },
        {
          name: '柔韧性', my: res.data.flexibility, avg: res.data.flexibilityAvg, unit: 'cm'
        },
        {
         name: '灵敏性',  my: res.data.sensitives, avg: res.data.sensitiveAvg, unit: 's'
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
              {text: '下肢力量', max: 10},
              {text: '上肢力量', max: 10},
              {text: '协调性', max: 10},
              {text: '平衡性', max: 10},
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
  background-color: #fff;
  padding: 10px;
  .buttons {
    position: fixed;
  }
  .wrapper { // *1.4
    width: 829px;
    margin: 0 auto;
    .info-item {
      height: 1178px;
      background-image: url('../../assets/primary/cover.jpg');
      background-size: 100% 100%;
      position: relative;
      span {
        font-size: 32px;
        // font-weight: 600;
        color: #304890;
        position: absolute;
      }
      .text1 {
        bottom: 555px;
        left: 260px;
      }
      .text2 {
        bottom: 555px;
        left: 600px;
      }
      .text3 {
        bottom: 480px;
        left: 285px;
      }
      .text4 {
        bottom: 405px;
        left: 275px;
        font-size: 30px;
      }
      .text5 {
        bottom: 405px;
        left: 630px;
      }
    }
    .part-item {
      height: 1158px;
      padding-bottom: 20px;
      background-color: #f5f5f5;
      // margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .header {
        width: 799px;
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
          .height {
            font-size: 16px;
            color: #062f87;
            padding: 0 0 10px 20px;
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

