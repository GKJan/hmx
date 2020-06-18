import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import './element.scss'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.api = api

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === '/login' || to.path === '/wx' || to.path === '/wx/login') {
    return next()
  }
  if (localStorage.getItem('userInfo')) {
    next()
  } else {
    if (window.isPhone()) {
      next('/wx/login')
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
