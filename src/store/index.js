import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/mutations'

Vue.use(Vuex)

const SERVER = '121.31.6.255'
const USER_SERVER = 'http://'+SERVER+':8117/sysman-fast/sys'
const REGISTER = 'http://'+SERVER+':8087/register'
const POST_GIS_SERVER = 'http://' + SERVER + ':8071'
const API_SERVER = 'http://' + SERVER + ':8072'
const PROXY_SERVER = 'http://' + SERVER + ':8888'
const GEO_SERVER = 'http://' + SERVER + ':8020'

export default new Vuex.Store({
  state: {
    
    // 服务器接口
    POST_GIS_SERVER,
    USER_SERVER,
    REGISTER,
    POST_GIS_SERVER_URL: POST_GIS_SERVER + '/api',
    API_SERVER,
    API_SERVER_URL: API_SERVER + '/wt',
    GEO_SERVER,
    PROXY_SERVER,

    // 卫星信息面板
    satInfo: {
      isShowPanel: false,
      params: '',
    },
    
    // 右侧面板
    rightPanel: {
      isSelected: true,
      selectedSatName: '',
      selectedOperator: '',
      selectedOrbit: '',
      selectedLaunchTime: '',
      loading: false
    },

    // 左侧面板
    leftPanel: {
      isShowMini: false,
      isShowLegend: false,
      isShowLegendMini: true,
      isShowAllSat2d: false,
      isShowAllSat3d: false,
      isShowEarthPanel: false,
      earthPanelParams: ''
    },

    // 底部面板
    footPanel: {
      latitude: 0.0000,
      longitude: 0.0000,
      isShow: false
    }
  },
  getters: {

  },
  mutations,
  actions: {
  },
  modules: {
  }
})
