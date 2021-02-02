<template>
  <div class="map-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .map-container{
    width: 100%;
    height: calc(100vh - 75px);
    /* overflow: hidden; */
  }
</style>