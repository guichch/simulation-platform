<template>
  <div class="earth-info" v-if="isShow">
    <div class="title">
      <span>地球站详情</span>
      <i class="el-icon-close right" @click="closeEarthPanel"></i>
    </div>

    <div class="separator"></div>

    <div class="info-panel">
      <div class="eatrh-name">
        {{earthInfo.teleportName}} Teleport
      </div>
      <div class="earth-pic">
        <img :src="'data:image/jpeg;base64,' + earthInfo.teleportPic" v-if="earthInfo.teleportPic" height='150px'>
      </div>
      <el-row>
        <el-col :span='12'><div class="sat-operator">卫星运营商：{{earthInfo.teleportOperator}}</div></el-col>
        <el-col :span='12'><div class="antenna-number">地面站天线数：{{earthInfo.teleportAntennas}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span='12'><div class="earth-latitude">地面站纬度：{{latitude}}</div></el-col>
        <el-col :span='12'><div class="earth-longitude">地面站精度：{{longitude}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span='24'><div class="longitude-range">精度范围：{{earthInfo.teleportVisibleArc}}</div></el-col>
      </el-row>

      <p class="connect-satellite">
        可连接卫星：{{earthInfo.teleportSatellites}}
      </p>

      <p class="sat-server">
        卫星服务：{{earthInfo.teleportService}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShow() {
      return this.$store.state.leftPanel.isShowEarthPanel
    },
    earthInfo() {
      return this.$store.state.leftPanel.earthPanelParams
    },
    latitude() {
      if (this.earthInfo.teleportLatitude > 0) {
        return this.earthInfo.teleportLatitude + '°N'
      } else if (this.earthInfo.teleportLatitude < 0) {
        return -this.earthInfo.teleportLatitude + '°S'
      } else {
        return 0
      }
    },
    longitude() {
      if (this.earthInfo.teleportLongitude > 0) {
        return this.earthInfo.teleportLongitude + '°E'
      } else if (this.earthInfo.teleportLongitude < 0) {
        return -this.earthInfo.teleportLongitude + '°W'
      } else {
        return 0
      }
    },
  },

  //method 开始
  methods: {
    closeEarthPanel() {
      this.$store.commit('endEarthPanel')
    }
  } 
}
</script>

<style scoped lang='scss'>
  .earth-info {
    position: fixed;
    z-index: 999;
    left: 10%;
    top: 10%;
    width: 520px;
    height: 550px;
    background-color: rgba(6, 29, 57, 0.7);
    border: 1px solid #fff;
    color: #fff;
    padding: 0 10px;
    .title {
      height: 30px;
      line-height: 30px;
    }
    .separator {
      border: 1px solid white;
      height: 4px;
    }
    .info-panel {
      background-color: #002236;
      padding: 0 5px;
      height: 514px;
      overflow: auto;
      .eatrh-name {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
      }
      .earth-pic {
        height: 150px;
        text-align: center;
      }
      .el-row {
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>