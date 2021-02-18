<template>
  <div class="map-container">
    <router-view></router-view>
    <div id="satellite-name"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .map-container{
    width: 100%;
    height: calc(100vh - 75px);
    /* overflow: hidden; */
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