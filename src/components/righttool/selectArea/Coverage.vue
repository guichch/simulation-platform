<template>
  <div class="coverage">
    <div class="title">
      <span>覆盖区域</span>
    </div>
    <button v-for="(item, index) in selectMode" :key='index' :class="{active: currentIndex == index}" @click='btnClick(index)' type="button">
      {{item}}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMode: ['空间选择', '区域选择', '经纬度选择'],
      currentIndex: null
    }
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style scoped>
.coverage{
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

button{
  width: 102px;
  border: none;
  outline: none;
  margin-left: 10px;
}

.active{
  background-color: #409eff;
}
</style>