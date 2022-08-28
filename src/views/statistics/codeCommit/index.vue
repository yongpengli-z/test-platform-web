<template>
  <div class="chart-container">
    <panel-group />
    <chart-line />
  </div>
</template>

<script>
import PanelGroup from "@/views/statistics/codeCommit/components/PanelGroup";
import chartLine from '@/views/statistics/codeCommit/components/chartLine'
export default {
  components: { chartLine,PanelGroup }
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
