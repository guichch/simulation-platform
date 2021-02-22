const mutations = {
  // 卫星信息面板
  startPanel(state) {
    state.satInfo.isShowPanel = true
  },
  endPanel(state) {
    state.satInfo.isShowPanel = false
  },
  startMiniPanel(state) {
    state.leftPanel.isShowMini = true
  },
  endMiniPanel(state) {
    state.leftPanel.isShowMini = false
  },
  setParams(state, payload) {
    state.satInfo.params = payload.options.attribute
  },
  setParamsEasy(state, payload) {
    state.satInfo.params = payload;
  },

  // 所有卫星信息面板
  showAllSat(state) {
    state.leftPanel.isShowAllSat = true
  },
  closeAllSat(state) {
    state.leftPanel.isShowAllSat = false
  },

  // 右侧信息面板
  showSitelliteResource(state) {
    state.rightPanel.isSelected = true
  },
  showThematicData(state) {
    state.rightPanel.isSelected = false
  },
  getSelectedSatName(state, payload) {
    state.rightPanel.selectedSatName = payload;
  },
  getSelectedOperator(state, payload) {
    state.rightPanel.selectedOperator = payload;
  },
  getSelectedOrbit(state, payload) {
    state.rightPanel.selectedOrbit = payload;
  },
  getSelectedLaunchTime(state, payload) {
    state.rightPanel.selectedLaunchTime = payload;
  },
  startLoading(state) {
    state.rightPanel.loading = true;
  },
  endLoading(state) {
    state.rightPanel.loading = false;
  },

  // 左侧信息面板
  startLegend(state) {
    state.leftPanel.isShowLegend = true;
  },
  endLegend(state) {
    state.leftPanel.isShowLegend = false;
  },
  startLegendMini(state) {
    state.leftPanel.isShowLegendMini = true;
  },
  endLegendMini(state) {
    state.leftPanel.isShowLegendMini = false;
  },
  startEarthPanel(state) {
    state.leftPanel.isShowEarthPanel = true;
  },
  endEarthPanel(state) {
    state.leftPanel.isShowEarthPanel = false;
  },
  setEarthInfo(state, payload) {
    state.leftPanel.earthPanelParams = payload;
  },

  // 底部面板
  setFootStatus(state, payload) {
    state.footPanel.longitude = payload.longitude;
    state.footPanel.latitude = payload.latitude;
    state.footPanel.isShow = payload.isShow;
  }
  
}

export default mutations