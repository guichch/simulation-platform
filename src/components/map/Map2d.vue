<template>
  <div class="leaflet-wrapper">
    <div id="leaflet-containter" class="leaflet-containter"></div>
    <right-panel-tab></right-panel-tab>
    <right-panel></right-panel>
  </div>
</template>
<script>
import RightPanel from '@/components/righttool/RightPanel'
import RightPanelTab from '@/components/righttool/RightPanelTab'
import { initMap } from "@/common/Map/init2dMap";
import initMapEvent from "@/common/Map/init2dMapEvent";
import {
  getSatCollection,
} from "@/common/Map/ElevationLines/satOrbit";
export default {
  name: "Map2D",
  components: {
    RightPanel,
    RightPanelTab
  },
  mounted() {
    // 初始化2d地图
    initMap();

    // 初始化2d地图事件
    initMapEvent(this);

    // 初始化卫星
    getSatCollection("2dmap", this);
  },
};
</script>
<style scoped>
.leaflet-wrapper {
  width: 100%;
  height: 100%;
}
.leaflet-containter {
  width: 100%;
  height: 100%;
  background: #2d3e52;
  position: relative;
}
</style>