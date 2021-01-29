<template>
  <div class="satellite-information" @click="panelClick" v-show="isShowPanel">
    <div class="title">
      <span>卫星详情</span>
      <i class="iconfont icon-guanbi" @click='guanbi'></i>
      <i class="iconfont icon-zuixiaohua"></i>
    </div>
    <div class="separator"></div>
    <div class="content">
      <div class="tab-control">
        <button
          class="satInfoBtn"
          :class="{ active: isActive }"
          @click="btnClick('info')"
        >
          卫星信息
        </button>
        <button
          class="satEvalBtn"
          :class="{ active: !isActive }"
          @click="btnClick"
        >
          卫星评估
        </button>
      </div>
      <div class="satInfo" v-if="isActive">
        <div class="sat">
          <p class="satName">卫星名称：{{satParams.satEName}}</p>
        </div>
        <div class="satDetails">
          <table>
            <tr>
              <td>卫星轨位：{{satOrbit}}</td>
              <td>COSPAR：{{satParams.satCospar}}</td>
              <td>NORAD：{{satParams.satNorad}}</td>
            </tr>
            <tr>
              <td>卫星运营商：{{satParams.satOperator}}</td>
              <td>发射时间：{{satLaunchTime}}</td>
              <td>卫星寿命：{{satParams.satLife}}</td>
            </tr>
          </table>
          <div>
            <span>卫星平台：{{satParams.satPlatform}}</span>
          </div>
          <div class="satManu">
            <span>制造商：{{satParams.satManufacturer}}</span>
          </div>
          <div class="condition-selection">
            <div class="satCov">
              <span style="clear: both">卫星覆盖：</span>
              <div class="select-frequency" @click.stop="freClick">
                <input
                  type="text"
                  placeholder="请选择频段"
                  v-model="selected[1]"
                  readonly
                  ref="bbb"
                />
                <img
                  src="@/assets/img/arrow.png"
                  style="width: 14px"
                  class="arr"
                />
              </div>
              <div class="select-area" @click.stop="areaClick">
                <input
                  type="text"
                  placeholder="请选择区域"
                  v-model="selected[0]"
                  readonly
                  ref="aaa"
                />
                <img
                  src="@/assets/img/arrow.png"
                  alt=""
                  style="width: 14px"
                  class="arr"
                />
              </div>
              <div style="overflow: visibile">
                <div v-show="isShowArea">
                  <ul class="selected-area">
                    <li>全部</li>
                    <li>China</li>
                    <li>Global</li>
                  </ul>
                  <div class="tri"></div>
                </div>
              </div>
              <div v-show="isShowFre">               
                <ul class="selected-fre">
                  <li>全部</li>
                  <li>C</li>
                  <li>Ku</li>
                </ul>
                <div class="tri"></div>
              </div>
            </div>
            <div class="limit">
              <span>上下界限制：</span>
              <input
                type="text"
                v-model="selected[2]"
                placeholder="请输入上界限"
              />
              <span class="zhi">至</span>
              <input
                type="text"
                v-model="selected[3]"
                placeholder="请输入下界限"
              />
            </div>
            <div class="elevation">
              <span>仰角线：</span>
              <input
                type="text"
                v-model="selected[4]"
                placeholder="请输入仰角线"
              />
              <button class="clearBtn">清除</button>
            </div>
          </div>
        </div>
      </div>
      <div class="satEval" v-else>
        <div class="eval-indi">
          <p>评估指标：</p>
          <div class="select-indi">
            <input
              type="checkbox"
              id="communication"
              v-model="selectedIndi"
              value="communication"
            />
            <label for="communication">通讯能力</label>
            <input
              type="checkbox"
              id="terminal"
              value="terminal"
              v-model="selectedIndi"
            />
            <label for="terminal">地面终端</label>
            <input
              type="checkbox"
              id="coverage"
              value="coverage"
              v-model="selectedIndi"
            />
            <label for="coverage">覆盖区域</label>
          </div>
        </div>
        <div class="iocn-type">
          <p>图标类型：</p>
          <div class="select-type">
            <input
              type="radio"
              id="histogram"
              value="histogram"
              v-model="selectedType"
            />
            <label for="histogram">堆栈图</label>
            <input type="radio" id="pie" value="pie" v-model="selectedType" />
            <label for="pie">玫瑰饼图</label>
            <input
              type="radio"
              id="rader"
              value="rader"
              v-model="selectedType"
            />
            <label for="rader">雷达图</label>
            <div class="img-container"></div>
          </div>
        </div>
        <div class="satEval">
          <p>卫星评价：</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      selectedIndi: [],
      selectedType: "",
      isActive: true,
      isShowArea: false,
      isShowFre: false,
    };
  },
  computed: {
    isShowPanel() {
      return this.$store.state.satInfo.isShowPanel;
    },
    satParams() {
      return this.$store.state.satInfo.params;
    },
    satOrbit() {
      if (this.$store.state.satInfo.params.satPosition < 0) {
        return -this.$store.state.satInfo.params.satPosition + '°W'
      } else if (this.$store.state.satInfo.params.satPosition > 0) {
        return this.$store.state.satInfo.params.satPosition + '°E'
      }else {
        return 0 + '°'
      }
      
    },
    satLaunchTime() {
      if (this.$store.state.satInfo.params.satLaunchTime != undefined) {
        return this.$store.state.satInfo.params.satLaunchTime.split(" 00:00:00")[0]
      }else {
        return 'unknown'
      }
    }

  },
  methods: {
    btnClick(item) {
      this.isActive = item === "info";
    },
    areaClick() {
      this.$refs.aaa.style = this.$refs.aaa.style['borderBottomColor'] == 'rgb(64, 158, 255)' ? 'border-bottom-color: #909399' : 'border-bottom-color: #409eff'
      this.isShowArea = !this.isShowArea;
      this.isShowFre = false;
      this.$refs.bbb.style = 'border-bottom-color: #909399'
    },
    freClick() {
      this.$refs.bbb.style = this.$refs.bbb.style['borderBottomColor'] == 'rgb(64, 158, 255)' ? 'border-bottom-color: #909399' : 'border-bottom-color: #409eff'
      this.isShowFre = !this.isShowFre;
      this.isShowArea = false;
      this.$refs.aaa.style = 'border-bottom-color: #909399'
    },
    panelClick() {
      if (this.isShowArea) {
        this.isShowArea = false;
        this.$refs.aaa.style = 'border-bottom-color: #909399'
      }
      if (this.isShowFre){
        this.isShowFre = false;
        this.$refs.bbb.style = 'border-bottom-color: #909399'
      }  
    },
    guanbi() {
      this.$store.commit('endPanel')
    }
  },
};
</script>

<style scoped>
.satellite-information {
  width: 520px;
  /* height: 550px; */
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
}

.content .tab-control {
  padding-top: 2px;
  border-bottom: 1px solid white;
  height: 43px;
}

.tab-control button {
  background-color: #002236;
  color: #909399;
  border: none;
  outline: none;
  height: 41px;
  width: 100px;
  border-bottom: 1px solid white;
}

.tab-control button:hover {
  color: #409eff;
}

.tab-control .active {
  background-color: #3790ff;
  color: #fff !important;
  border-color: #3790ff;
}

.sat {
  text-align: center;
}

.satName{
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

input[type="text"] {
  outline: 0;
  border: 0;
  width: 140px;
  height: 28px;
  background-color: #002236;
  border-bottom: 1px solid #909399;
  padding-left: 20px;
}

input:focus {
  border-color: #3790ff;
}

input::placeholder {
  color: #d7d7d7;
  font-size: 16px;
}

.zhi {
  padding: 0 10px;
}

.clearBtn {
  color: #fff;
  font-size: 12px;
  background-color: #3790ff;
  outline: 0;
  border: 0;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.select-area,
.select-frequency {
  float: right;
}

.arr {
  transform: translateX(-20px);
}

.satCov {
  position: relative;
}

.selected-area,
.selected-fre {
  /* display: none; */
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  width: 140px;
  color: #606266;
  line-height: 34px;
  font-size: 14px;
  margin: 0;
  padding: 10px;
}

ul li {
  list-style: none;
  cursor: pointer;
}

li:hover {
  background-color: #f5f7fa;
}

.tri {
  width: 0;
  height: 0;
  position: absolute;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid white;
  /* margin-left: 130px; */
}

.selected-area{
  left: 100px;
  top: 60px;
}

.selected-fre{
  left: 280px;
  top: 60px;
}

.selected-area + .tri{
  left: 140px;
  top: 50px;
}

.selected-fre + .tri{
  left: 315px;
  top: 50px;
}
</style>