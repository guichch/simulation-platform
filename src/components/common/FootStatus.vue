<template>
  <div class="foot-status">
    <span class="copyright">版权所有（2021）：中国卫通集团股份有限公司</span>
    <span class="longitude right" v-if="status.isShow">精度：{{status.longitude}}</span>
    <span class="latitude right" v-if="status.isShow">纬度：{{status.latitude}}</span>
  </div>
</template>

<script>
export default {
  computed: {
    status() {
      return this.$store.state.footPanel
    }
  }
}
</script>

<style scoped lang='scss'>
  .foot-status {
    position: absolute;
    height: 20px;
    background-color: #000;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    span {
      color: #fff;
      font-size: 16px;
      line-height: 20px;
    }
    .copyright {
      margin-left: 30%;
    }
  }
</style>