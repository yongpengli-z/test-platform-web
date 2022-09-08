<template>
  <div class="block">
<!--    <span class="demonstration">select date:</span>-->
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="~"
      start-placeholder="StartDate"
      end-placeholder="EndDate"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="primary" plain @click="reSearch">Search</el-button>

  </div>
</template>

<script>
export default {
  name: "DatePicker",
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateValue: []
    };
  },
  methods:{
    reSearch(){
      console.log("dataValue",this.dateValue.slice(0,1))
      const startDate=this.parseStrToDate(this.dateValue.slice(0,1))
      console.log("startDate",startDate)

    },
    parseStrToDate(dateStr){
      const myDate=new Date(dateStr)
      const getFullYear = myDate.getFullYear();
      const getMonth = myDate.getMonth()+1> 9? myDate.getMonth()+1:'0'+(myDate.getMonth()+1);
      const getDay = myDate.getDate() > 9? myDate.getDate():'0'+(myDate.getDate());
      const getHours = myDate.getHours() > 9? myDate.getHours():'0'+(myDate.getHours());
      const getMinutes = myDate.getMinutes() > 9? myDate.getMinutes():'0'+(myDate.getMinutes());
      const getSeconds = myDate.getSeconds() > 9? myDate.getSeconds():'0'+(myDate.getSeconds());
      const t = getFullYear+'-'+getMonth+'-'+getDay+' '+getHours+':'+getMinutes+':'+getSeconds;
      return t;
    }
  }
}
</script>

<style scoped>

</style>
