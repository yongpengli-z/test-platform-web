<template>
  <el-row>
    <el-col :span="24">
      <div ref="chartLine" class="charLineSize"></div>
    </el-col>
  </el-row>
</template>

<script>
import echarts from "echarts";

export default {
  name: "chartLine",
  data() {
    return {
      day: 12,
      projectName: "towhee",
      lineChart: {
        title: "代码提交统计",
        xAxisName: [],
        legendData: [],
        seriesValues: 0,
        seriesObj: [],
        series: []
      }
    }
  },
  methods: {
    async getStatistics(){
      let result = await this.$API.statistics.queryStatisticsByProject(this.day,this.projectName)
      console.log('@@@', result)
      console.log('@@@data',  result.data.yaxisValue)
      this.lineChart.xAxisName = result.data.xaxisName
      let yAxisName=[]
      let yAxisValue=[]
      for (let i = 0; i < result.data.yaxisValue.length; i++) {
        yAxisName.push(result.data.yaxisValue[i].itemName)
        yAxisValue.push(result.data.yaxisValue[i].itemValue)
      }
      this.lineChart.legendData = yAxisName
      this.lineChart.seriesObj = result.data.yaxisValue
      this.generalSeries()
      console.log('yAxisValue',yAxisValue)
      this.drawLineChart()
    },
    drawLineChart() {
      this.chartLine = echarts.init(this.$refs.chartLine)
      this.chartLine.setOption({
        title: {
          text: this.projectName+this.lineChart.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.lineChart.legendData,
          top: '6%'

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
          data: this.lineChart.xAxisName
        },
        yAxis: {
          type: 'value'
        },
        series: this.lineChart.series

      })
    },
    generalSeries(){
      let seriesTemp= []
      for (let i = 0; i < this.lineChart.seriesObj.length; i++) {
        let seriesItem=  {
          name: this.lineChart.seriesObj[i].itemName,
          type: 'line',
          stack: '总量',
          data: this.lineChart.seriesObj[i].itemValue
        }
        seriesTemp.push(seriesItem)
      }
      this.lineChart.series=seriesTemp
    }
  },
  computed:{

  },
  mounted() {
    this.getStatistics()

  }

}
</script>

<style scoped>

.charLineSize {
  width: 100%;
  height: 480px;
}
</style>
