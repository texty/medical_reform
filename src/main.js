// import '@babel/polyfill'
/* import 'es6-promise/auto'
 */// import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
// import SvgTransition from 'vue-svg-transition';
/* import axios from 'axios'
 */// import VueAxios from 'vue-axios'
// import router from './router'
import VueRouter from 'vue-router'

import Table from './components/Table.vue'
import Bar from './components/HorizontalBarChart.vue'
// import App from './App.vue'


// import Text from '@/components/Text.vue'
import Home from './components/Home.vue'
// import BarPlots from './components/BarPlots'
import DoctorsTable from "./components/DoctorsTable.vue";
// import ProcurementPlots from './components/ProcurementPlots.vue'
import Header from "./components/Header.vue"
import Nagivation from "@/components/Navigation.vue"

import Footer from "./components/Footer.vue"
// import RoseChart from "./components/RoseChart.vue"




// data
/* import horizontalData from "./assets/rajon_stats.json";
 */


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { RoughEase } from 'gsap';

Vue.use(VueRouter)
Vue.use(BootstrapVue)
// Vue.use(SvgTransition);
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// Vue.component('text-element', Text)
Vue.component('footerM', Footer)
Vue.component('med-table', Table)
// Vue.component('horizontal-bar', Bar)
Vue.component('home', Home)
// Vue.component('bar-plots', BarPlots)
Vue.component('doctors-table', DoctorsTable)
// Vue.component('procurement-plots', ProcurementPlots)
Vue.component('headerM', Header)
Vue.component('navigation', Nagivation)

// Vue.component('rose-chart', RoseChart)


export const bus = new Vue();





const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/apteky',
      name: 'apteky',
      component: () => import("@/components/Apteky.vue")
    },
    {
      path: '/pharmacy',
      name: 'rose-chart',
      component: () => import("./components/RoseChart.vue"),
    },
    // {
    //   path: '/header',
    //   name: 'header',
    //   component: Header
    // },
    {
      path: '/text-element',
      name: 'text-element',
      component: () => import('@/components/Text.vue')
    },
    {
      path: '/med-table',
      name: 'med-table',
      component: Table,
    },
    {
      path: '/horizontal/',
      name: 'horizontal-bar',
      component: Bar,
      props: (route) => ({
        oblastProp: route.query.obl || "Київська",
        toDraw: true,
        variable: "declarations_ratio"
      }) 
      // props: true
      // props: {
      //   oblastProp: "Київська",
      //   toDraw: true, variable: "declarations_ratio"
      // },
    },
    {
      path: '/doctors',
      name: 'bar-plots',
      component: () => import("./components/BarPlots.vue")
    },
    {
      path: '/doctors-table',
      name: "doctors-table", 
      component: DoctorsTable

    },
    {
      path: '/procurement_plots',
      name: "procurement_plots", 
      component: () => import("./components/ProcurementPlots.vue"),
      props: (route) => ({
        incomingOblast: route.query.obl || "Київська",
      }) 
    },
    // {
    //   path: '/footer',
    //   name: 'footer',
    //   component: Footer,
    // }
  ]
})

new Vue({
  router,
  /* store, */
  // render: h => h(App)
}).$mount('#main')



// oblast names, take compare code from App.vue file

// Chernihiv Oblast
// Cherkasy Oblast
// Chernivtsi Oblast
// Dnipropetrovsk Oblast
// Donetsk Oblast
// Frankivsk Oblast
// Kharkiv Oblast
// Kherson Oblast
// Khmelnytskyi Oblast
// Kiev Oblast
// the oblast
// Kirovohrad Oblast
// Luhansk Oblast
// Lviv Oblast
// Mykolaiv Oblast
// Odessa Oblast
// Poltava Oblast
// Rivne Oblast
// Sumy Oblast
// Ternopil Oblast
// Vinnytsia Oblast
// Volyn Oblast
// Zakarpattia Oblast
// Zaporizhia Oblast
// Zhytomyr Oblast


// var coords = null

// if ("geolocation" in navigator) {
//   // Do something with coordinates returned
//   async function processCoords() {
//       let coord = await navigator.geolocation.getCurrentPosition
//       let latitude = await coord.coords.latitude;
//       let longitude = await coord.coords.longitude;

//       return {latitude, longitude}
//   }

//   // Fetch Coordinates
//   processCoords().then(d => (coords = d))

//   axios
//     .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`)
//     .then(response => (console.log(response.data.place_id)));
// }

// console.log(coords)


// axios
//   .get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=50.4367297&lon=35.5024426')
//   .then(response => (console.log(response.data.place_id)));
