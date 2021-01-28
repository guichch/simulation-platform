<template>
  <div class="right-panel">
    <div
      class="sitellite-resource-container"
      :class="{ active: isSelected }"
      @click="upClick"
    >
      <div class="sitellite-resource-button">卫 <br />星 <br />资 <br />源</div>
    </div>
    <div
      class="thematic-data-container"
      :class="{ active: !isSelected }"
      @click="downClick"
    >
      <div class="thematic-data-button">专<br />题<br />数<br />据</div>
    </div>
  </div>
</template>

<script>
export default {
/*   data() {
    return {
      isSelected: null,
    };
  }, */
  methods: {
    upClick() {
      this.$store.commit('showSitelliteResource');
    },
    downClick() {
      this.$store.commit('showThematicData');
    },
  },

  computed: {
    isSelected() {
      return this.$store.state.isSelected;
    },
  },
};
</script>

<style>
.sitellite-resource-container {
  position: absolute;
  width: 170px;
  height: 0;
  border-width: 0 30px 30px 30px;
  border-style: none solid solid;
  border-color: transparent transparent #043551;
  top: 180px;
  right: 380px;
  z-index: 999;
  transform: rotate(-90deg);
  cursor: pointer;
}

.sitellite-resource-button {
  color: white;
  transform: rotate(90deg);
  margin-top: 23px;
  font-size: 18px;
}
.thematic-data-container {
  position: absolute;
  width: 170px;
  height: 0;
  border-width: 0 30px 30px 30px;
  border-style: none solid solid;
  border-color: transparent transparent #043551;
  top: 350px;
  right: 380px;
  z-index: 999;
  transform: rotate(-90deg);
  cursor: pointer;
}

.thematic-data-button {
  color: white;
  transform: rotate(90deg);
  margin-top: 23px;
  font-size: 18px;
}

.active {
  border-color: transparent transparent #50aeff;
}
</style>