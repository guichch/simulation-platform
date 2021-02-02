<template>
  <div class="chart-panel">
    <sat-info></sat-info>
    <all-sat></all-sat>
  </div>
</template>

<script>
import SatInfo from './SatInfo.vue';
import AllSat from './AllSat.vue';
export default {
  components: { SatInfo, AllSat },
};
</script>

<style>
</style>