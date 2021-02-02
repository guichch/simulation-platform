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
  }
}

export default mutations