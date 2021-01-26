<template>
  <div class="launch-time">
    <div class="title">
      <span>发射时间</span>
    </div>
    <input type="date" value-format="yyyy-MM-dd" size="mini" placeholder="开始时间" v-model="startTime">
    <span class="zhi">至</span>
    <input type="date" value-format="yyyy-MM-dd" size="mini" placeholder="结束时间" v-model="endTime">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.launch-time{
  margin-left: 20px;
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

.zhi{
  margin: 0 10px;
  color: #fff;
}
</style>