<template>
  <div class="operators">
    <div class="title">
      <span>卫星运营商</span>
    </div>
    <el-checkbox-group v-model="checkedOperators">
      <el-row v-for="(row, col) in operators" :key="col">
        <el-col :span="8" v-for="(item, index) in row" :key="index">
          <el-checkbox :label="item"></el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operators: [
        ["ChinaSatcom", "APSTAR", "ASIASAT"],
        ["Intelsat", "Eutelsat", "Telesat"],
        ["SES", "JSAT", "others"],
      ],
      checkedOperators: [],
    };
  },

  // watch开始

  watch: {
    checkedOperators(newValue) {
      this.$store.commit("getSelectedOperator", newValue);
    },
  },

  // watch结束
};
</script>

<style scoped lang='scss'>
.operators {
  margin-bottom: 20px;
}
.title {
  font-size: 13pt;
  color: white;
  padding-left: 10px;
  background-color: #063e60;
  width: 90%;
  height: 28px;
  line-height: 28px;
}
.el-checkbox-group {
  width: 100%;
  padding-left: 12px;
}

.el-row {
  margin: 4px 0;
}

.el-checkbox-group .el-checkbox {
  margin-right: 5px;
}

.el-checkbox /deep/ .el-checkbox__label {
  margin-right: 10px;
  font-size: 16px;
  color: #a1aeb3;
}
</style>