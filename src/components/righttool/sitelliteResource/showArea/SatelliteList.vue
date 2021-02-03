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
      <el-button type="primary" size="mini" @click="showNumber"
        >统计数量</el-button
      >
      <span style="margin-left: 10px; color: white" v-if="isShowNumber"
        >{{ currentSatList.length }}个卫星, {{ orbit }}个轨位</span
      >
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
      isShowNumber: false,
      // currentSatList: [],
      initSatList: [],
      // selectedSatList: [],
      selectedSatNameList: [],
      selectedSatOperatorList: [],
      selectedSatLaunchTimeList: [],
      selectedSatOrbitList: [],
    };
  },
  // data结束

  // 钩子函数
  created() {
    if (sessionStorage.getItem("allSatCollection")) {
      JSON.parse(sessionStorage.getItem("allSatCollection")).forEach((sat) => {
        if (
          sat.satEName === "CHINASAT 6A" ||
          sat.satEName === "APSTAR 6" ||
          sat.satEName === "APSTAR 5" ||
          sat.satEName === "Intelsat 709" ||
          sat.satEName === "Eutelsat 12WB" ||
          sat.satEName === "N-STAR C" ||
          sat.satEName === "ASTAR 1M" ||
          sat.satEName === "Telstar 14" ||
          sat.satEName === "Horizons 1" ||
          sat.satEName === "Korea 5"
        ) {
          this.initSatList.push(sat);
        }
      });
      this.satList = JSON.parse(sessionStorage.getItem("allSatCollection"));
    } else {
      getSatResource().then((res) => {
        console.log(res);
        res.forEach((sat) => {
          if (
            sat.satEName === "CHINASAT 6A" ||
            sat.satEName === "APSTAR 6" ||
            sat.satEName === "APSTAR 5" ||
            sat.satEName === "Intelsat 709" ||
            sat.satEName === "Eutelsat 12WB" ||
            sat.satEName === "N-STAR C" ||
            sat.satEName === "ASTAR 1M" ||
            sat.satEName === "Telstar 14" ||
            sat.satEName === "Horizons 1" ||
            sat.satEName === "Korea 5"
          ) {
            this.initSatList.push(sat);
          }
        });
        this.satList = res;
        sessionStorage.setItem("allSatCollection", JSON.stringify(res));
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
      this.$store.commit("showAllSat");
    },
    showNumber() {
      this.isShowNumber = true;
    },
  },

  // methods结束

  // computed开始
  computed: {
    orbit() {
      let orbit = [];
      let num = 0;
      this.currentSatList.forEach((sat) => {
        if (orbit.indexOf(sat.satPosition) === -1) {
          num = num + 1;
        }
      });
      return num;
    },

    selectedSatList() {
      let union = [];
      if (this.selectedSatNameList.length) {
        if (
          (this.selectedSatOperatorList.includes(this.selectedSatNameList[0]) ||
            this.selectedSatOperatorList.length == 0) &&
          (this.selectedSatOperatorList.includes(this.selectedSatNameList[0]) ||
            this.selectedSatOperatorList.length == 0) &&
          (this.selectedSatOperatorList.includes(this.selectedSatNameList[0]) ||
            this.selectedSatOperatorList.length == 0)
        ) {
          union = this.selectedSatNameList[0];
        }
      } else {
        if (
          this.selectedSatOperatorList.length == 0 &&
          this.selectedSatLaunchTimeList == 0 &&
          this.selectedSatOrbitList == 0
        ) {
          return union;
        } else if (
          (this.selectedSatLaunchTimeList == 0 &&
            this.selectedSatOrbitList == 0) ||
          (this.selectedSatOperatorList.length == 0 &&
            this.selectedSatOrbitList == 0) ||
          (this.selectedSatOperatorList.length == 0 &&
            this.selectedSatLaunchTimeList == 0)
        ) {
          
        }
      }
      /*       selectedSatNameList: [],
      selectedSatOperatorList: [],
      selectedSatLaunchTimeList: [],
      selectedSatOrbitList: [], */
    },

    currentSatList() {
      return this.selectedSatList.length
        ? this.selectedSatList
        : this.initSatList;
    },

    selectedSatName() {
      // console.log(this.$store.state.rightPanel.selectedOperator)
      return this.$store.state.rightPanel.selectedSatName;
      // return this.$store.state.rightPanel
    },
    selectedOperator() {
      return this.$store.state.rightPanel.selectedOperator;
    },
    selectedOrbit() {
      return this.$store.state.rightPanel.selectedOrbit;
    },
    selectedLaunchTime() {
      return this.$store.state.rightPanel.selectedLaunchTime;
    },
  },

  // watch 开始
  watch: {
    selectedSatName(newValue) {
      this.selectedSatNameList = [];
      this.selectedSatNameList.push(
        ...this.satList.filter((sat) => {
          return sat.satEName === newValue;
        })
      );
    },
    selectedOperator(newValue) {
      this.selectedSatOperatorList = [];
      this.selectedSatOperatorList.push(
        ...this.satList.filter((sat) => {
          return newValue.includes(sat.satOperator);
        })
      );
    },
    selectedOrbit(newValue) {
      this.selectedSatOrbitList = [];
      if (newValue[0] && newValue[1]) {
        const west = -Number(newValue[0]);
        const east = Number(newValue[1]);
        this.selectedSatOrbitList.push(
          ...this.satList.filter((sat) => {
            return sat.satPosition >= west && sat.satPosition <= east;
          })
        );
      }
    },
    selectedLaunchTime(newValue) {
      this.selectedSatLaunchTimeList = [];
      if (newValue[0] && newValue[1]) {
        const startTime = newValue[0].getTime();
        const endTime = newValue[1].getTime();
        this.selectedSatLaunchTimeList.push(
          ...this.satList.filter((sat) => {
            return (
              new Date(sat.satLaunchTime).getTime() >= startTime &&
              new Date(sat.satLaunchTime).getTime() <= endTime
            );
          })
        );
      }
    },
    deep: true,
  },

  // watch结束
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