import request from "@/utils/request";

/*export function queryStatisticsByProject1(day,projectName) {
  return request({
    url: '/statistics/commit/projectList',
    method: 'get',
    params:{day,projectName}
  })
}*/

export const queryStatisticsByProject=(day,projectName)=>request({
    url:'/statistics/commit/projectList',
    method:'get',
    params:{day,projectName}
  }
)
