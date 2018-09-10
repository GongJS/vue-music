import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    }
  ]
})
