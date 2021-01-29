// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './util/filters'

Vue.config.productionTip = false
import vant_ui from 'vant'
Vue.use(vant_ui)
import "./assets/js/remScale"
import './assets/css/reset.css'
/* eslint-disable no-new */

for(let i in filters){
  Vue.filter(i,filters[i])
}

Vue.prototype.$imgUrl = 'http://localhost:3000'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
