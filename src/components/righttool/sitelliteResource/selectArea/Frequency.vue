<template>
  <div class="frequency">
    <div class="title">
      <span>通信频段</span>
    </div>
    <el-checkbox-group v-model="selectedFrequency">
      <el-checkbox v-for="(item, index) in frequencyList" :label="item" :key="index"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frequencyList: ["C", "Ku", "Ka", "others"],
      selectedFrequency: [],
    };
  },
};
</script>

<style scoped lang='scss'>
.frequency {
  margin-bottom: 20px;
}
.title {
  font-size: 13pt;
  color: white;
  background-color: #063e60;
  width: 90%;
  height: 28px;
  line-height: 28px;
  padding-left: 10px;
}

.el-checkbox-group {
  padding-left: 10px;
  margin: 4px 0;
}

.el-checkbox /deep/ .el-checkbox__label {
  color: #a1aeb3;
  font-size: 16px;
}
</style>