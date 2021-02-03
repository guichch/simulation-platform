<template>
  <div class="operators">
    <div class="title">
      <span>卫星运营商</span>
    </div>
    <table class="operator-container">
      <tr>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="ChinaSatcom"
            id="ChinaSat"
            v-model="checkedOperators"
          />
          <label for="ChinaSat">ChinaSat</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="APSTAR"
            id="APSTAR"
            v-model="checkedOperators"
          />
          <label for="APSTAR">APSTAR</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="ASIASAT"
            id="ASIASAT"
            v-model="checkedOperators"
          />
          <label for="ASIASAT">ASIASAT</label>
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="Intelsat"
            id="Intelsat"
            v-model="checkedOperators"
          />
          <label for="Intelsat">Intelsat</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="Eutelsat"
            id="Eutelsat"
            v-model="checkedOperators"
          />
          <label for="Eutelsat">Eutelsat</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="Telesat"
            id="Telesat"
            v-model="checkedOperators"
          />
          <label for="Telesat">Telesat</label>
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="SES"
            id="SES"
            v-model="checkedOperators"
          />
          <label for="SES">SES</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="JSAT"
            id="JSAT"
            v-model="checkedOperators"
          />
          <label for="JSAT">JSAT</label>
        </td>
        <td>
          <input
            type="checkbox"
            name="operator"
            value="others"
            id="others"
            v-model="checkedOperators"
          />
          <label for="others">其他</label>
        </td>
      </tr>

      <!--       <input type="checkbox" :id="item" v-for="(item, index) in operators" :value="item" :key="index">
      <label for="item" v-for="(item, index) in operators" :key="index">{{item}}</label> -->
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operators: [
        "ChinaSatcom",
        "APSTAR",
        "ASIASAT",
        "Intelsat",
        "Eutelsat",
        "Telesat",
        "SES",
        "JSAT",
        "others",
      ],
      checkedOperators: [],
    };
  },

  // watch开始
  
  watch: {
    checkedOperators(newValue) {
      this.$store.commit('getSelectedOperator', newValue);
    }
  }

  // watch结束
};
</script>

<style scoped>
.operators{
  margin-bottom: 30px;
}
.title {
  font-size: 13pt;
  color: white;
  padding-left: 10px;
  background-color: #063e60;
  width: 90%;
  height: 28px;
  line-height: 28px;
}
.operator-container {
  width: 100%;
  padding-left: 10px;
}

.operator-container input {
  margin-right: 5px;
}

.operator-container label{
  margin-right: 10px;
  color: #a1aeb3;
}

table tr{
  width: 100%;
  height: 25px;
}
</style>