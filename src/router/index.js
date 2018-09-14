import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'
import Singer from '@/pages/singer/Singer'
import SingerDetail from '@/pages/singerDetail/SingerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      meta: {
        showHeader: true,
        showTab: true
      }
    },
    {
      path: '/singer',
      component: Singer,
      meta: {
        showHeader: false,
        showTab: false
      },
      children: [{
        path: '/singer/:id',
        component: SingerDetail
      }]
    }
  ]
})
