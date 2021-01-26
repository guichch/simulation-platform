<template>
  <div class="map-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <right-panel></right-panel>
  </div>
</template>

<script>
import RightPanel from '../righttool/RightPanel.vue'
export default {
  components: {
    RightPanel
  }
}
</script>

<style>

</style>