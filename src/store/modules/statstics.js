import Vue from "vue";
import Vuex from "vuex";
import {queryStatisticsByProject} from '@/api/statistics'


const actions={
  getStatistics(context,value){
    console.log(value)
    context.commit('GetStatistics',value)
  }
}
const mutations={
 async GetStatistics(state,value){
    console.log("begin")
    let result = await queryStatisticsByProject(value.day,value.projectName)
    console.log('@@@', result)
    let yAxisName=[]
    let yAxisValue=[]
    for (let i = 0; i < result.data.yaxisValue.length; i++) {
      yAxisName.push(result.data.yaxisValue[i].itemName)
      yAxisValue.push(result.data.yaxisValue[i].itemValue)
    }
    state.lineChart.legendData = yAxisName
    state.lineChart.seriesObj = result.data.yaxisValue
    console.log('state',state)
  }
}
const state={
  lineChart: {
    title: "代码提交统计",
    xAxisName: [],
    legendData: [],
    seriesValues: 0,
    seriesObj: [],
    series: []
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
