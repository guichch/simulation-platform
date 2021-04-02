<template>
  <div class="map-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div id="satellite-name"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 75px);
}

#satellite-name {
  width: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #063355;
  display: none;
  z-index: 999;
  border: 1px solid #2c6db0;
  text-align: left;
  padding: 5px;
  border-radius: 2px;
  color: #d6dade;
}
</style>