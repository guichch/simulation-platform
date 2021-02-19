<template>
  <div class="show-area">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="卫星列表" name="first">
        <satellite-list></satellite-list>
      </el-tab-pane>
      <el-tab-pane label="系统指标" name="second">
        <system-indicators />
      </el-tab-pane>
      <el-tab-pane label="地球站列表" name="third">
        <earth-list />
      </el-tab-pane>
      <el-tab-pane label="广电业务" name="fourth">
        <broadcasting />
      </el-tab-pane>
      <el-tab-pane label="机船载业务" name="fifth">
        <onboard />
      </el-tab-pane>
      <el-tab-pane label="应急业务" name="sixth">
        <emergency />
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import Broadcasting from './Broadcasting.vue';
import EarthList from './EarthList.vue';
import Emergency from './Emergency.vue';
import Onboard from './Onboard.vue';
import SatelliteList from './SatelliteList.vue';
import SystemIndicators from './SystemIndicators.vue';
import TabControl from './TabControl'
export default {
  components: {
    TabControl,
    SatelliteList,
    SystemIndicators,
    EarthList,
    Onboard,
    Broadcasting,
    Emergency
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
}
</script>

<style>
  .show-area{
    margin: 20px;
    border: 1px solid #0e94ea;
    color: #a1aeb3;
  }

  .el-tabs__item{
    color: #a1aeb3;
    padding: 0 5px !important;
    /* width: 72px; */
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 15px;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }

  .el-tabs .is-active{
    background-color: #409eff;
    color: white;
    border-color: white;
  }

  .el-tabs__nav-wrap::after{
    height: 1px;
  }

  .el-tabs__active-bar{
    height: 0;
  }

  .el-tabs__nav-prev,
  .el-tabs__nav-next
  {
    height: 28px;
    line-height: 28px;
  }
</style>