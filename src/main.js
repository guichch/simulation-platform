import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import buildModuleUrl from 'cesium/Source/Core/buildModuleUrl'
import 'normalize.css'


// 地图插件
import 'cesium/Source/Widgets/widgets.css'
import 'leaflet/dist/leaflet.css'


// elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


buildModuleUrl.setBaseUrl('./Cesium/')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
