<template>
  <div class="legend" v-if="isShow" >
    <div class="legend-title">
      <i class="el-icon-minus" @click="legendClick"></i>
      <span>图例</span>
    </div>
    <div class="operator-list">
      <div>
        <div class="operator-color" style="backgroundColor: rgb(172, 60, 40)"></div>
        <span>ChinaSatcom</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(186, 84, 90)"></div>
        <span>APSTAR</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(248, 226, 87)"></div>
        <span>ASIASAT</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(238, 139, 1)"></div>
        <span>Intelsat</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(117, 72, 118)"></div>
        <span>Eutelsat</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(0, 206, 209)"></div>
        <span>JSAT</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(44, 78, 38)"></div>
        <span>SES</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(186, 205, 174)"></div>
        <span>Telesat</span>
      </div>
      <div>
        <div class="operator-color" style="backgroundColor: rgb(240, 230, 140)"></div>
        <span>KT Sat</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShow() {
      return this.$store.state.leftPanel.isShowLegend
    }
  },

  methods: {
    legendClick() {
      this.$store.commit('endLegend');
      this.$store.commit('startLegendMini');
    }
  }
};
</script>

<style scoped lang='scss'>
.legend {
  position: fixed;
  bottom: 300px;
  left: 0;
  z-index: 999;
  color: #fff;
  width: 360px;
  height: 176px;
  
  .legend-title {
    height: 40px;
    line-height: 40px;
    background-color: rgb(8, 66, 104);
    text-align: center;
    border-bottom: 2px solid white;
    i {
      float: right;
      cursor: pointer;
    }
  }
  .operator-list {
    background-color: #002236;
    height: 100%;
    overflow: auto;
    >div {
      line-height: 20px;
      margin: 5px 0;
      padding-left: 10px;
    }
    .operator-color {
      width: 20px;
      height: 20px;
      float: left;
      background-color: #bfa;
    }
  }
}
</style>