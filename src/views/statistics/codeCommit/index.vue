<template>
  <div class="chart-container">
    <panel-group />
    <chart-line />
  </div>
</template>

<script>
import PanelGroup from '@/views/statistics/codeCommit/components/PanelGroup'
import ChartLine from '@/views/statistics/codeCommit/components/ChartLine'
export default {
  components: { ChartLine, PanelGroup }
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
