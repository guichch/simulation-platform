<template>
  <div class="satellite-name">
    <span>卫星名称:</span>
    <el-autocomplete
      class="inline-input"
      v-model="selectedSatName"
      :fetch-suggestions="querySearch"
      placeholder="请输入卫星名称(e.g. ChinaSat 16)"
      @select="handleSelect"
      clearable
    ></el-autocomplete>
  </div>
</template>

<script>
import satResource from "@/data/satResource.json";

let timer = null;
export default {
  // data开始
  data() {
    return {
      satList: [],
      selectedSatName: "",
    };
  },
  // data结束

  // 钩子函数
  mounted() {
    satResource.forEach((sat, index) => {
      this.satList.push({});
      this.satList[index].value = sat.satEName;
    });
  },
  // 钩子函数结束

  // methods
  methods: {
    querySearch(queryString, cb) {
      let result = queryString
        ? this.satList.filter(this.createFilter(queryString))
        : [];
      cb(result);
    },
    createFilter(queryString) {
      return (sat) => {
        return sat.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect() {
      window.clearTimeout(timer);
      this.$store.commit("getSelectedSatName", this.selectedSatName);
    },
  },

  // methods结束

  // watch开始
  watch: {
    selectedSatName(newValue) {
      if (!timer) {
        timer = window.setTimeout(() => {
          this.$store.commit("getSelectedSatName", newValue);
        }, 2000);
      } else {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          this.$store.commit("getSelectedSatName", newValue);
        }, 2000);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.satellite-name {
  margin: 30px 0;
}
span {
  color: #6a8be6;
  font: 18px PingFangSC-Regular, PingFang SC;
  margin-right: 10px;
}

.satellite-name /deep/ .el-input__inner {
  background-color: transparent;
  border: none;
  width: 280px;
  color: #a1aeb3;
  border-bottom: 1px solid #a1aeb3;
  font-size: 16px;
  border-radius: 0;
  height: 30px;
}

.satellite-name /deep/ .el-input__inner:focus {
  border-bottom-color: #409eff;
}

.satellite-name /deep/ .el-input__inner::placeholder {
  font-size: 14px;
}
</style>