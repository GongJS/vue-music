import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'
import Singer from '@/pages/singer/Singer'
import SingerDetail from '@/pages/singerDetail/SingerDetail'
import Friends from '@/pages/friends/Friends'
import Radios from '@/pages/radios/Radios'
import Local from '@/pages/local/Local'
import Music from '@/pages/music/Music'

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
      path: '/local',
      component: Local
    },
    {
      path: '/music',
      component: Music
    },
    {
      path: '/friends',
      component: Friends,
      meta: {
        showHeader: true,
        showTab: true
      }
    },
    {
      path: '/radios',
      component: Radios,
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
