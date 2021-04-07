<template>
  <div class="legend" v-if="isShow" >
    <div class="legend-title">
      <i class="el-icon-minus" @click="legendClick"></i>
      <span>图例</span>
    </div>
    <div class="operator-list">
      <div v-for="(item, index) in operators" :key="index">
        <div class="operator-color" :style="{backgroundColor: item.color}"></div>
        <span>{{item.operator}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operators: [
        {
          operator: 'ChinaSatcom',
          color: 'rgb(172, 60, 40)'
        },
        {
          operator: 'APSTAR',
          color: 'rgb(186, 84, 90)'
        },
        {
          operator: 'ASIASAT',
          color: 'rgb(248, 226, 87)'
        },
        {
          operator: 'Intelsat',
          color: 'rgb(238, 139, 1)'
        },
        {
          operator: 'Eutelsat',
          color: 'rgb(117, 72, 118)'
        },
        {
          operator: 'JSAT',
          color: 'rgb(0, 206, 209)'
        },
        {
          operator: 'SES',
          color: 'rgb(44, 78, 38)'
        },
        {
          operator: 'Telesat',
          color: 'rgb(186, 205, 174)'
        },
      ]
    }
  },
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