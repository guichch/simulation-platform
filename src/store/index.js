import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/mutations'

Vue.use(Vuex)

const SERVER = '121.31.6.255'
const SERVER2 = '121.31.6.255'
const USER_SERVER = 'http://'+SERVER+':8117/sysman-fast/sys'
const REGISTER = 'http://'+SERVER+':8087/register'
const POST_GIS_SERVER = 'http://' + SERVER + ':8071'
const API_SERVER = 'http://' + SERVER + ':8072'
const PROXY_SERVER = 'http://' + SERVER + ':8888'
const GEO_SERVER = 'http://' + SERVER2 + ':8020'

export default new Vuex.Store({
  state: {
    isSelected: true,
    
    POST_GIS_SERVER,
    USER_SERVER,
    REGISTER,
    POST_GIS_SERVER_URL: POST_GIS_SERVER + '/api',
    API_SERVER,
    API_SERVER_URL: API_SERVER + '/wt',
    GEO_SERVER,
    PROXY_SERVER,
    satInfo: {
      isShowPanel: false,
      params: '',
    },
    isShowAllSat: false
  },
  getters: {

  },
  mutations,
  actions: {
  },
  modules: {
  }
})
