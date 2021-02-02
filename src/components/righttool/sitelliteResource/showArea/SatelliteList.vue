<template>
  <div class="satellite-list">
    <el-table
      :data="currentSatList"
      style="width: 98%"
      @row-click="rowClick"
      height="300"
    >
      <el-table-column
        v-for="(item, index) in satField"
        :key="index"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.key === 'satPosition'">
            <span v-if="scope.row.satPosition > 0"
              >{{ scope.row.satPosition }}°E</span
            >
            <span v-if="scope.row.satPosition < 0"
              >{{ -scope.row.satPosition }}°W</span
            >
            <span v-if="scope.row.satPosition == 0"
              >{{ scope.row.satPosition }}°</span
            >
          </span>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button type="primary" size="mini" @click="allSat">全部卫星</el-button>
      <el-button type="primary" size="mini" @click="showNumber">统计数量</el-button>
      <span style="margin-left: 10px; color: white" v-if="isShowNumber">{{currentSatList.length}}个卫星, {{getOrbit}}个轨位</span>
    </div>
  </div>
</template>

<script>
import { getSatResource } from "@/network/satResource";
export default {
  // data开始
  data() {
    return {
      satList: [],
      satField: [
        {
          key: "satOperator",
          label: "运营商",
          width: 130,
        },
        {
          key: "satEName",
          label: "卫星名称",
          width: 140,
        },
        {
          key: "satCountry",
          label: "国别",
          width: 120,
        },
        {
          key: "satPosition",
          label: "轨位",
        },
      ],
      currentSatList: [],
      isShowNumber: false
    };
  },
  // data结束

  // 钩子函数
  created() {
    if (sessionStorage.getItem("allSatCollection")) {
      JSON.parse(sessionStorage.getItem("allSatCollection")).forEach(sat => {
        if (sat.satEName === 'CHINASAT 6A' || sat.satEName === 'APSTAR 6' || sat.satEName === 'APSTAR 5'|| sat.satEName === 'Intelsat 709' || sat.satEName === 'Eutelsat 12WB' || sat.satEName === 'N-STAR C' || sat.satEName === 'ASTAR 1M' || sat.satEName === 'Telstar 14' || sat.satEName === 'Horizons 1' || sat.satEName === 'Korea 5') {
          this.currentSatList.push(sat)
        }
      })
      this.satList = JSON.parse(sessionStorage.getItem("allSatCollection"));
    } else {
      getSatResource().then((res) => {
        console.log(res)
        res.forEach(sat => {
          if (sat.satEName === 'CHINASAT 6A' || sat.satEName === 'APSTAR 6' || sat.satEName === 'APSTAR 5'|| sat.satEName === 'Intelsat 709' || sat.satEName === 'Eutelsat 12WB' || sat.satEName === 'N-STAR C' || sat.satEName === 'ASTAR 1M' || sat.satEName === 'Telstar 14' || sat.satEName === 'Horizons 1' || sat.satEName === 'Korea 5') {
            this.currentSatList.push(sat)
          }
        });
        this.satList = res;
        sessionStorage.setItem("allSatCollection",JSON.stringify(res))
      });
    }
  },
  // 钩子函数结束

  // methods开始
  methods: {
    rowClick(row) {
      this.$store.commit("setParamsEasy", row);
      this.$store.commit("startPanel");
    },
    allSat() {
      this.$store.commit('showAllSat')
    },
    showNumber() {
      this.isShowNumber = true;
    }
  },

  // methods结束

  // computed开始
  computed: {
    getOrbit() {
      let orbit = [];
      let num = 0;
      this.currentSatList.forEach(sat => {
        if (orbit.indexOf(sat.satPosition) === -1) {
          num = num + 1;
        }
      })
      return num
    }
  }
};
</script>

<style scoped lang='scss'>
.satellite-list /deep/ .el-table {
  margin: 0 auto;
  background-color: #063e60;
}

.satellite-list /deep/ .el-table th {
  background-color: #063e60;
  color: white;
  text-align: center;
}

.satellite-list /deep/ th {
  padding: 0;
}

.satellite-list /deep/ td .cell {
  background-color: #043551;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap !important;
}

.satellite-list /deep/ td {
  padding: 0;
  border: none;
  transition: none;
}

.satellite-list /deep/ tr {
  cursor: pointer;
  color: #7c8e97;
  background-color: #043551;
}

.satellite-list /deep/ tr:nth-child(even) {
  background-color: #063e60;
}

.satellite-list /deep/ tr:nth-child(even) .cell {
  background-color: #063e60;
}

.satellite-list /deep/ tbody tr:hover > td {
  background-color: #90c0f1;

}

.satellite-list /deep/ tbody tr:hover .cell {
  color: white;
  background-color: #90c0f1;
}
</style>