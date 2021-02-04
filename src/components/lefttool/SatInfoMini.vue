<template>
  <div class="sat-info-mini" v-if="isShow" @click="miniClick">
    <div class="sat-info-mini-text">
      卫 <br />星 <br />详 <br />情
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShow() {
      return this.$store.state.leftPanel.isShowMini;
    }
  },

  methods: {
    miniClick() {
      this.$store.commit('endMiniPanel');
      this.$store.commit('startPanel');
    }
  }
}
</script>

<style scoped lang='scss'>
  .sat-info-mini {
  position: absolute;
  width: 170px;
  height: 0;
  border-width: 0 30px 30px 30px;
  border-style: none solid solid;
  border-color: transparent transparent #043551;
  top: 280px;
  left: -65px;
  z-index: 999;
  transform: rotate(90deg);
  cursor: pointer;
  .sat-info-mini-text {
    color: #fff;
    transform: rotate(-90deg);
    margin-top: -67px;
  }
  }
</style>