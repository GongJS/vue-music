// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import 'lib-flexible'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'

Vue.config.productionTip = false
fastClick.attach(document.body)
let loading = document.getElementById('ajaxLoading')
Vue.prototype.$isShowLoading = loading
Vue.prototype.$http = axios
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
