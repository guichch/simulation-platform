<template>
  <div class="tab-control">
    <img src="@/assets/img/prev.png" alt="" class="arrow pre" @click="preClick">
    <div class="tab-container-outer" >
      <div class="tab-container-inner" :style="innerStyle">
        <button 
          v-for="(item, index) in tab" 
          :key="index"
          class="link" 
          @click="btnClick(item, index)"
          :class="{active: index === currentIndex}">{{item}}</button>
      </div>      
    </div>
    <img src="@/assets/img/next.png" alt="" class="arrow next" @click="nextClick">
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      innerStyle: {
        left: '0px',
        width: this.tab.length * 80 + 'px',
        right: 320 - this.tab.length * 80 + 'px',
      },
      currentIndex: 0
    }
  },
  methods: {
    btnClick(item, index) {
      switch(item) {
        case '卫星列表':
          this.$router.push('/home/satellitelist');
          break;
        case '系统指标':
          this.$router.push('/home/systemindicators');
          break;
        case '地球站列表':
          this.$router.push('/home/earthlist');
          break;
        case '广电业务':
          this.$router.push('/home/broadcasting');
          break;
        case '机船载业务':
          this.$router.push('/home/onboard');
          break;
        case '应急业务':
          this.$router.push('/home/emergency');
          break;

      }
      this,this.currentIndex = index;
    },
    preClick() {
      if (parseInt(this.innerStyle.left) === 0) {
        return;
      }
      this.innerStyle.left = parseInt(this.innerStyle.left) + 80 + 'px'
      this.innerStyle.right = parseInt(this.innerStyle.right) - 80 + 'px'
    },
    nextClick() {
      if (parseInt(this.innerStyle.right) === 0) {
        return;
      }
      this.innerStyle.left = parseInt(this.innerStyle.left) - 80 + 'px'
      this.innerStyle.right = parseInt(this.innerStyle.right) + 80 + 'px'
    },
  }
}
</script>

<style scoped>
  .tab-control{
    /* width: 200%; */
    position: relative;
    height: 31px;
    margin-bottom: 10px;
    border-bottom: 1px solid white;
  }
  .arrow{
    position: absolute;
    margin: 0 5px;
    cursor: pointer;
  }
  .pre{
    left: 10px;
    top: 0;
    bottom: 0;
    /* width: 10px; */
    margin: auto;
  }
  .next{
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .tab-container-outer{
    width: 320px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 30px;
    
  }

  .tab-container-inner{
    position: absolute;
    transition: all 500ms;
  }

  .link{
    width: 80px;
    font-size: 12px;
    height: 30px;
    font-size: 15px;
    padding: 0;
    color: #a1aeb3;
    background-color: #043551;
    outline: none;
    border: 0;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  .active{
    border-color: white;
    background-color: #3790ff;
    color: white;
  }
</style>