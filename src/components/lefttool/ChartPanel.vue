<template>
  <div class="chart-panel">    
    <all-sat></all-sat>
    <sat-info></sat-info>
    <sat-info-mini></sat-info-mini>
    <Legend />
    <legend-mini></legend-mini>
  </div>
</template>

<script>
import SatInfo from "./SatInfo.vue";
import AllSat from "./AllSat.vue";
import SatInfoMini from "./SatInfoMini.vue";
import Legend from './Legend'
import LegendMini from './LegendMini.vue';
export default {
  components: { SatInfo, AllSat, SatInfoMini, Legend, LegendMini },
};
</script>

<style>
</style>