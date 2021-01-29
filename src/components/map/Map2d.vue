<template>
  <div class="leaflet-wrapper">
    <div id="leaflet-containter" class="leaflet-containter"></div>
    <div id="satellite-name"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import { initMap } from "@/common/Map/init2dMap";
// import initMapEvent from "@/common/Map/init2dMapEvent";
import {
  getSatCollection,
  markersAll,
} from "@/common/Map/ElevationLines/wxOrbital";
export default {
  name: "Map2D",
  components: {
    
  },
  mounted() {
    let mySelf = this;
    // 初始化2d地图
    initMap();

    // 初始化2d地图事件
    // initMapEvent(mySelf);

    // 初始化卫星
    getSatCollection("2dmap");
    markersAll.forEach((marker) => {
      marker.on("click", function (e) {
        console.log(this)
      
        mySelf.$store.commit('startPanel');
        mySelf.$store.commit('setParams', this);
      });
      marker.on("mouseover", function (e) {
        var satNameDiv = document.getElementById("satellite-name");
        satNameDiv.style.display = "block";
        satNameDiv.style.left = e.containerPoint.x + 10 + "px";
        satNameDiv.style.top = e.containerPoint.y + 100 + "px";
        satNameDiv.innerHTML = "卫星名称:" + e.target.options.title;
      });
      marker.on("mouseout", function () {
        var satNameDiv = document.getElementById("satellite-name");
        satNameDiv.style.display = "none";
      });
    });
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