<template>
  <div class="sitellite-resource">
    <select-area></select-area>
    <show-area></show-area>
  </div>
</template>

<script>
import SelectArea from './selectArea/SelectArea.vue'
import ShowArea from './showArea/ShowArea'
export default {
  components: {
    SelectArea,
    ShowArea,
  },
}
</script>

<style>

</style>