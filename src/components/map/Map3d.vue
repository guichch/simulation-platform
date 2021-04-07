<template>
  <div class="containter">
    <div id="cesium-containter" class="cesium-containter"></div>
    <right-panel-tab></right-panel-tab>
    <right-panel></right-panel>
  </div>
</template>

<script>
import RightPanel from '@/components/righttool/RightPanel'
import RightPanelTab from '@/components/righttool/RightPanelTab'
import { initMap } from "@/common/Map/init3dMap";
import initMapEvent from "@/common/Map/init3dMapEvent";
import {
  getSatCollection,
} from "@/common/Map/ElevationLines/satOrbit";
export default {
  mounted() {
    // 初始化地图
    initMap();

    // 初始化地图事件
    initMapEvent(this);

    // 初始化卫星
    getSatCollection("3dmap", this);
  },
  components: {
    RightPanel,
    RightPanelTab
  }
};
</script>

<style scoped lang='scss'>
.containter,
.cesium-containter {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cesium-containter /deep/ canvas {
  background: #02182f;
}
</style>