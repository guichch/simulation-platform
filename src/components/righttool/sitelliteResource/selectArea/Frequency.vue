<template>
  <div class="frequency">
    <div class="title">
      <span>通信频段</span>
    </div>
    <table class="operator-container">
      <tr>
        <td>
          <input type="checkbox" id="C" value="C" v-model="selectedFrequency" />
          <label for="C">C</label>
        </td>
        <td>
          <input
            type="checkbox"
            id="Ku"
            value="Ku"
            v-model="selectedFrequency"
          />
          <label for="Ku">Ku</label>
        </td>
        <td>
          <input
            type="checkbox"
            id="Ka"
            value="Ka"
            v-model="selectedFrequency"
          />
          <label for="Ka">Ka</label>
        </td>
        <td>
          <input
            type="checkbox"
            id="other"
            value="other"
            v-model="selectedFrequency"
          />
          <label for="other">其他</label>
        </td>
      </tr>
    </table>
    <!-- <div class="frequency-container">
      <input type="checkbox" id="C" value="C" v-model="selectedFrequency" />
      <label for="C">C</label>
      <input type="checkbox" id="Ku" value="Ku" v-model="selectedFrequency" />
      <label for="Ku">Ku</label>
      <input type="checkbox" id="Ka" value="Ka" v-model="selectedFrequency" />
      <label for="Ka">Ka</label>
      <input
        type="checkbox"
        id="other"
        value="other"
        v-model="selectedFrequency"
      />
      <label for="other">其他</label>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // frequencyList: ["C", "Ku", "Ka", "others"],
      selectedFrequency: [],
    };
  },
};
</script>

<style scoped>
.frequency {
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

table{
  width: 60%;
  color: #a1aeb3;
  padding-left: 10px;
}

table tr{
  width: 100%;
}

table td{
  width: 25%;
}
</style>