<template>
  <div class="orbit">
    <div class="title">
      <span>卫星轨位</span>
    </div>
    <input type="text" placeholder="西经" v-model="selectedW">
    <span>°W</span>
    <span class="zhi">至</span>
    <input type="text" placeholder="东经" v-model="selectedE">
    <span>°E</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedW: null,
      selectedE: null
    }
  }
}
</script>

<style scoped>
.orbit{
  margin-bottom: 30px;
  margin-left: 20px;
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

input{
  box-sizing: border-box;
  width: 60px;
  margin-top: 6px;
  border: none;
  outline: none;
  border-bottom: 1px solid #a1aeb3;
  background-color: transparent;
  color: #a1aeb3;
  padding: 0 6px;
}

input:focus{
  border-color: #409eff;
}

input::placeholder{
  color: #a1aeb3;
}

span{
  color: #fff;
}

.zhi{
  margin: 0 10px;
}
</style>