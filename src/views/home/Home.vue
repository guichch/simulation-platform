<template>
  <div id="home-box">
    <home-menu />
    <tab />
    <right-panel />
    <Map />
    <foot-status />
    <time-line />
    <chart-panel />
  </div>
</template>

<script>
import HomeMenu from "./HomeMenu";
import Tab from "@/components/common/Tab";
import FootStatus from "@/components/common/FootStatus";
import TimeLine from "@/components/timeline/TimeLine.vue";
import ChartPanel from "@/components/lefttool/ChartPanel.vue";
import RightPanel from '@/components/righttool/RightPanel.vue'
import Map from '@/components/map/Map.vue';
export default {
  components: {
    HomeMenu,
    Tab,
    FootStatus,
    TimeLine,
    ChartPanel,
    RightPanel,
    Map
  }
};
</script>

<style>
  .home-box{
    position: relative;
  }
</style>