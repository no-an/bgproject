// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import element_ui from "element-ui"
Vue.use(element_ui)
import "../node_modules/element-ui/lib/theme-chalk/index.css"

//引入公用样式
import "./assets/css/reset.css"

//公共组件
import gcom from "./common"
for(let com in gcom){
  Vue.component(com,gcom[com])
}

Vue.prototype.$imgUrl = 'http://localhost:3000'


Vue.config.productionTip = false
/* eslint-disable no-new */
console.log(store);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
