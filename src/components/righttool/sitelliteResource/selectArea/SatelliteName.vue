<template>
  <div class="satellite-name">
    <span>卫星名称:</span>
    <input type="text" placeholder="请输入卫星名称(e.g. ChinaSat 16)">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .satellite-name{
    margin: 30px 0;
  }
  span{
    color: #6A8BE6;
    font: 18px PingFangSC-Regular, PingFang SC;
    margin-right: 10px;
  }

  input{
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 1px solid #a1aeb3;
    width: 280px;
    padding: 0 15px;
    color: #a1aeb3;
  }

  input:focus{
    border-bottom-color: #409eff;
  }

  input::placeholder{
    color: #a1aeb3;
  }
</style>