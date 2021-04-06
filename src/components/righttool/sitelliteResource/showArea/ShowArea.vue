<template>
  <div class="show-area">
    <el-tabs v-model="activeName">
      <el-tab-pane label="卫星列表" name="first">
        <satellite-list></satellite-list>
      </el-tab-pane>
      <el-tab-pane label="地球站列表" name="second">
        <earth-list />
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import EarthList from './EarthList.vue';
import SatelliteList from './SatelliteList.vue';
export default {
  components: {
    SatelliteList,
    EarthList
  },
  data() {
    return {
      activeName: 'first'
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