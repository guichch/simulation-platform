<template>
  <div class="satellite-list">
    <el-table
      :data="selectedSatList"
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
        <template #default="scope">
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
    <div style="margin-top: 20px; text-align: center">
      <el-button type="primary" size="mini" @click="allSat">全部卫星</el-button>
      <el-button type="primary" size="mini" @click="clearCov"
        >清除覆盖</el-button
      >
      <el-button type="primary" size="mini" @click="showNumber"
        >统计数量</el-button
      >
      <el-button type="primary" size="mini" @click="clearNumber"
        >隐藏数量</el-button
      >
      <div style="margin-left: 10px; color: white" :class="{isShow: !isShowNumber}">
        {{ selectedSatList.length }}个卫星, {{ orbit }}个轨位
      </div>
    </div>
  </div>
</template>

<script>
import satResource from "@/data/satResource.json";

import {
  SatOrbit,
  clearSatellite2DMap,
} from "@/common/Map/ElevationLines/satOrbit";
import {
  showCoverage,
  deleteSurfaceBeam,
  deleteSurfaceBeam2DMap,
} from "@/common/Map/ElevationLines/satCoverage";
export default {
  // data开始
  data() {
    return {
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
      initSatList: [],
      selectedSatNameList: [],
      selectedSatOperatorList: [],
      selectedSatLaunchTimeList: [],
      selectedSatOrbitList: [],
      map: "",
    };
  },
  // data结束

  // 钩子函数
  created() {
    satResource.forEach((sat) => {
      this.initSatList.push(sat);
      this.selectedSatNameList.push(sat);
      this.selectedSatOperatorList.push(sat);
      this.selectedSatLaunchTimeList.push(sat);
      this.selectedSatOrbitList.push(sat);
    });
    this.map = this.$route.fullPath.indexOf('2dmap') == -1 ? '3dmap' : '2dmap'
  },
  // 钩子函数结束

  // methods开始
  methods: {
    rowClick(row) {
      this.$store.commit("setParamsEasy", row);
      this.$store.commit("startPanel");
      this.$store.commit("endEarthPanel");
      this.$store.commit("endMiniPanel");
      showCoverage(row, this.map, this);
    },
    allSat() {
      this.$store.commit("showAllSat", this.map);
    },
    showNumber() {
      this.isShowNumber = true;
    },
    clearCov() {
      this.map === '2dmap' ? deleteSurfaceBeam2DMap() : deleteSurfaceBeam()
    },
    clearNumber() {
      this.isShowNumber = false;
    },
  },

  // methods结束

  // computed开始
  computed: {
    orbit() {
      const orbit = [];
      this.selectedSatList.forEach((sat) => {
        if (orbit.indexOf(sat.satPosition) === -1) {
          orbit.push(sat.satPosition);
        }
      });
      return orbit.length;
    },

    selectedSatList() {
      let union = [];
      this.selectedSatNameList.forEach((sat) => {
        if (
          this.selectedSatOperatorList.includes(sat) &&
          this.selectedSatLaunchTimeList.includes(sat) &&
          this.selectedSatOrbitList.includes(sat)
        ) {
          union.push(sat);
        }
      });
      if (!union.length) {
        this.$message.error('无满足选择结果的卫星，显示全部卫星资源')
        return this.initSatList
      }
      return union;
    },

    selectedSatName() {
      return this.$store.state.rightPanel.selectedSatName;
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
        ...this.initSatList.filter((sat) => {
          return sat.satEName === newValue;
        })
      );
      this.selectedSatNameList = this.selectedSatNameList.length
        ? this.selectedSatNameList
        : this.initSatList;
    },
    selectedOperator(newValue) {
      this.selectedSatOperatorList = [];
      this.selectedSatOperatorList.push(
        ...this.initSatList.filter((sat) => {
          return newValue.includes(sat.satOperator);
        })
      );
      if (newValue.includes("others")) {
        this.selectedSatOperatorList.push(
          ...this.initSatList.filter((sat) => {
            return (
              sat.satOperator !== "ChinaSatcom" &&
              sat.satOperator !== "APSTAR" &&
              sat.satOperator !== "ASIASAT" &&
              sat.satOperator !== "Intelsat" &&
              sat.satOperator !== "Eutelsat" &&
              sat.satOperator !== "Telesat" &&
              sat.satOperator !== "SES" &&
              sat.satOperator !== "JSAT"
            );
          })
        );
      }
      this.selectedSatOperatorList = this.selectedSatOperatorList.length
        ? this.selectedSatOperatorList
        : this.initSatList;
    },
    selectedOrbit(newValue) {
      this.selectedSatOrbitList = [];
      if (newValue[0] && newValue[1]) {
        const west = -Number(newValue[0]);
        const east = Number(newValue[1]);
        this.selectedSatOrbitList.push(
          ...this.initSatList.filter((sat) => {
            return sat.satPosition >= west && sat.satPosition <= east;
          })
        );
      }
      if (!this.selectedSatOrbitList.length) {
        if (newValue[0] && newValue[1]) {
          this.$message.error("所选区间无卫星，选择结果无效");
        }
        this.selectedSatOrbitList = this.initSatList;
      }
    },
    selectedLaunchTime(newValue) {
      this.selectedSatLaunchTimeList = [];
      if (newValue[0] && newValue[1]) {
        const startTime = newValue[0].getTime();
        const endTime = newValue[1].getTime();
        this.selectedSatLaunchTimeList.push(
          ...this.initSatList.filter((sat) => {
            return (
              new Date(sat.satLaunchTime).getTime() >= startTime &&
              new Date(sat.satLaunchTime).getTime() <= endTime
            );
          })
        );
      }
      if (!this.selectedSatLaunchTimeList.length) {
        if (newValue[0] && newValue[1]) {
          this.$message.error("所选区间无卫星，选择结果无效");
        }
        this.selectedSatLaunchTimeList = this.initSatList;
      }
    },
    selectedSatList(newValue) {
      if (this.$route.fullPath.indexOf("2dmap") !== -1) {
        clearSatellite2DMap();
        SatOrbit(newValue, "2dmap", this);
      } else {
        SatOrbit(newValue, "3dmap", this);
      }
    },
    deep: true
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

.isShow {
  visibility: hidden;
}
</style>