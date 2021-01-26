<template>
  <div class="right-panel">
    <select-area></select-area>
    <show-area></show-area>
  </div>
</template>

<script>
  import SelectArea from "./selectArea/SelectArea.vue";
  import ShowArea from "./showArea/ShowArea.vue";
  export default {
    components: {
      SelectArea,
      ShowArea,
    },
  };
</script>

<style>
  .right-panel{
    width: 450px;
    height: calc(100vh - 75px);
    float: right;
    background-color: #043551;
    overflow: auto;
  }
</style>