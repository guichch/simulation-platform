const mutations = {
  showSitelliteResource(state) {
    state.isSelected = true
  },
  showThematicData(state) {
    state.isSelected = false
  },
  startPanel(state) {
    state.satInfo.isShowPanel = true
  },
  endPanel(state) {
    state.satInfo.isShowPanel = false
  },
  setParams(state, payload) {
    state.satInfo.params = payload.options.attribute
  },
  setParamsEasy(state, payload) {
    state.satInfo.params = payload;
  },
  showAllSat(state) {
    state.isShowAllSat = true
  },
  closeAllSat(state) {
    state.isShowAllSat = false
  },
  // 右侧面板卫星信息
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
  }
}

export default mutations