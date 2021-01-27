<template>
  <div class="select-area">
    <form action="">
      <satellite-name></satellite-name>
      <operators></operators>
      <coverage></coverage>
      <frequency></frequency>
      <orbit></orbit>
      <launch-time></launch-time>
      <foot></foot>
      
    </form>
  </div>
</template>

<script>
import Coverage from "./Coverage.vue";
import Foot from './Foot.vue';
import Frequency from "./Frequency.vue";
import LaunchTime from "./LaunchTime.vue";
import Operators from "./Operators.vue";
import Orbit from "./Orbit";
import SatelliteName from "./SatelliteName.vue";
export default {
  components: {
    SatelliteName,
    Operators,
    Coverage,
    Frequency,
    Orbit,
    LaunchTime,
    Foot,
  },
};
</script>

<style>
  .select-area{
    margin-left: 20px;
  }
</style>