<template>
  <div class="legend-mini" @click="miniClick" v-if="isShow">
    <div class="legend-mini-text">
      图 <br> 例
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShow() {
      return this.$store.state.leftPanel.isShowLegendMini
    }
  },

  methods: {
    miniClick() {
      this.$store.commit('endLegendMini');
      this.$store.commit('startLegend');
    }
  }
}
</script>

<style scoped lang='scss'>
  .legend-mini {
  position: absolute;
  width: 170px;
  height: 0;
  border-width: 0 30px 30px 30px;
  border-style: none solid solid;
  border-color: transparent transparent #043551;
  bottom: 300px;
  left: -65px;
  z-index: 999;
  transform: rotate(90deg);
  cursor: pointer;
  .legend-mini-text {
    color: #fff;
    transform: rotate(-90deg);
    margin-top: -50px;
  }
  }
</style>