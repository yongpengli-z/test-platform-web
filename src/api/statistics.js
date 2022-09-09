import request from "@/utils/request";

/*export function queryStatisticsByProject1(day,projectName) {
  return request({
    url: '/statistics/commit/projectList',
    method: 'get',
    params:{day,projectName}
  })
}*/

export const queryStatisticsByProject=(startTime,endTime,projectName)=>request({
    url:'/statistics/commit/projectList',
    method:'get',
    params:{startTime,endTime,projectName}
  }
)
