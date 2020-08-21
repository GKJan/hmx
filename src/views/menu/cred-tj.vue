<template>
  <div class="statistic-container">
    <div class="pie-box">
      <div class="title">
        <span>各类型占比统计</span>
      </div>
      <div class="pie-chart" id="classChart"></div>
    </div>
    <div class="pie-box">
      <div class="title">
        <span>各区域占比统计</span>
      </div>
      <div class="pie-chart" id="areaChart"></div>
    </div>
    <div class="pie-box">
      <div class="title">
        <span>男女占比统计</span>
      </div>
      <div class="pie-chart" id="sexChart"></div>
    </div>
    <div class="pie-box">
      <div class="title">
        <span>流失新增占比统计</span>
        <el-date-picker
          v-model="currentYear"
          type="year"
          placeholder="选择年份"
          @change="handleChange">
        </el-date-picker>
      </div>
      <div class="pie-chart" id="yearChart"></div>
    </div>
    <!-- <div class="pie-box">
      <div class="title">
        <span>合格比例</span>
        <div class="filter">
          <el-input-number size="mini" v-model="startAgeHege" controls-position="right" :min="3" :max="10"></el-input-number>
          <span> -- </span>
          <el-input-number size="mini" v-model="endAgeHege" controls-position="right" :min="3" :max="10"></el-input-number>
          <el-button type="primary" size="mini" @click="getCountHege">确定</el-button>
        </div>
      </div>
      <div class="pie-chart" id="hegeChart"></div>
    </div>
    <div class="col-box">
      <div class="title">
        <span>幼儿园各项目合格比例</span>
        <div class="filter">
          <span>年龄段：</span>
          <el-input-number size="mini" v-model="startAge" controls-position="right" :min="3" :max="6"></el-input-number>
          <span> -- </span>
          <el-input-number size="mini" v-model="endAge" controls-position="right" :min="3" :max="6"></el-input-number>
          <el-button type="primary" size="mini" @click="getCountItem">确定</el-button>
        </div>
      </div>
      <div class="col-chart" id="itemChart"></div>
    </div>
    <div class="col-box">
      <div class="title">
        <span>小学各项目合格比例</span>
        <div class="filter">
          <span>年龄段：</span>
          <el-input-number size="mini" v-model="startAgeXx" controls-position="right" :min="7" :max="10"></el-input-number>
          <span> -- </span>
          <el-input-number size="mini" v-model="endAgeXx" controls-position="right" :min="7" :max="10"></el-input-number>
          <el-button type="primary" size="mini" @click="getCountItemXx">确定</el-button>
        </div>
      </div>
      <div class="col-chart" id="xxItemChart"></div>
    </div>
    <div class="line-box">
      <div class="title">
        <span>学员全年增长趋势</span>
        <el-date-picker
          v-model="currentYear"
          type="year"
          placeholder="选择年份"
          @change="handleChange">
        </el-date-picker>
      </div>
      <div class="line-chart" id="xyChart"></div>
    </div> -->
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入图组件
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  data () {
    return {
      typeOptions: [
        {
          label: '幼儿园',
          value: 1
        },
        {
          label: '小学',
          value: 2
        },
        {
          label: '篮球',
          value: 3
        }
      ],
      type: 1,
      currentYear: '',
      startAgeHege: 3,
      endAgeHege: 10,
      startAge: 3,
      endAge: 6,
      startAgeXx: 7,
      endAgeXx: 10
    }
  },

  created () {
    this.currentYear = String(new Date().getFullYear())
    this.getZsCount()
    this.getZsRegionCount()
    this.getZsSexCount()
    this.getZsYearCount(this.currentYear)
  },

  mounted () {
  },

  methods: {
    getZsCount () {
      this.api.getZsCount().then(res => {
        if (res.success) {
          let legend = []
          let data = []
          for (let item of res.data) {
            legend.push(item.categoryName)
            data.push({ name: item.categoryName, value: item.total })
          }
          this.drawPieChart('classChart', legend, '各类型比例', data)
        }
      })
    },

    getZsRegionCount () {
      this.api.getZsRegionCount().then(res => {
        if (res.success) {
          let legend = []
          let data = []
          for (let i in res.data) {
            legend.push(i)
            data.push({ name: i, value: res.data[i] })
          }
          this.drawPieChart('areaChart', legend, '各区域比例', data)
        }
      })
    },

    getZsSexCount () {
      this.api.getZsSexCount().then(res => {
        if (res.success) {
          let data = []
          for (let i in res.data) {
            data.push({ name: i, value: res.data[i] })
          }
          this.drawPieChart('sexChart', ['男', '女'], '男女比例', data)
        }
      })
    },

    getZsYearCount (year) {
      this.api.getZsYearCount({ year: year }).then(res => {
        if (res.success) {
          let data = []
          for (let i in res.data) {
            if (i === 'addInfo') {
              data.push({ name: '新增', value: res.data[i] })
            }
            if (i === 'reduceInfo') {
              data.push({ name: '流失', value: res.data[i] })
            }
          }
          this.drawPieChart('yearChart', ['新增', '流失'], '新增流失比例', data)
        }
      })
    },

    handleChange (val) {
      const year = String(val.getFullYear())
      this.getZsYearCount(year)
    },

    drawPieChart (element, legendData, seriesName, seriesData) {
      let pieChart = echarts.init(document.getElementById(element))
      pieChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          top: 20,
          data: legendData
        },
        series: [
          {
            name: seriesName,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: {
              formatter: '{b} : {c} ({d}%)'
            },
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },

    getCountItem () {
      if (this.endAge < this.startAge) {
        return this.$message.error('请选择正确的年龄范围')
      }
      this.api.getItemCount({ start: this.startAge, end: this.endAge }).then(res => {
        if (res.success) {
          let maleItemCount = [
            // res.data.nanTotal,
            (res.data.nanHeightHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanIbmHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanLegsHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanLimbHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanCoordinateHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanBalanceHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanFlexibilityHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanSensitivesHg/res.data.nanTotal*100).toFixed(2)
          ]
          let femaleItemCount = [
            // res.data.nvTotal,
            (res.data.nvHeightHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvIbmHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvLegsHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvLimbHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvCoordinateHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvBalanceHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvFlexibilityHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvSensitivesHg/res.data.nvTotal*100).toFixed(2)
          ]
          this.drawColChart('itemChart', maleItemCount, femaleItemCount, ['身高', 'BMI', '上肢力量', '下肢力量', '协调性', '平衡性', '柔韧性', '灵敏性'])
        }
      })
    },

    getCountItemXx () {
      if (this.endAgeXx < this.startAgeXx) {
        return this.$message.error('请选择正确的年龄范围')
      }
      this.api.getXxItemCount({ start: this.startAgeXx, end: this.endAgeXx }).then(res => {
        if (res.success) {
          let maleItemCount = [
            // res.data.nanTotal,
            (res.data.nanHeightHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanIbmHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanFeiHlHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanTiaosHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanFlexibilityHg/res.data.nanTotal*100).toFixed(2),
            (res.data.nanSensitivesHg/res.data.nanTotal*100).toFixed(2)
          ]
          let femaleItemCount = [
            // res.data.nvTotal,
            (res.data.nvHeightHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvIbmHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvFeiHlHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvTiaosHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvFlexibilityHg/res.data.nvTotal*100).toFixed(2),
            (res.data.nvSensitivesHg/res.data.nvTotal*100).toFixed(2)
          ]
          this.drawColChart('xxItemChart', maleItemCount, femaleItemCount, ['身高', 'BMI', '肺活量', '跳绳', '柔韧性', '灵敏性'])
        }
      })
    },

    drawColChart (element, maleData, femaleData, xAxisData) {
      let colChart = echarts.init(document.getElementById(element))
      colChart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: '{b}合格比例<br/>{a0}: {c0}%<br/>{a1}: {c1}%'
        },
        legend: {
          top: 10,
          data: ['男生', '女生']
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '男生',
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            },
            data: maleData,
          },
          {
            name: '女生',
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            },
            data: femaleData
          }
        ]
      })
    },

    getCountXueyuan (year) {
      this.api.countYxz({ year: year }).then(res => {
        if (res.success) {
          let xyData = [
            res.data.xyJan,
            res.data.xyFeb,
            res.data.xyMar,
            res.data.xyApr,
            res.data.xyMay,
            res.data.xyJune,
            res.data.xyJuly,
            res.data.xyAug,
            res.data.xySept,
            res.data.xyOct,
            res.data.xyNov,
            res.data.xyDece
          ]
          let fxyData = [
            res.data.fJan,
            res.data.fFeb,
            res.data.fMar,
            res.data.fApr,
            res.data.fMay,
            res.data.fJune,
            res.data.fJuly,
            res.data.fAug,
            res.data.fSept,
            res.data.fOct,
            res.data.fNov,
            res.data.fDece
          ]
          this.drawLineChart('xyChart', xyData, fxyData)
        }
      })
    },

    drawLineChart(element, data1, data2) {
      let lineChart = echarts.init(document.getElementById(element))
      lineChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: ['华蒙星学员', '非学员']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
          {
            name: '华蒙星学员',
            type: 'line',
            stack: '总量',
            data: data1
          },
          {
            name: '非学员',
            type: 'line',
            stack: '总量',
            data: data2
          }
        ]
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.statistic-container {
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .pie-box {
    width: 485px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-bottom: 30px;
    .title {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      span {
        color: #303133;
        font-size: 16px;
      }
    }
    .pie-chart {
      width: 485px;
      height: 485px;
    }
  }
  .col-box {
    width: 1000px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-bottom: 30px;
    .title {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      span {
        color: #303133;
        font-size: 16px;
      }
    }
    .col-chart {
      width: 1000px;
      height: 550px;
    }
  }
  .line-box {
    width: 1000px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-bottom: 30px;
    .title {
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      span {
        color: #303133;
        font-size: 16px;
      }
    }
    .line-chart {
      width: 1000px;
      height: 550px;
    }
  }
}
</style>