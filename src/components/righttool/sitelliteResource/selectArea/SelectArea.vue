<template>
  <div class="select-area">
    <satellite-name ref="name"></satellite-name>
    <operators ref="operator"></operators>
    <coverage ref="cov"></coverage>
    <frequency ref="fre"></frequency>
    <orbit ref="orb"></orbit>
    <launch-time ref="time"></launch-time>
    <el-button @click="btnClick" size="small" type="primary">重置</el-button>
  </div>
</template>

<script>
import Coverage from "./Coverage.vue";
import Foot from "./Foot.vue";
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
  methods: {
    btnClick() {
      this.$refs.name.selectedSatName = "";
      this.$refs.operator.checkedOperators = [];
      this.$refs.fre.selectedFrequency = [];
      this.$refs.orb.selectedOrbit = [];
      this.$refs.time.launchTime = [];
    },
  },
};
</script>

<style scoped>
.select-area {
  padding-left: 20px;
}

.el-button {
  display: block;
  margin: 0 auto;
}
</style>