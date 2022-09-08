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
  name: "ChartLine",
  data() {
    return {
      day: 12,
      projectName: "towhee",
      lineChart: {
        title: " commit statistics",
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
      this.chartLine.clear()
      this.chartLine.setOption({
        title: {
          text: this.projectName+this.lineChart.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          formatter: function (params) {
            var html = '';
            if (params.length !== 0) {
              // 对应x轴的时间数据  也就是2019-01-01
              // 可以自己打印一下console.info(params[0]);
              var getName = params[0].name;
              html += getName + '<br/>';
              for (var i = 0; i < params.length; i++) {
                // 如果为0 为空的数据我们不要了(你们可以直接判断 > 0)
                if (params[i].value != null && params[i].value !== 0
                  && params[i].value !== '') {
                  // params[i].marker 需要加上，否则你鼠标悬浮时没有样式了
                  html += params[i].marker;
                  html += params[i].seriesName + ': ' + params[i].value + '<br/>';
                }
              }
            }
            return html;
          }
        },
        legend: {
          data: this.lineChart.legendData,
          top: '6%'

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lineChart.xAxisName
        },
        yAxis: {
          type: 'value',
          minInterval: 1 // 只显示整数
        },
        series: this.lineChart.series,
        toolbox: { //可视化的工具箱
          show: true,     //true显示，false隐藏
          feature: {
            dataView: { //数据视图
              show: true
            },
            restore: { //重置
              show: true
            },
            dataZoom: { //数据缩放视图
              show: true
            },
            saveAsImage: {//保存图片
              show: true
            },
            magicType: {//动态类型切换
              type: ['bar', 'line']
            }
          }
        },

      })
    },
    generalSeries(){
      this.lineChart.series=[]
      let seriesTemp= []
      for (let i = 0; i < this.lineChart.seriesObj.length; i++) {
        let seriesItem=  {
          name: this.lineChart.seriesObj[i].itemName,
          type: 'line',
          data: this.lineChart.seriesObj[i].itemValue
        }
        seriesTemp.push(seriesItem)
      }
      this.lineChart.series=seriesTemp
    }
  },
  computed:{

  },
  watch:{
    lineChart:{
      deep:true,
      handler(newValue,oldValue){
        console.log('lineChart改变了',newValue,oldValue)
      }
    }
  },
  mounted() {
    this.getStatistics()
    this.$bus.$on('reSearch',(data)=>{
      console.log('chartLine，收到了数据',data)
      this.projectName=data
      this.getStatistics()
    })
  },
  beforeDestroy() {
    this.$bus.$off('reSearch')
  },

}
</script>

<style scoped>

.charLineSize {
  width: 100%;
  height: 550px;
}
</style>
