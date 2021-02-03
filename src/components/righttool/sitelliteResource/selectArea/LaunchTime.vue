<template>
  <div class="launch-time">
    <div class="title">
      <span>发射时间</span>
    </div>
    <el-date-picker v-model="launchTime[0]" type="date" :picker-options="startPickOptions" @change="startTime" placeholder="开始时间">
    </el-date-picker>
    <span class="zhi">至</span>
    <el-date-picker v-model="launchTime[1]" type="date" :picker-options="endPickOptions" @change="endTime" placeholder="结束时间">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      launchTime: [],
      startPickOptions: {
        disabledDate: time => {
          if (this.launchTime[1]) {
            return time.getTime() >= this.launchTime[1].getTime()
          } else {
            return time.getTime() >= Date.now()
          }
        }
      },
      endPickOptions: {
        disabledDate: time => {
          if (this.launchTime[0]) {
            return time.getTime() >= Date.now() || time.getTime() <= this.launchTime[0].getTime()
          } else {
            return time.getTime() >= Date.now()
          }
        }
      }
    };
  },

  // data 结束

  // methods 开始
  methods: {
    startTime() {
      this.$store.commit('getSelectedLaunchTime', this.launchTime)
    },
    endTime() {
      this.$store.commit('getSelectedLaunchTime', this.launchTime)
    },
  }
};
</script>

<style scoped lang='scss'>
.launch-time {
  margin-bottom: 30px;
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

.launch-time /deep/ .el-input{
  width: 140px;
}

.launch-time /deep/ .el-input__inner {
  background-color: transparent;
  border: none;
  color: #fff;
  border-bottom: 1px solid #7c8e97;
  border-radius: 0;
}

.launch-time /deep/ .el-input__inner:focus {
  border-bottom-color: #409eff;
}

.zhi{
  color: white;
  margin: 0 5px;
}
</style>