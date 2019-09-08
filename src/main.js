// import '@babel/polyfill'
/* import 'es6-promise/auto'
 */// import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
// import store from './store'
// import SvgTransition from 'vue-svg-transition';
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import router from './router'
import VueRouter from 'vue-router'

import Table from './components/Table.vue'
import Bar from './components/HorizontalBarChart.vue'

import App from './App.vue'
import Home from './components/Home.vue'
import BarPlots from './components/BarPlots'


// data
/* import horizontalData from "./assets/rajon_stats.json";
 */


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Vue.use(SvgTransition);
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.component('app', App)
Vue.component('med-table', Table)
Vue.component('horizontal-bar', Bar)
Vue.component('home', Home)
Vue.component('bar-plots', BarPlots)




const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/app',
      name: 'app',
      component: App
    },
    {
      path: '/med',
      name: 'med-table',
      component: Table,
    },
    {
      path: '/horizontal',
      name: 'horizontal-bar',
      component: Bar,
      props: {
        oblastProp: "Київська",
        toDraw: true, variable: "declarations_ratio"
      },
    },
    {
      path: '/doctors',
      name: 'bar-plots',
      component: BarPlots
    }
  ]
})

new Vue({
  router,
  // render: h => h(App)
}).$mount('#main')

