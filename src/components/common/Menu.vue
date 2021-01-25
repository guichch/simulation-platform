<template>
  <div class="menu">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .menu{
    display: flex;
    width: 100%;
    height: 75px;
    line-height: 75px;
    background-color: #002236;
  }
  .left{
    flex: 2;
    height: 75px;
  }
  .right{
    flex: 1;
  }
  .center{
    flex: 3;
  }

</style>