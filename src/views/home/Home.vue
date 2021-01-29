<template>
  <div id="home-box">
    <home-menu />
    <tab />
    <Map />
    <right-panel-tab></right-panel-tab>
    <right-panel />
    <chart-panel />
    <foot-status />
    <time-line />
    
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
import RightPanelTab from '@/components/righttool/RightPanelTab.vue';
export default {
  components: {
    HomeMenu,
    Tab,
    FootStatus,
    TimeLine,
    ChartPanel,
    RightPanel,
    Map,
    RightPanelTab
  }
};
</script>

<style>
  .home-box{
    position: relative;
  }
</style>