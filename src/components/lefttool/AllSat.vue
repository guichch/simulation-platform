<template>
  <div class="all-sat" v-if="isShowAllSat">
    <p>
      全部卫星 --共{{ satList.length }}颗
      <i class="el-icon-close" @click="closeAllSat"></i>
    </p>
    <div class="separator"></div>
    <el-table :data="satList" height="40vh" border>
      <el-table-column
        v-for="(item, index) in satField"
        :key="index"
        :label="item.label"
        :prop="item.key"
        :width="item.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSatResource } from "@/network/satResource";
export default {
  // data
  data() {
    return {
      satList: [],
      satField: [
        {
          key: "satEName",
          label: "卫星名称",
          width: '140',
        },
        {
          key: "satOperator",
          label: "卫星运营商",
          width: 130,
        },
        {
          key: "satPosition",
          label: "卫星轨位",
          width: 100,
        },
        {
          key: "satNorad",
          label: "NORAD",
          width: 100,
        },
        {
          key: "satCospar",
          label: "COSPAR",
          width: 100,
        },
        {
          key: "satStatus",
          label: "卫星状态",
          width: 100,
        },
        {
          key: "satFunction",
          label: "卫星用途",
          width: 120,
        },
        {
          key: "satPlatform",
          label: "卫星平台",
          width: 100,
        },
        {
          key: "satLife",
          label: "卫星寿命",
          width: 140,
        },
        {
          key: "satPoleway",
          label: "极化方式",
          width: 100,
        },
        {
          key: "satRegion",
          label: "覆盖范围",
          width: 140,
        },
        {
          key: "satManufacturer",
          label: "卫星制造商",
          // width: 140,
        },
      ],
    };
  },
  // 钩子函数
  created() {
    if (sessionStorage.getItem("allSatCollection")) {
      this.satList = JSON.parse(sessionStorage.getItem("allSatCollection"));
    } else {
      getSatResource().then((res) => {
        this.satList = res;
        sessionStorage.setItem("allSatCollection", JSON.stringify(res));
      });
    }
  },

  // computed
  computed: {
    isShowAllSat() {
      return this.$store.state.isShowAllSat
    }
  },

  // methods
  methods: {
    closeAllSat() {
      this.$store.commit('closeAllSat');
    }
  }
};
</script>

<style scoped lang='scss'>
.all-sat {
  position: absolute;
  top: 15%;
  left: 10%;
  /* transform: translateX(-50%); */
  z-index: 999;
  width: 60%;
  background-color: rgba(6, 29, 57, 0.7);
}

.all-sat p {
  text-align: center;
  color: white;
}

.all-sat i {
  float: right;
  transform: translate(-10px);
  cursor: pointer;
}

.separator {
  border: 1px solid white;
  height: 4px;
  margin-bottom: 5px;
}

.all-sat /deep/ .el-table {
  width: 98%;
  margin: 0 auto;
  background-color: #409eff;
}

.all-sat /deep/ th > .cell{
  text-align: center;
}

.all-sat /deep/ .el-table th{
  padding: 0;
  background-color: #409eff;
}

.all-sat /deep/ .el-table th .cell{
  color: white;
}

.all-sat /deep/ .gutter {
  display: none;
}

.all-sat /deep/ .cell{
  text-align: center;
  color: #7c8e97;
  font-size: 15px;
}

.all-sat /deep/ td {
  padding: 0;
}

.all-sat /deep/ .el-table tr{
  background-color: #061546;
}

.all-sat /deep/ .el-table tr:hover > td{
  color: white;
  background-color: #90c0f1;
  cursor: pointer;
}

.all-sat /deep/ .el-table tr:hover .cell{
  color: white;
}
</style>