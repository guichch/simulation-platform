<template>
  <div
    class="right-panel"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <sitellite-resource v-if="isSelected"></sitellite-resource>
    <thematic-data v-else></thematic-data>
  </div>
</template>

<script>
import SitelliteResource from "./sitelliteResource/SitelliteResource";
import ThematicData from "./thematicData/ThematicData.vue";
export default {
  components: {
    SitelliteResource,
    ThematicData,
  },
  computed: {
    isSelected() {
      return this.$store.state.rightPanel.isSelected;
    },
    loading() {
      return this.$store.state.rightPanel.loading;
    },
  },
};
</script>

<style scoped>
.right-panel {
  width: 450px;
  height: calc(100vh - 75px);
  /* float: right; */
  background-color: #043551;
  overflow: auto;
  position: absolute;
  z-index: 999;
  top: 75px;
  right: 0;
}
</style>