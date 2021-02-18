<template>
  <div class="leaflet-wrapper">
    <div id="leaflet-containter" class="leaflet-containter"></div>
    <!-- <div id="satellite-name"></div> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import { initMap } from "@/common/Map/init2dMap";
import initMapEvent from "@/common/Map/init2dMapEvent";
import {
  getSatCollection,
} from "@/common/Map/ElevationLines/satOrbit";
export default {
  name: "Map2D",
  components: {
    
  },
  mounted() {
    // 初始化2d地图
    initMap();

    // 初始化2d地图事件
    initMapEvent(this);

    // 初始化卫星
    getSatCollection("2dmap");
  },
};
</script>
<style scoped>
.leaflet-wrapper,
.leaflet-containter {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #2d3e52;
  position: relative;
}

#satellite-name{
  width:auto;
  position:fixed;
  top:0px; 
  left:0px; 
  background-color:#063355; 
  display:none; 
  z-index:9999; 
  border:1px solid #2C6DB0; 
  text-align:left; 
  padding:5px;
  border-radius:2px;
  color:#D6DADE;
}
</style>