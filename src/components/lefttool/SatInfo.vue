<template>
  <div class="satellite-information" v-show="isShowPanel">
    <div class="title">
      <span>卫星详情</span>
      <i class="el-icon-close" @click="closePanel"></i>
      <i class="el-icon-minus" @click="hidePanel"></i>
    </div>
    <div class="separator"></div>
    <div class="content">
      <div class="satInfo">
        <div class="sat">
          <p class="satName">卫星名称：{{ satParams.satEName }}</p>
        </div>
        <div class="satImg">
          <img
            v-if="imgData.length"
            :src="'data:image/jpeg;base64,' + imgData[0].src"
            height="180px"
          />
        </div>
        <div class="satDetails">
          <table>
            <tr>
              <td>卫星轨位：{{ satOrbit }}</td>
              <td>COSPAR：{{ satParams.satCospar }}</td>
              <td>NORAD：{{ satParams.satNorad }}</td>
            </tr>
            <tr>
              <td>卫星运营商：{{ satParams.satOperator }}</td>
              <td>发射时间：{{ satLaunchTime }}</td>
              <td>卫星寿命：{{ satParams.satLife }}</td>
            </tr>
          </table>
          <div>
            <span>卫星平台：{{ satParams.satPlatform }}</span>
          </div>
          <div class="satManu">
            <span>制造商：{{ satParams.satManufacturer }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: [],
    };
  },
  computed: {
    isShowPanel() {
      return this.$store.state.satInfo.isShowPanel
    },
    satParams() {
      return this.$store.state.satInfo.params;
    },
    satOrbit() {
      if (this.satParams.satPosition < 0) {
        return -this.satParams.satPosition + "°W";
      } else if (this.satParams.satPosition > 0) {
        return this.satParams.satPosition + "°E";
      } else {
        return 0 + "°";
      }
    },
    satLaunchTime() {
      if (this.satParams.satLaunchTime != undefined) {
        return this.satParams.satLaunchTime.split(
          " 00:00:00"
        )[0];
      } else {
        return "unknown";
      }
    },
  },
  methods: {
    closePanel() {
      this.$store.commit("endPanel");
    },
    hidePanel() {
      this.$store.commit("endPanel");
      this.$store.commit("startMiniPanel");
    },
  },

  watch: {
    satParams(newValue) {
      this.imgData = [];
      import(`@/data/SatImg/${newValue.satEName}`)
        .then((res) => {
          this.imgData.push({ src: res.satPic });
        })
        .catch(() => {
          this.$message.error("暂无卫星图片信息");
        });
    },
  },
};
</script>

<style scoped>
.satellite-information {
  width: 520px;
  height: 550px;
  background-color: rgba(6, 29, 57, 0.7);
  position: fixed;
  border: 1px solid #797979;
  /* overflow: auto; */
  top: 9%;
  left: 0.5%;
  z-index: 999;
  color: white;
  padding: 0 5px;
}

.title {
  height: 30px;
  line-height: 30px;
}

.title i {
  float: right;
  font-size: 18px;
  cursor: pointer;
}

.separator {
  border: 1px solid white;
  height: 4px;
}

.content {
  background-color: #002236;
  color: #d7d7d7;
  height: 514px;
  overflow: auto;
}

.sat {
  text-align: center;
}

.satName {
  color: white;
  font-size: 14px;
  margin: 0;
}

.satInfo {
  padding: 15px;
  font-size: 10pt;
}

.satInfo div {
  line-height: 45px;
}

td {
  padding: 0;
}
tr td:first-child {
  width: 180px;
}

tr td:nth-child(2) {
  width: 160px;
}

.satImg {
  height: 200px;
  text-align: center;
}
</style>