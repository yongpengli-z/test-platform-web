import Vue from "vue";
import Vuex from "vuex";
import {queryStatisticsByProject} from '@/api/statistics'


const actions = {
  getStatistics(context) {
    context.commit('GetStatistics')
  },
  setDateRange(context, value) {
    context.commit("SetDateRange", value)
  }
}
const mutations = {
  async GetStatistics(state) {
    console.log("begin")
    let result = await queryStatisticsByProject(state.startTime,state.endTime, state.projectName)
    console.log('@@@', result)
    state.lineChart.xAxisName = result.data.xaxisName
    let yAxisName = []
    let yAxisValue = []
    for (let i = 0; i < result.data.yaxisValue.length; i++) {
      yAxisName.push(result.data.yaxisValue[i].itemName)
      yAxisValue.push(result.data.yaxisValue[i].itemValue)
    }
    state.lineChart.legendData = yAxisName
    state.lineChart.seriesObj = result.data.yaxisValue
    //build series
    state.lineChart.series=[]
    let seriesTemp= []
    for (let i = 0; i < state.lineChart.seriesObj.length; i++) {
      let seriesItem=  {
        name: state.lineChart.seriesObj[i].itemName,
        type: 'line',
        data: state.lineChart.seriesObj[i].itemValue
      }
      seriesTemp.push(seriesItem)
    }
    state.lineChart.series=seriesTemp
  },
  SetDateRange(state, value) {
    const startDate = parseStrToDate(value[0])
    const endDate = parseStrToDate(value[1])
    console.log("start+end",startDate,endDate)
    state.startTime = startDate
    state.endTime = endDate
  },
  SetProjectName(state,value){
    state.projectName=value
  }
}
const state = {
  startTime: "",
  endTime: "",
  projectName:"towhee",
  lineChart: {
    title: "代码提交统计",
    xAxisName: [],
    legendData: [],
    seriesObj: [],
    series: []
  }
}

const getter = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter
}

function parseStrToDate(dateStr) {
  const myDate = new Date(dateStr)
  const getFullYear = myDate.getFullYear();
  const getMonth = myDate.getMonth() + 1 > 9 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
  const getDay = myDate.getDate() > 9 ? myDate.getDate() : '0' + (myDate.getDate());
  const getHours = myDate.getHours() > 9 ? myDate.getHours() : '0' + (myDate.getHours());
  const getMinutes = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + (myDate.getMinutes());
  const getSeconds = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + (myDate.getSeconds());
  const t = getFullYear + '-' + getMonth + '-' + getDay + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
  return t;
}

