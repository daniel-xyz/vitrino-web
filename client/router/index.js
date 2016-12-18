import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import StoreWindow from '../components/StoreWindow.vue'
import Mapbox from '../components/Mapbox.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/store/window/:id',
      components: {
        main: StoreWindow,
        map: Mapbox
      }
    },
    {
      path: '/',
      components: {
        map: Mapbox
      }
    }
  ]
})