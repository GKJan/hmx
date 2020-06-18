<template>
  <div class="wx-container">
    <div class="swipe-item">
      <div class="info">
        <img src="../../assets/wx/封面.png">
        <div class="text">
          <span class="text1">{{ info.name }}</span>
          <span class="text2">{{ info.sex === 1 ? '男' : '女' }}</span>
          <div class="text3">{{ info.birthday }}</div>
          <span class="text4">{{ info.createTime && info.createTime.substring(0,10) }}</span>
          <span class="text5">{{ info.age }}</span>
        </div>
      </div>

      <div class="header">
        <img src="../../assets/wx/zong.png">
      </div>
      <div class="result">
        <div class="left-part">
          <span>八项体质总成绩:</span>
          <span>（满分：100分）</span>
          <div>{{ total }}<span>分</span></div>
        </div>
        <div class="right-part">
          <span>拍球：{{ info.racket }}个</span>
          <span>传球：{{ info.pass }}个</span>
          <span>投篮：{{ info.shoot }}个</span>
        </div>
      </div>
      <div class="result-detail">
        <div class="tags">
          <div class="tag1"></div>
          <span class="text1">实际测量</span>
          <div class="tag2"></div>
          <span class="text2">全国平均值</span>
        </div>
        <div class="items">
          <div class="item-left">
            <span>身高：{{ info.height }}cm</span>
            <span>BMI：{{ info.ibm }}</span>
            <span>下肢力量：{{ info.legs }}cm</span>
            <span>上肢力量：{{ info.szLimb }}m</span>
            <span>协调性：{{ info.coordinate }}秒</span>
            <span>平衡性：{{ info.balance }}秒</span>
            <span>柔韧性：{{ info.flexibility }}cm</span>
            <span>灵敏性：{{ info.sensitives }}秒</span>
          </div>
          <div class="item-right">
            <div class="item" v-for="item in compareData" :key="item.my">
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
      <div class="chart">
        <img src="../../assets/wx/小鹅通评估报告-28.png" class="shijian">
        <div id="chart"></div>
        <div class="pingyu">
          <p>教练评语：</p>
          <span>{{ pingyu }}</span>
        </div>
      </div>
      <div class="logo">
        <img src="../../assets/wx/玩转开启-49.png">
      </div>

      <div class="header">
        <img src="../../assets/wx/小鹅通评估报告-06.png">
      </div>
      <div class="content">
        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-07.png" class="title">
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
          </div>
        </div>

        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-11.png" class="title">
          <div class="detail">
            <!-- <template v-if="info.ibm < info.ibm">
              <div class="tushi">
                <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-43.png">
                <img v-else src="../../assets/wx/小鹅通评估报告-46.png">
                <span class="tushitext wdtz1">{{ info.ibm }}kg</span>
                <span class="tushitext pjtz1">{{ info.ibm }}kg</span>
              </div>
            </template>
            <template v-else-if="info.info > info.ibm">
              <div class="tushi">
                <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-44.png">
                <img v-else src="../../assets/wx/小鹅通评估报告-47.png">
                <span class="tushitext wdtz2">{{ info.ibm }}kg</span>
                <span class="tushitext pjtz2">{{ info.ibm }}kg</span>
              </div>
            </template>
            <template v-else>
              <div class="tushi">
                <img v-if="info.sex === 1" src="../../assets/wx/小鹅通评估报告-45.png">
                <img v-else src="../../assets/wx/小鹅通评估报告-48.png">
                <span class="tushitext wdtz3">{{ info.ibm }}kg</span>
                <span class="tushitext pjtz3">{{ info.ibm }}kg</span>
              </div>
            </template> -->
            <div class="method">
              <span>计算公式:</span>
              <img src="../../assets/img/method.png">
            </div>
            <div class="desc" style="width: 50vw;margin-top: -3vw;">
              <div class="label" style="flex-direction: column;border-radius: 25px;">
                <div class="part">
                  <div class="point1"></div>
                  <span class="span1">实际测量：{{ info.ibm }}</span>
                </div>
                <div class="part">
                  <div class="point2"></div>
                  <span class="span2">全国平均值：{{ info.bmiAvg }}</span>
                </div>
              </div>
              <div class="text" v-if="info.ibmScore === 4">
                特别注意一个警惕信号，如果孩子没有病态并导致这个情况，要么孩子过胖、要么过廋，过胖唯一解决孩子的方式是少吃多动，建立合理的饮食，少摄入脂肪，多进行一些有氧运动。过廋是因为身体的吸收能量过少导致，适当的运动可以让孩子身体机能活力增强，新陈代谢加快，促进胃腺的活动，增加孩子饥饿感，并增强食欲。
              </div>
              <div class="text" v-else-if="info.ibmScore === 12">
                身体发育正常，但与正常值有点偏，建议加强运动，合理饮食，保证良好的作息习惯，使身体肌肉的质量增加，增强协调性和灵敏性，是幼儿时期最重要的砝码。
              </div>
              <div class="text" v-else>
                体态非常优秀，希望继续保持，保持良好的饮食习惯和睡眠习惯，有规律的进行周期性运动。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="header">
        <img src="../../assets/wx/小鹅通评估报告-15.png">
      </div>
      <div class="content">
        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-16.png" class="title">
          <div class="detail">
            <template v-if="info.legs < info.legsAvg">
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-18.png" class="liliang">
                <span class="tushitext wdll1">孩子成绩：{{ info.legs }}cm</span>
                <span class="tushitext pjll1">全国平均值：{{ info.legsAvg }}cm</span>
              </div>
            </template>
            <template v-else-if="info.legs > info.legsAvg">
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-19.png" class="liliang">
                <span class="tushitext wdll2">孩子成绩：{{ info.legs }}cm</span>
                <span class="tushitext pjll2">全国平均值：{{ info.legsAvg }}cm</span>
              </div>
            </template>
            <template v-else>
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-20.png" class="liliang">
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
              <div class="text" v-if="info.legsScore < 6">
                数据显示幼儿下肢力量偏低，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏，定期进行下肢力量的测试。
              </div>
              <div class="text" v-else-if="info.legsScore >= 8">
                幼儿处于下肢力量发育比较好的水平，希望继续保持良好的运动习惯、运动和饮食习惯。
              </div>
              <div class="text" v-else>
                幼儿下肢力量数据处于中等水平，建议定期保证幼儿一定运动的量和强度，多带动幼儿进行跑、跳等动作，玩多种下肢力量性游戏进行下肢力量的提升。
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-17.png" class="title">
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
              <div class="text" v-if="info.limbScore < 6">
                数据显示幼儿上肢力量偏低，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂、推小车等多种上肢力量性游戏，定期进行上肢力量的测试。
              </div>
              <div class="text" v-else-if="info.limbScore >= 8">
                幼儿处于上肢力量发育比较好的水平，希望继续保持良好的运动习惯、开发多种上肢力量性练习，运动和饮食习惯。
              </div>
              <div class="text" v-else>
                幼儿上肢力量数据处于中等水平，建议定期保证幼儿进行上肢一定运动的量和强度，鼓励爸爸多与幼儿进行力量性的互动，多带动幼儿进行投掷、吊爬、悬垂等玩多种上肢力量性游戏。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-22.png" class="title">
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
              <div class="text" v-if="info.coordinateScore < 6">
                数据显示幼儿协调性数据偏低，建议定期保证幼儿进行上肢一定相关协调性开发的运动，例如打篮球、踢毽子、跳格子、跳绳等协调性的开发，并且定期进行协调性的测试。
              </div>
              <div class="text" v-else-if="info.coordinateScore >= 8">
                幼儿处于协调性处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与协调性相关的游戏练习。
              </div>
              <div class="text" v-else>
                幼儿协调性数据处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如打篮球、踢毽子、跳格子、跳绳等协调性的运动。
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-23.png" class="title">
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
              <div class="text" v-if="info.balanceScore < 6">
                数据显示幼儿平衡能力偏弱，建议定期保证幼儿进行一系列有关平衡性的运动，例如走独木庄、单脚站立、单脚跳、走台阶等平衡能力的游戏，并且定期进行平衡性的测试。
              </div>
              <div class="text" v-else-if="info.balanceScore >= 8">
                幼儿处于平衡能力处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与平衡能力相关的游戏练习。
              </div>
              <div class="text" v-else>
                幼儿平衡能力处于中等水平，建议继续保持幼儿相关的运动方式，有条件可以开展例如走独木庄、单脚站立、单脚跳、走台阶等平衡能力的游戏运动。
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-24.png" class="title">
          <div class="detail">
            <template v-if="info.flexibility < info.flexibilityAvg">
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-18.png" class="liliang">
                <span class="tushitext wdll1">孩子成绩：{{ info.flexibility }}cm</span>
                <span class="tushitext pjll1">全国平均值：{{ info.flexibilityAvg }}cm</span>
              </div>
            </template>
            <template v-else-if="info.flexibility > info.flexibilityAvg">
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-19.png" class="liliang">
                <span class="tushitext wdll2">孩子成绩：{{ info.flexibility }}cm</span>
                <span class="tushitext pjll2">全国平均值：{{ info.flexibilityAvg }}cm</span>
              </div>
            </template>
            <template v-else>
              <div class="tushi">
                <img src="../../assets/wx/小鹅通评估报告-20.png" class="liliang">
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
          </div>
        </div>

        <div class="item">
          <img src="../../assets/wx/小鹅通评估报告-25.png" class="title">
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
        </div>
      </div>

      <div class="header">
        <img src="../../assets/wx/小鹅通评估报告pc端-12.png">
      </div>
      <div class="content">
        <div class="item2">
          <img src="../../assets/wx/小鹅通评估报告pc端-09.png">
          <div class="text">
            <p>我的成绩：{{ info.racket }}个，评价：{{ racketScore  }}</p>
            <!-- <p>评价：{{ racketScore  }}</p> -->
            <span v-if="info.racketScore < 24">
              数据显示幼儿拍球能力偏弱，建议开展一系列拍球的游戏，追逐类、比赛类都是拍球熟练的一种练习手段，并且定期为孩子测量拍球的熟练程度测试。
            </span>
            <span v-else-if="info.racketScore >= 40">
              幼儿拍球能力处于发展比较好的水平，希望继续保持良好的运动习惯、继续进行多种与拍球能力相关的游戏练习，注重多种形式的组合，开发非优势肢体的拍球能力。
            </span>
            <span v-else>
              幼儿拍球能力处于中等水平，建议继续保持幼儿进行一系列拍球的游戏，追逐类、比赛类拍球游戏，注重多种形式的组合，开发非优势肢体的拍球能力。
            </span>
          </div>
        </div>

        <div class="item2">
          <img src="../../assets/wx/小鹅通评估报告pc端-10.png">
          <div class="text">
            <p>我的成绩：{{ info.pass }}个，评价：{{ passScore  }}</p>
            <!-- <p>评价：{{ passScore  }}</p> -->
            <span v-if="info.passScore < 18">
              数据显示幼儿传球命中精准度能力偏弱，建议开展一系列传球准确度的游戏，上肢力量锻炼、亲子传球比远和比准活动都是传球命中的一种练习手段，注重幼儿的上肢力量锻炼，并且定期为孩子测量传球精准度。
            </span>
            <span v-else-if="info.passScore >= 30">
              幼儿传球精准度能力处于发展比较好的水平，希望继续保持良好的传球锻炼注重多种技能形式的组合。
            </span>
            <span v-else>
              幼儿传球精准度能力能力处于中等水平，建议继续保持幼儿一系列传球准确度的游戏，上肢力量锻炼、亲子传球比远和比准活动，注重幼儿的上肢力量锻炼。
            </span>
          </div>
        </div>

        <div class="item2">
          <img src="../../assets/wx/小鹅通评估报告pc端-11.png">
          <div class="text">
            <p>我的成绩：{{ info.shoot }}个，评价：{{ shootScore  }}</p>
            <!-- <p>评价：{{ shootScore  }}</p> -->
            <span v-if="info.shootScore < 18">
              数据显示幼儿投篮精准度能力偏弱，建议开展一系列投掷准确度的游戏，投目标、亲子投篮活动都是投篮精准度的一种练习手段，注重幼儿的上肢力量锻炼，并且定期为孩子测量投篮精准度。
            </span>
            <span v-else-if="info.shootScore >= 30">
              幼儿投篮精准度能力处于发展比较好的水平，希望继续保持良好的投篮运动习惯注重多种技能形式的组合。
            </span>
            <span v-else>
              幼儿投篮精准度能力能力处于中等水平，建议继续保持幼儿进行一系列投掷准确度的游戏，投目标、亲子投篮活动都是投篮精准度的一种练习手段，注重幼儿的上肢力量锻炼。
            </span>
          </div>
        </div>
      </div>

      <div class="logo">
        <img src="../../assets/wx/玩转开启-49.png">
      </div>

    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入雷达图组件
require('echarts/lib/chart/radar')
// 引入提示框组件
require('echarts/lib/component/tooltip')

export default {
  data () {
    return {
      info: {},
      total: 0,
      infoData: [],
      indicator: [],
      compareData: []
    }
  },

  computed: {
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
      this.indicator = [
        {text: '身高', max: res.data.hightAvg},
        {text: 'BMI', max: res.data.bmiAvg},
        {text: '下肢力量', max: res.data.legsAvg},
        {text: '上肢力量', max: res.data.limbAvg},
        {text: '协调性', max: res.data.coordinateAvg},
        {text: '平衡性', max: res.data.balanceAvg},
        {text: '柔韧性', max: res.data.flexibilityAvg},
        {text: '灵敏性', max: res.data.sensitiveAvg}
      ]
      this.compareData = [
        {
          my: res.data.height, avg: res.data.hightAvg
        },
        {
          my: res.data.ibm, avg: res.data.bmiAvg
        },
        {
          my: res.data.legs, avg: res.data.legsAvg
        },
        {
          my: res.data.szLimb, avg: res.data.limbAvg
        },
        {
          my: res.data.coordinateAvg, avg: res.data.coordinate
        },
        {
          my: res.data.balanceAvg, avg: res.data.balance
        },
        {
          my: res.data.flexibility, avg: res.data.flexibilityAvg
        },
        {
          my: res.data.sensitiveAvg, avg: res.data.sensitives
        }
      ]
    })
    this.toShare()
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
            radius:'60%',
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
    toShare () {
      const that = this
      const url = window.location.href
      // const url = 'http://tc.huamengxing.com/wx?id=' + this.$route.query.id
      this.api.getShare({ url: url }).then(res => {
        if (res.success) {
          wx.config({
            debug: false, // 开启调试模式
            appId: res.data.appid, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature,// 必填，签名
            jsApiList: [
              'updateAppMessageShareData',//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
              'updateTimelineShareData',//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            ] // 必填，需要使用的JS接口列表
          })
          wx.ready(() => {
            wx.updateAppMessageShareData({
              title: '华蒙星体测报告', // 分享标题
              desc: that.info.name + '-报告详情', // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://tc.huamengxing.com/img/logo.d88d0c87.png', // 分享图标
              success: () => {
              }
            })
            wx.updateTimelineShareData({
              title: '华蒙星体测报告', // 分享标题
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://tc.huamengxing.com/img/logo.d88d0c87.png', // 分享图标(不能赋相对路径，一定要是绝对路径)
              success: () => {
              }
            })
          })
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.wx-container {
  background-image: url('../../assets/wx/底图1.jpg');
  background-size: 100%;
  background-repeat: repeat-y;
  .swipe-item {
    padding: 30px 0;
    .info {
      // height: 86vw;
      // background-image: url('../../assets/pc/小鹅通评估报告pc端_画板 1 副本 6.png');
      // background-size: 100% 100%;
      position: relative;
      text-align: center;
      img {
        // margin-top: 9vw;
        width: 90vw;
        height: 132vw;
        // position: absolute;
      }
      .text {
        width: 50vw;
        // position: absolute;
        bottom: 29vw;
        left: 28vw;
        font-size: 14px;
        font-weight: 600;
        color: #304890;
        position: relative;
        .text2 {
          margin-left: 30vw;
        }
        .text3 {
          position: absolute;
          top: 9vw;
          left: 12vw;
        }
        .text4 {
          position: absolute;
          top: 17vw;
          left: 7vw;
        }
        .text5 {
          position: absolute;
          top: 17vw;
          left: 48vw;
        }
      }
    }
    .header {
      // margin: 0 auto;
      text-align: center;
      img {
        width: 90vw;
        height: 30vw;
      }
    }
    .content {
      width: 90vw;
      margin: 10vw auto 0;
      .item {
        padding: 1vw;
        background-color: #fff;
        border-radius: 0 0 15px 15px;
        position: relative;
        margin-bottom: 6vw;
        .title {
          position: absolute;
          top: -7vw;
          width: 88vw;
          height: 22vw;
        }
        .detail {
          margin-top: 20vw;
          padding-bottom: 5vw;
          display: flex;
          justify-content: space-around;
          .tushi {
            width: 28vw;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 28vw;
              height: 34vw;
            }
            .liliang {
              width: 28vw;
              height: 25vw;
              margin-top: -2vw;;
            }
            .shijian {
              width: 10vw;
              height: 28vw;
              margin-left: -15vw;
            }
            .tushitext {
              position: absolute;
              font-size: 11px;
              white-space: nowrap;
            }
            .wdsg1 {
              top: -2vw;
              left: 1vw;
              color: #F0D800;
              font-weight: 600;
            }
            .pjsg1 {
              top: -4vw;
              right: 0;
              color: #304890;
            }
            .wdsg2 {
              top: -4vw;
              left: 1vw;
              color: #F0D800;
              font-weight: 600;
            }
            .pjsg2 {
              top: -2vw;
              right: 0;
              color: #304890;
            }
            .wdsg3 {
              top: -2vw;
              left: 1vw;
              color: #F0D800;
              font-weight: 600;
            }
            .pjsg3 {
              top: -2vw;
              right: 0;
              color: #304890;
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
              top: -3vw;
              left: 0;
            }
            .pjtz2 {
              top: -4vw;
              right: 0;
            }
            .wdtz3 {
              top: -3vw;
              left: 0;
            }
            .pjtz3 {
              top: -3vw;
              right: 0;
            }
            .wdll1 {
              top: 0;
              left: 0;
              color: #F0D800;
              font-weight: 600;
            }
            .pjll1 {
              top: 16vw;
              left: 0;
              color: #304890;
            }
            .wdll2 {
              top: 0;
              left: 0;
              color: #F0D800;
              font-weight: 600;
            }
            .pjll2 {
              top: 16vw;
              left: 0;
              color: #304890;
            }
            .wdll3 {
              top: 0;
              left: 0;
              color: #F0D800;
              font-weight: 600;
            }
            .pjll3 {
              top: 16vw;
              left: 0;
              color: #304890;
            }
            .wdsj {
              top: 4.5vw;
              right: 2vw;
              display: flex;
              flex-direction: column;
              color: #F0D800;
              font-weight: 600;
            }
            .pjsj {
              top: 22.5vw;
              right: -1vw;
              display: flex;
              flex-direction: column;
              color: #304890;
            }
          }
          .method {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              font-size: 14px;
            }
            img {
              width: 94px;
              height: 50px;
            }
          }
          .desc {
            width: 45vw;
            height: 34vw;
            margin-top: 2vw;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            .name {
              text-align: center;
              font-size: 12px;
              color: #304890;
            }
            .label {
              margin-top: 1vw;
              padding: 1vw;
              display: flex;
              align-items: center;
              justify-content: space-around;
              border: 1px solid #304890;
              border-radius: 15px;
              .part {
                display: flex;
                align-items: center;
                span {
                  margin-left: 1vw;
                }
              }
              .point1 {
                width: 2.5vw;
                height: 2.5vw;
                border-radius: 50%;
                background-color: #F0D800;
              }
              .span1 {
                color: #F0D800;
                font-size: 13px;
              }
              .point2 {
                width: 2.5vw;
                height: 2.5vw;
                border-radius: 50%;
                background-color: #304890;
              }
              .span2 {
                color: #304890;
                font-size: 13px;
              }
            }
            .text {
              margin-top: 1vw;
              max-height: 25vw;
              overflow-y: auto;
              font-size: 12px;
              color: #304890;
            }
          }
        }
      }
      .item2 {
        // height: 54vw;
        // background-image: url('../../assets/wx/小鹅通评估报告pc端-09.png');
        // background-size: 100% 100%;
        padding: 1vw;
        border-radius: 0 0 15px 15px;
        position: relative;
        margin: -6vw 0 6vw;
        img {
          width: 88vw;
          height: 78vw;
        }
        .text {
          width: 78vw;
          position: absolute;
          top: 19vw;
          left: 6vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            font-size: 18px;
            color: #304890;
            font-weight: bold;
            margin: 0 0 .5vw;
          }
          span {
            font-size: 14px;
            color: #304890;
            text-indent: 2em;
          }
        }
      }
    }
    .result {
      width: 90vw;
      margin: 3vw auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right-part {
        width: 48vw;
        height: 22vw;
        padding: 5vw 3vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
        font-weight: 600;
        color: #304890;
        background-color: #fff;
        border-radius: 15px;
        span {
          padding: .5vw 0;
        }
      }
      .left-part {
        width: 28vw;
        height: 26vw;
        padding: 3vw 2vw;
        background-color: #f0a818;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: #fff;
        font-size: 13px;
        border-radius: 15px;
        div {
          font-size: 54px;
          font-weight: bold;
          span {
            font-size: 13px;
            font-weight: normal;
          }
        }
      }
    }
    .result-detail {
      width: 80vw;
      padding: 3vw 5vw;
      margin: 5vw auto 0;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 0 0 15px 15px;
      .tags {
        padding: 1vw;
        margin: 0 auto 2vw;
        display: flex;
        align-items: center;
        border-radius: 15px;
        border: 1px solid #304890;
        font-size: 13px;
        .tag1 {
          width: 6vw;
          height: 1vw;
          background-color: #F0D800;
        }
        .text1 {
          color: #F0D800;
        }
        .tag2 {
          margin-left: 1vw;
          width: 6vw;
          height: 1vw;
          background-color: #304890;
        }
        .text2 {
          color: #304890;
        }
      }
      .items {
        display: flex;
        justify-content: space-between;
        .item-left {
          display: flex;
          flex-direction: column;
          // justify-content: space-around;
          font-size: 14px;
          font-weight: 600;
          color: #304890;
          border-radius: 15px;
          span {
            height: 10vw;
            line-height: 10vw;
            // padding: 1vw 0;
          }
        }
        .item-right {
          display: flex;
          flex-direction: column;
          .item {
            height: 10vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .top1 {
              width: 15vw;
              height: 2vw;
              background-color: #F0D800;
            }
            .top2 {
              width: 18vw;
              height: 2vw;
              background-color: #F0D800;
            }
            .top3 {
              width: 20vw;
              height: 2vw;
              background-color: #F0D800;
            }
            .bottom {
              width: 18vw;
              height: 2vw;
              background-color: #304890;
            }
          }
        }
      }
    }
    .chart {
      width: 88vw;
      padding: 1vw;
      margin: 8vw auto 0;
      position: relative;
      background-color: #fff;
      border-radius: 0 0 15px 15px;
      img {
        position: absolute;
        top: -7vw;
        width: 88vw;
        height: 22vw;
      }
      #chart {
        margin: 14vw auto 0;
        width: 85vw;
        height: 85vw;
      }
      .pingyu {
        padding: 2vw;
        p {
          margin: 0 0 1vw 0;
          font-size: 16px;
          color: #304890;
          font-weight: 600;
        }
        span {
          font-size: 13px;
          color: #304890;
        }
      }
    }
    .logo {
      margin: 5vw auto;
      text-align: center;
      img {
        width: 87vw;
        height: 14vw;
      }
    }
  }
}
</style>

