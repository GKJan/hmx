<template>
  <div class="wx-container">
    <div class="buttons">
      <el-button type="info" icon="el-icon-refresh-left" @click="$router.go(-1)">返回</el-button>
      <div style="margin: 10px 0;"></div>
      <el-button type="success" icon="el-icon-takeaway-box" @click="handlePrint">导出PDF</el-button>
    </div>
    <div class="wrapper" id="content">
      <div class="info">
        <img src="../../assets/pc/小鹅通评估报告pc端-02.png">
        <div class="text">
          <span class="text1">{{ info.name }}</span>
          <span class="text2">{{ info.sex === 1 ? '男' : '女' }}</span>
          <div class="text3">{{ info.birthday }}</div>
          <span class="text4">{{ info.createTime && info.createTime.substring(0,10) }}</span>
          <span class="text5">{{ info.age }}</span>
        </div>
      </div>
      <div class="swipe-item">
        <div class="header">
          <img src="../../assets/wx/小鹅通评估报告-06.png">
        </div>
        <div class="content">
          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-05.png" class="title">
            <div class="detail">
              <template v-if="info.height < info.hightAvg">
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-39.png">
                  <img v-else src="../../assets/wx/小鹅通评估报告-36.png">
                  <span class="tushitext wdsg1">{{ info.height }}cm</span>
                  <span class="tushitext pjsg1">{{ info.hightAvg }}cm</span>
                </div>
              </template>
              <template v-else-if="info.height > info.hightAvg">
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-41.png">
                  <img v-else src="../../assets/wx/小鹅通评估报告-37.png">
                  <span class="tushitext wdsg2">{{ info.height }}cm</span>
                  <span class="tushitext pjsg2">{{ info.hightAvg }}cm</span>
                </div>
              </template>
              <template v-else>
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-40.png">
                  <img v-else src="../../assets/wx/小鹅通评估报告-38.png">
                  <span class="tushitext wdsg3">{{ info.height }}cm</span>
                  <span class="tushitext pjsg3">{{ info.hightAvg }}cm</span>
                </div>
              </template>
              <div class="desc">
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.heightScore < 3">
                  数据显示幼儿身高偏低，建议咨询相关生长发育的专家及教师，注重幼儿营养均衡，定期保证幼儿一定量和强度的运动，建议晚间9-10点必须入睡，保证优质睡眠。
                </div>
                <div class="text" v-else-if="info.heightScore === 3">
                  幼儿身高处于正常发育水平，但如果想让孩子长高，注重幼儿营养均衡，定期保证幼儿一定量和强度的运动，建议晚间9-10点必须入睡，保证优质睡眠。
                </div>
                <div class="text" v-else>
                  幼儿处于身体发育比较好的水平，但也不能大意，因为幼儿时期决定不了成年后的身高，如果有营养及体育锻炼，才能保障孩子打下坚实的基础。希望继续保持良好的作息、运动和饮食习惯。
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-06.png" class="title">
            <div class="detail">
              <!-- <template v-if="info.ibm < info.bmiAvg">
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-43.png" class="shengao">
                  <img v-else src="../../assets/wx/小鹅通评估报告-46.png" class="shengao">
                  <span class="tushitext wdtz1">{{ info.ibm }}</span>
                  <span class="tushitext pjtz1">{{ info.bmiAvg }}</span>
                </div>
              </template>
              <template v-else-if="info.info > info.bmiAvg">
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-44.png" class="shengao">
                  <img v-else src="../../assets/wx/小鹅通评估报告-47.png" class="shengao">
                  <span class="tushitext wdtz2">{{ info.ibm }}</span>
                  <span class="tushitext pjtz2">{{ info.bmiAvg }}</span>
                </div>
              </template>
              <template v-else>
                <div class="tushi">
                  <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-45.png" class="shengao">
                  <img v-else src="../../assets/wx/小鹅通评估报告-48.png" class="shengao">
                  <span class="tushitext wdtz3">{{ info.ibm }}</span>
                  <span class="tushitext pjtz3">{{ info.bmiAvg }}</span>
                </div>
              </template> -->
              <div class="method">
                <span>计算公式：</span>
                <img src="../../assets/img/method.png">
              </div>
              <div class="desc" style="width: 30vw;">
                <div class="label">
                  <div class="part">
                    <div class="point1"></div>
                    <span class="span1">实际测量：{{ info.ibm }}</span>
                  </div>
                  <div class="part">
                    <div class="point2"></div>
                    <span class="span2">全国平均值：{{ info.bmiAvg }}</span>
                  </div>
                  <!-- <div class="part">
                    <div class="point1"></div>
                    <span class="span2">计算结果：{{ bmiResult }}(计算公式 体重kg/身高m的平方)</span>
                  </div> -->
                </div>
                <div class="text" v-if="info.ibmScore === 1">
                  特别注意一个警惕信号，如果孩子没有病态并导致这个情况，要么孩子过胖、要么过廋，过胖唯一解决孩子的方式是少吃多动，建立合理的饮食，少摄入脂肪，多进行一些有氧运动。过廋是因为身体的吸收能量过少导致，适当的运动可以让孩子身体机能活力增强，新陈代谢加快，促进胃腺的活动，增加孩子饥饿感，并增强食欲。
                </div>
                <div class="text" v-else-if="info.ibmScore === 3">
                  身体发育正常，但与正常值有点偏，建议加强运动，合理饮食，保证良好的作息习惯，使身体肌肉的质量增加，增强协调性和灵敏性，是幼儿时期最重要的砝码。
                </div>
                <div class="text" v-else>
                  体态非常优秀，希望继续保持，保持良好的饮食习惯和睡眠习惯，有规律的进行周期性运动。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swipe-item">
        <div class="header">
          <img src="../../assets/wx/小鹅通评估报告-15.png">
        </div>
        <div class="content">
          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-08.png" class="title">
            <div class="detail">
              <template v-if="info.legs < info.legsAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-29.png" class="liliang">
                  <span class="tushitext wdll1">孩子成绩：{{ info.legs }}cm</span>
                  <span class="tushitext pjll1">全国平均值：{{ info.legsAvg }}cm</span>
                </div>
              </template>
              <template v-else-if="info.legs > info.legsAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-30.png" class="liliang">
                  <span class="tushitext wdll2">孩子成绩：{{ info.legs }}cm</span>
                  <span class="tushitext pjll2">全国平均值：{{ info.legsAvg }}cm</span>
                </div>
              </template>
              <template v-else>
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-31.png" class="liliang">
                  <span class="tushitext wdll3">孩子成绩：{{ info.legs }}cm</span>
                  <span class="tushitext pjll3">全国平均值：{{ info.legsAvg }}cm</span>
                </div>
              </template>
              <div class="desc">
                <div class="name">测试手段：立定跳远</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.legsScore < 3">
                  数据显示幼儿下肢力量偏低，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏，定期进行下肢力量的测试。
                </div>
                <div class="text" v-else-if="info.legsScore === 3">
                  幼儿下肢力量数据处于中等水平，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏进行下肢力量的提升。
                </div>
                <div class="text" v-else>
                  幼儿处于下肢力量发育比较好的水平，希望继续保持良好的运动习惯、运动和饮食习惯。
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-09.png" class="title">
            <div class="detail">
              <template v-if="info.szLimb < info.limbAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-29.png" class="liliang">
                  <span class="tushitext wdll1">孩子成绩：{{ info.szLimb }}m</span>
                  <span class="tushitext pjll1">全国平均值：{{ info.limbAvg }}m</span>
                </div>
              </template>
              <template v-else-if="info.szLimb > info.limbAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-30.png" class="liliang">
                  <span class="tushitext wdll2">孩子成绩：{{ info.szLimb }}m</span>
                  <span class="tushitext pjll2">全国平均值：{{ info.limbAvg }}m</span>
                </div>
              </template>
              <template v-else>
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-31.png" class="liliang">
                  <span class="tushitext wdll3">孩子成绩：{{ info.szLimb }}m</span>
                  <span class="tushitext pjll3">全国平均值：{{ info.limbAvg }}m</span>
                </div>
              </template>
              <div class="desc">
                <div class="name">测试手段：网球掷远</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.limbScore < 3">
                  数据显示幼儿上肢力量偏低，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂、推小车等多种上肢力量性游戏，定期进行上肢力量的测试。
                </div>
                <div class="text" v-else-if="info.limbScore === 3">
                  幼儿上肢力量数据处于中等水平，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂等玩多种上肢力量性游戏。
                </div>
                <div class="text" v-else>
                  幼儿处于上肢力量发育比较好的水平，希望继续保持良好的运动习惯、开发多种上肢力量性练习，运动和饮食习惯。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swipe-item">
        <div class="header">
          <img src="../../assets/wx/小鹅通评估报告-15.png">
        </div>
        <div class="content">
          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-10.png" class="title">
            <div class="detail">
              <div class="tushi">
                <img src="../../assets/wx/测量时间.png" class="shijian">
                <div class="tushitext wdsj">
                  <span>我的时间</span>
                  <span>{{ info.coordinate }}秒</span>
                </div>
                <div class="tushitext pjsj">
                  <span>全国平均值</span>
                  <span>{{ info.coordinateAvg }}秒</span>
                </div>
              </div>
              <div class="desc">
                <div class="name">测试手段：双脚连续跳</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.coordinateScore < 3">
                  数据显示幼儿协调性数据偏低，建议定期保证幼儿进行上肢一定相关协调性开发的运动，例如打篮球、踢毽子、跳格子、跳绳等协调性的开发，并且定期进行协调性的测试。
                </div>
                <div class="text" v-else-if="info.coordinateScore === 3">
                  幼儿协调性数据处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如打篮球、踢毽子、跳格子、跳绳等协调性的运动。
                </div>
                <div class="text" v-else>
                  幼儿处于协调性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与协调性相关的游戏练习。
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-12.png" class="title">
            <div class="detail">
              <div class="tushi">
                <img src="../../assets/wx/测量时间.png" class="shijian">
                <div class="tushitext wdsj">
                  <span>我的时间</span>
                  <span>{{ info.balance }}秒</span>
                </div>
                <div class="tushitext pjsj">
                  <span>全国平均值</span>
                  <span>{{ info.balanceAvg }}秒</span>
                </div>
              </div>
              <div class="desc">
                <div class="name">测试手段：走平衡木</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.balanceScore < 3">
                  数据显示幼儿平衡能力偏弱，建议定期保证幼儿进行一系列有关平衡性的运动，例如走独木庄、单脚站立、单脚跳、走台阶等平衡能力的游戏，并且定期进行平衡性的测试。
                </div>
                <div class="text" v-else-if="info.balanceScore === 3">
                  幼儿平衡能力处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如走独木庄、单脚站立、单脚跳、走台阶等平衡能力的游戏运动。
                </div>
                <div class="text" v-else>
                  幼儿处于平衡能力处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与平衡能力相关的游戏练习。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swipe-item">
        <div class="header">
          <img src="../../assets/wx/小鹅通评估报告-15.png">
        </div>
        <div class="content">
          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-13.png" class="title">
            <div class="detail">
              <template v-if="info.flexibility < info.flexibilityAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-29.png" class="liliang">
                  <span class="tushitext wdll1">孩子成绩：{{ info.flexibility }}cm</span>
                  <span class="tushitext pjll1">全国平均值：{{ info.flexibilityAvg }}cm</span>
                </div>
              </template>
              <template v-else-if="info.flexibility > info.flexibilityAvg">
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-30.png" class="liliang">
                  <span class="tushitext wdll2">孩子成绩：{{ info.flexibility }}cm</span>
                  <span class="tushitext pjll2">全国平均值：{{ info.flexibilityAvg }}cm</span>
                </div>
              </template>
              <template v-else>
                <div class="tushi">
                  <img src="../../assets/wx/小鹅通评估报告-31.png" class="liliang">
                  <span class="tushitext wdll3">孩子成绩：{{ info.flexibility }}cm</span>
                  <span class="tushitext pjll3">全国平均值：{{ info.flexibilityAvg }}cm</span>
                </div>
              </template>
              <div class="desc">
                <div class="name">测试手段：坐位体前屈</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.flexibilityScore < 3">
                  数据显示幼儿柔韧性偏弱，建议定期保证幼儿进行一系列有关柔韧性的运动，例如关节拉伸的节奏操、操节运动等音乐游戏，也可以游戏化的进行不负重的关节拉伸锻炼，并且定期进行平衡性的测试。
                </div>
                <div class="text" v-else-if="info.flexibilityScore === 3">
                  幼儿柔韧性处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如关节拉伸的节奏操、操节运动等音乐游戏。
                </div>
                <div class="text" v-else>
                  幼儿柔韧性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与柔韧能力相关的游戏练习。
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="../../assets/pc/小鹅通评估报告pc端-13.png" class="title">
            <div class="detail">
              <div class="tushi">
                <img src="../../assets/wx/测量时间.png" class="shijian">
                <div class="tushitext wdsj">
                  <span>我的时间</span>
                  <span>{{ info.sensitives }}秒</span>
                </div>
                <div class="tushitext pjsj">
                  <span>全国平均值</span>
                  <span>{{ info.sensitiveAvg }}秒</span>
                </div>
              </div>
              <div class="desc">
                <div class="name">测试手段：10米折返跑</div>
                <div class="label">
                  <div class="point1"></div>
                  <span class="span1">实际测量</span>
                  <div class="point2"></div>
                  <span class="span2">全国平均值</span>
                </div>
                <div class="text" v-if="info.sensitiveScore < 3">
                  数据显示幼儿灵敏性偏弱，建议定期保证幼儿进行一系列有关灵敏性的运动，例如猫捉老鼠、跳格子、追逐类的游戏，并且定期进行灵敏性的测试。
                </div>
                <div class="text" v-else-if="info.sensitiveScore === 3">
                  幼儿灵敏性处于中等水平，建议继续保持幼儿进行一系列有关灵敏性的运动，例如猫捉老鼠、跳格子、追逐类的游戏。
                </div>
                <div class="text" v-else>
                  幼儿灵敏性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与灵敏能力相关的游戏练习。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="swipe-item result-item">
        <div class="header">
          <img src="../../assets/wx/小鹅通评估报告-27.png">
        </div>
        <div class="result">
          <div class="left-part">
            <div class="top">
              <span>身高：{{ info.height }}cm</span>
              <span>BIM：{{ info.ibm }}kg</span>
              <span>下肢力量：{{ info.legs }}cm</span>
              <span>上肢力量：{{ info.szLimb }}cm</span>
              <span>协调性：{{ info.coordinate }}秒</span>
              <span>平衡性：{{ info.balance }}秒</span>
              <span>柔韧性：{{ info.flexibility }}cm</span>
              <span>灵敏性：{{ info.sensitives }}秒</span>
            </div>
            <div class="bottom">
              <div class="left">
                <span>八项总成绩：</span>
                <span>(满分：40分)</span>
              </div>
              <div class="middle">{{ total }}</div>
              <div class="right">分</div>
            </div>
          </div>
          <div class="right-part">
            <img src="../../assets/wx/小鹅通评估报告-28.png" class="shijian">
            <div id="chart"></div>
            <div class="pingyu">
              <!-- <p>教练评语：</p> -->
              <span>{{ pingyu }}</span>
            </div>
          </div>
        </div>
        <div class="logo">
          <img src="../../assets/wx/玩转开启-49.png">
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
      info: {},
      total: 0,
      infoData: []
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
      if (this.total >= 34) {
        return '幼儿身体素质发展水平非常优秀，灵敏协调性以及柔韧及反应能力非常棒，希望继续保持锻炼，在空余时间可以陪孩子参加各种各样的体育游戏活动。'
      }
      if (this.total >= 28 && this.total <= 33) {
        return '幼儿身体素质发展水平处于正常水平，并且身体素质的综合性较好，希望继续保持孩子的运动，尽可能在额外的时间增加多项运动的练习，保护好孩子对运动的兴趣。'
      }
      if (this.total >= 22 && this.total <= 27) {
        return '幼儿身体素质发展整体不错，但根据数据显示，孩子的部分身体素质有较大的提升空间，建议多让孩子参加各种各样的体育活动，提升其综合性的身体素质水平。'
      }
      if (this.total >= 16 && this.total <= 21) {
        return '根据测试数据现实，孩子的身体素质存在一些小问题，我们建议可以进一步进行相关的身体素质的测试，以期为了孩子身体素质的正常发展提供有效建议，为了孩子的健康，我们共同努力。'
      }
      if (this.total < 16) {
        return '根据测试数据现实，孩子的身体素质存在很大问题，我们建议进行相关专家咨询，并及时为孩子进行运动的处方、营养的搭配和合理的作息，，并且建议定期到医院进行问诊和咨询，为了孩子的健康，我们共同努力。'
      }
    }
  },

  created () {
    this.api.getDetail({ id: this.$route.query.id }).then(res => {
      this.info = res.data
      this.total = res.data.heightScore + res.data.ibmScore +  res.data.legsScore +  res.data.limbScore +  res.data.coordinateScore +  res.data.balanceScore +  res.data.flexibilityScore +  res.data.sensitiveScore
      this.infoData = [res.data.height, res.data.ibm, res.data.legs, res.data.szLimb, res.data.coordinate, res.data.balance, res.data.flexibility, res.data.sensitives]
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
              {text: '身高', max: 108.5},
              {text: 'BIM', max: 16.55},
              {text: '下肢力量', max: 81},
              {text: '上肢力量', max: 5},
              {text: '协调性', max: 6.8},
              {text: '平衡性', max: 7},
              {text: '柔韧性', max: 11.4},
              {text: '灵敏性', max: 7.6}
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
                        name: '各项成绩'
                    }
                ]
            }
        ]
      })
    }, 500)
  },

  methods: {
    handlePrint () {
      html2Canvas(document.querySelector('#content'), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save('分析报告.pdf')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wx-container {
  // width: 80%;
  // margin: 0 auto;
  // background-image: url('../../assets/wx/底图2.jpg');
  // background-size: 100%;
  // background-repeat: repeat-y;
  .buttons {
    position: fixed;
    padding: 10px 0 20px 20px;
  }
  .wrapper {
    // padding-top: 70px;;
    width: 60vw;
    margin: 0 auto;
    .info {
      height: 86vw;
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
        // position: absolute;
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
    .swipe-item {
      padding: 4vw;
      margin-top: 1vw;
      height: 72vw;
      background-image: url('../../assets/pc/小鹅通评估报告pc端_画板 1 副本 7.png');
      background-size: 100% 100%;
      .header {
        // margin: 0 auto;
        // text-align: center;
        img {
          width: 30vw;
          height: 10vw;
          margin-top: 8vw;
        }
      }
      .content {
        width: 52vw;
        margin: 8vw auto 0;
        .item {
          // padding: 1vw;
          background-color: #fff;
          border-radius: 0 0 15px 15px;
          position: relative;
          margin-bottom: 8vw;
          .title {
            position: absolute;
            top: -7vw;
            width: 52vw;
            height: 9vw;
          }
          .detail {
            padding-top: 4vw;
            padding-bottom: 2vw;
            display: flex;
            justify-content: space-around;
            .tushi {
              width: 9vw;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 9vw;
                height: 12vw;
              }
              .shengao {
                width: 10vw;
              }
              .liliang {
                width: 9vw;
                height: 6vw;
              }
              .shijian {
                width: 3.3vw;
                height: 9vw;
                margin-left: -6vw;
              }
              .tushitext {
                position: absolute;
                font-size: 12px;
                font-weight: 600;
              }
              .wdsg1 {
                top: 0vw;
                left: .5vw;
                color: #304890;
              }
              .pjsg1 {
                top: -1vw;
                right: 0;
                color: #3078c0;
              }
              .wdsg2 {
                top: -1vw;
                left: .5vw;
                color: #304890;
              }
              .pjsg2 {
                top: -0.5vw;
                right: .5vw;
                color: #3078c0;
              }
              .wdsg3 {
                top: -1vw;
                left: .5vw;
                color: #304890;
              }
              .pjsg3 {
                top: -1vw;
                right: 0;
                color: #3078c0;
              }
              .wdtz1 {
                top: -4vw;
                left: 0;
              }
              .pjtz1 {
                top: -3vw;
                right: -1vw;
              }
              .wdtz2 {
                top: -1vw;
                left: 0;
              }
              .pjtz2 {
                top: -4vw;
                right: 0;
              }
              .wdtz3 {
                top: -1vw;
                left: 0;
              }
              .pjtz3 {
                top: -1vw;
                right: 0;
              }
              .wdll1 {
                top: 1.7vw;
                left: 1.3vw;
                color: #304890;
              }
              .pjll1 {
                top: 5.5vw;
                left: 1.8vw;
                color: #3078c0;
              }
              .wdll2 {
                top: 1.9vw;
                left: 2vw;
                color: #304890;
              }
              .pjll2 {
                top: 5.8vw;
                left: 1vw;
                color: #3078c0;
              }
              .wdll3 {
                top: 1.7vw;
                left: 2vw;
                color: #304890;
              }
              .pjll3 {
                top: 5.7vw;
                left: 2vw;
                color: #3078c0;
              }
              .wdsj {
                top: 2vw;
                right: 1vw;
                display: flex;
                flex-direction: column;
                color: #304890;
              }
              .pjsj {
                top: 7.5vw;
                right: 0vw;
                display: flex;
                flex-direction: column;
                color: #3078c0;
              }
            }
            .method {
              display: flex;
              align-items: center;
              span {
                font-size: 14px;
              }
            }
            .desc {
              width: 20vw;
              height: 12vw;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .name {
                text-align: center;
                font-size: 12px;
                color: #304890;
              }
              .label {
                padding: .5vw;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border: 1px solid #304890;
                border-radius: 20px;
                .part {
                  display: flex;
                  align-items: center;
                  span {
                    margin-left: .5vw;
                  }
                }
                .point1 {
                  width: .8vw;
                  height: .8vw;
                  border-radius: 50%;
                  background-color: #304890;
                }
                .span1 {
                  color: #304890;
                  font-size: 14px;
                }
                .point2 {
                  width: .8vw;
                  height: .8vw;
                  border-radius: 50%;
                  background-color: #3078c0;
                }
                .span2 {
                  color: #3078c0;
                  font-size: 14px;
                }
              }
              .text {
                max-height: 8vw;
                overflow-y: auto;
                font-size: 14px;
                color: #304890;
              }
            }
          }
        }
      }
      .result {
        width: 54vw;
        margin: 4vw 0 0;
        display: flex;
        justify-content: space-between;
        .left-part {
          display: flex;
          flex-direction: column;
          .top {
            height: 23.5vw;
            width: 18vw;
            padding: 1vw;
            border-radius: 0 0 15px 15px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            span {
              font-size: 16px;
              font-weight: 600;
              color: #304890;
              padding: .5vw 0;
            }
          }
          .bottom {
            height: 8vw;
            margin-top: 1vw;
            padding: 1vw;
            background-color: #f0a818;
            display: flex;
            align-items: center;
            justify-content: space-around;
            color: #fff;
            border-radius: 15px;
            .left {
              font-size: 16px;
              font-weight: 600;
              display: flex;
              flex-direction: column;
            }
            .middle {
              font-size: 84px;
              font-weight: bold;
            }
            .right {
              font-size: 26px;
              font-weight: 600;
            }
          }
        }
        .right-part {
          width: 32vw;
          height: 32vw;
          margin-top: 4.5vw;
          border-radius: 0 0 15px 15px;
          background-color: #fff;
          position: relative;
          img {
            position: absolute;
            top: -7vw;
            width: 32vw;
            height: 7.5vw;
          }
          #chart {
            margin: -2vw auto 0;
            width: 28vw;
            height: 28vw;
          }
          .pingyu {
            padding: 0 2vw;
            p {
              margin: 0 0 .5vw 0;
              font-size: 16px;
              color: #304890;
              font-weight: 600;
            }
            span {
              font-size: 15px;
              font-weight: 500;
              color: #304890;
            }
          }
        }
      }
      .logo {
        margin: 5vw auto 0;
        text-align: center;
        img {
          width: 32vw;
          height: 5vw;
        }
      }
    }
    .result-item {

    }
  }
}
</style>

