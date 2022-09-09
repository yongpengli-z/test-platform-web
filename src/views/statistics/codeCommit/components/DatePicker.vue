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
    <el-button type="primary" plain @click="searchByRange">Search</el-button>

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
      dateValue: [new Date(new Date().setDate(new Date().getDate()-20)),new Date()]
    };
  },
  methods:{
    searchByRange(){
      this.$store.dispatch("statistics/setDateRange",this.dateValue)
      this.$store.dispatch("statistics/getStatistics")
    }

  },
  mounted() {
    console.log("dateValue",this.dateValue)
    this.$store.dispatch("statistics/setDateRange",this.dateValue)
  }
}
</script>

<style scoped>

</style>
