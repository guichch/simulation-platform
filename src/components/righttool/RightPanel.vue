<template>
  <div
    class="right-panel"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <keep-alive>
      <component :is="selectedComponent"></component>
    </keep-alive>
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
    selectedComponent() {
      return this.isSelected ? 'SitelliteResource' : 'ThematicData'
    }
  }
};
</script>

<style scoped lang='scss'>
.right-panel {
  width: 450px;
  height: calc(100vh - 75px);
  background-color: #043551;
  overflow: auto;
  position: absolute;
  z-index: 999;
  top: 75px;
  right: 0;
}
</style>