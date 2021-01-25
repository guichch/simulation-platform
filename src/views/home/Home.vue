<template>
  <div id="home-box">
    <home-menu></home-menu>
    <Tab />
    <Map />
    <foot-status />
    <time-line />
    <chart-panel />
  </div>
</template>

<script>
import HomeMenu from "./HomeMenu";
import Tab from "@/components/common/Tab";
import Map from "@/components/map/Map";
import FootStatus from "@/components/common/FootStatus";
import TimeLine from "@/components/timeline/TimeLine.vue";
import ChartPanel from "@/components/lefttool/ChartPanel.vue";
export default {
  components: {
    HomeMenu,
    Tab,
    Map,
    FootStatus,
    TimeLine,
    ChartPanel,
  },
};
</script>

<style>

</style>