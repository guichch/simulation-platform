<template>
  <div class="earth-list">
    <el-table
      :data="currentEarthList"
      style="width: 98%"
      @row-click="rowClick"
      height="300"
    >
      <template slot="empty"> 请先选择卫星运营商 </template>
      <el-table-column
        v-for="(item, index) in earthField"
        :key="index"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEarthList } from "@/network/earthList";
import { addPointEarthStation } from "@/common/Map/EarthStation/EarthStationOperation";
export default {
  // data 开始
  data() {
    return {
      currentEarthList: [],
      earthField: [
        {
          key: "teleportName",
          label: "卫星地球站",
          width: 140,
        },
        {
          key: "teleportOperator",
          label: "卫星运营商",
          width: 130,
        },
        {
          key: "teleportAntennas",
          label: "地面天线数",
          width: 105,
        },
        {
          key: "teleportSatelliteNumber",
          label: "连接卫星数",
          width: 105,
        },
      ],
    };
  },

  // data 结束

  // computed 开始
  computed: {
    selectedOperatorList() {
      return this.$store.state.rightPanel.selectedOperator;
    },
  },

  // computed 结束

  // watch 开始
  watch: {
    selectedOperatorList(newValue) {      
      const map =
        this.$route.fullPath.indexOf("2dmap") == -1 ? "3dmap" : "2dmap";
      if (newValue.length) {
        this.$store.commit('startLoading')
        getEarthList(newValue).then((res) => {
          console.log(res);
          this.currentEarthList = res;
          addPointEarthStation(this.currentEarthList, map, this);
          this.$store.commit('endLoading')
        });
      } else {
        this.currentEarthList = [];
        addPointEarthStation(this.currentEarthList, map, this);
      }

      
    },
  },

  // watch 结束

  // method 开始
  methods: {
    rowClick() {},
  },

  // method 结束
};
</script>

<style scoped lang='scss'>
.earth-list /deep/ .el-table {
  margin: 0 auto;
  background-color: #063e60;
}

.earth-list /deep/ .el-table th {
  background-color: #063e60;
  color: white;
  text-align: center;
}

.earth-list /deep/ th {
  padding: 0;
}

.earth-list /deep/ td .cell {
  background-color: #043551;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap !important;
}

.earth-list /deep/ td {
  padding: 0;
  border: none;
  transition: none;
}

.earth-list /deep/ tr {
  cursor: pointer;
  color: #7c8e97;
  background-color: #043551;
}

.earth-list /deep/ tr:nth-child(even) {
  background-color: #063e60;
}

.earth-list /deep/ tr:nth-child(even) .cell {
  background-color: #063e60;
}

.earth-list /deep/ tbody tr:hover > td {
  background-color: #90c0f1;
}

.earth-list /deep/ tbody tr:hover .cell {
  color: white;
  background-color: #90c0f1;
}
</style>