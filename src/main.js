import '@babel/polyfill'
import 'es6-promise/auto'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import SvgTransition from 'vue-svg-transition';
import axios from 'axios'
import VueAxios from 'vue-axios'
// import router from './router'
import VueRouter from 'vue-router'

import Table from './components/Table.vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(SvgTransition);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.component('app', App)
Vue.component('med-table', Table)


const router = new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   // name: 'app',
    //   component: App
    // },
    {
      path: '/med',
      name: 'med-table',
      component: Table
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#main')

