<template>
  <div id='home-box'>
      <Menu />
      <Tab />
      <Map />
      <foot-status />
      <time-line />
      <chart-panel />
  </div>
</template>

<script>
import Menu from '@/components/common/Menu';
import Tab from '@/components/common/Tab';
import Map from '@/components/map/Map';
import FootStatus from '@/components/common/FootStatus';
import TimeLine from '@/components/timeline/TimeLine.vue';
import ChartPanel from '../components/lefttool/ChartPanel.vue';
export default {
  components: {
    Menu,
    Tab,
    Map,
    FootStatus,
    TimeLine,
    ChartPanel
  }

}
</script>

<style>

</style>