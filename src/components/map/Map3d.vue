<template>
  <div class="containter">
    <div id="cesium-containter" class="cesium-containter"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
/* import { Ion } from "cesium";
import { initMap } from "@/common/Map/init3dMap";
import initMapEvent from "@/common/Map/init3dMapEvent";
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZWNmMTZkYy1jZjQ2LTQ5MmMtYTQzYy0yMTE0NzkzYjlmMjgiLCJpZCI6Mjc5MTEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTAzNzI2NTZ9.lm3cwGvoJzR9xpCvR6mzrI4FyWgMWLwKVfgLN08b8LA"; */
export default {
  mounted() {
    // 初始化地图
    // initMap();
    // 初始化地图事件
    // initMapEvent(this);
  },
};
</script>

<style scoped>
.containter,
.cesium-containter {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* .cesium-containter /deep/ canvas {
  background: #02182f;
} */
</style>