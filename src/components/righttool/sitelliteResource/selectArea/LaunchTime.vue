<template>
  <div class="launch-time">
    <div class="title">
      <span>发射时间</span>
    </div>
    <el-date-picker v-model="startTime" type="date" :picker-options="startPickOptions">
    </el-date-picker>
    <span class="zhi">至</span>
    <el-date-picker v-model="endTime" type="date" :picker-options="endPickOptions">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      startPickOptions: {
        disabledDate: time => {
          if (this.endTime) {
            return time.getTime() >= this.endTime.getTime()
          } else {
            return time.getTime() >= Date.now()
          }
        }
      },
      endPickOptions: {
        disabledDate: time => {
          if (this.startTime) {
            return time.getTime() >= Date.now() || time.getTime() <= this.startTime.getTime()
          } else {
            return time.getTime() >= Date.now()
          }
        }
      }
    };
  },
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