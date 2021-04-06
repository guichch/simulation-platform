<template>
  <div class="foot">
      <button type="reset" @click='btnClick'>重置</button>
      <!-- <input type="reset" class="reset"> -->
      <!-- <input type="button" value="提交" class="submit"> -->
      <!-- <button type="button">提交</button> -->
  </div>
</template>

<script>
export default {
  methods: {
    btnClick() {
      console.log(1)
    }
  }
}
</script>

<style scoped>
  .foot{
    text-align: center;
  }
  button{
/*     width: 56px;
    height: 28px;
    margin: 0 10px;
    border: none;
    outline: none;
    background-color: #409eff;
    color: #fff;
    border-radius: 3px;
    font-size: 12px; */
  }
</style>