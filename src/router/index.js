import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import Table from '@/components/Table.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'App',
    //   component: App
    // },
    {
      path: '/table',
      name: 'Table',
      component: Table
    }
  ]
})