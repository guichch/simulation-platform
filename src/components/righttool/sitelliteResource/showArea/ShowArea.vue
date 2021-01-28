<template>
  <div class="show-area">
    <tab-control :tab='tab'></tab-control>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import TabControl from './TabControl'
export default {
  components: {
    TabControl
  },
  data() {
    return {
      tab: ['卫星列表', '系统指标', '地球站列表', '广电业务', '机船载业务', '应急业务']
    }
  }
}
</script>

<style>
  .show-area{
    margin: 20px;
    border: 1px solid #0e94ea;
    /* height: 1000px; */
    color: #a1aeb3;
    /* overflow-x: hidden; */
    /* padding-top: 30px; */
  }
</style>