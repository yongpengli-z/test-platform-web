<template>
  <div class="chart-container">
    <panel-group />
    <DatePicker/>
    <chart-line />
  </div>
</template>

<script>
import PanelGroup from '@/views/statistics/codeCommit/components/PanelGroup'
import ChartLine from '@/views/statistics/codeCommit/components/ChartLine'
import DatePicker from "@/views/statistics/codeCommit/components/DatePicker";
export default {
  components: {DatePicker, ChartLine, PanelGroup }
}
</script>

<style scoped>
.chart-container {
  background-color:white;
  height: 100%;
  width: 100%;
}

.el-col {
  padding: 30px;
}
</style>
