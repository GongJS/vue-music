import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/recommend/Recommend'
import Friends from '@/pages/friends/Friends'
import Radios from '@/pages/radios/Radios'
import Local from '@/pages/local/Local'
import Music from '@/pages/music/Music'
import Search from '@/pages/search/Search'
import SingerClassify from '@/pages/singerClassify/SingerClassify'

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
      component: Local,
      meta: {
        showHeader: true,
        showTab: false
      }
    },
    {
      path: '/music',
      component: Music,
      meta: {
        showHeader: true,
        showTab: false
      }
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
      path: '/search',
      component: Search
    },
    {
      path: '/search/singerclassify',
      component: SingerClassify
    },
    {
      path: '/search/singerclassify/singer',
      component: (resolve) => { require(['@/pages/singer/Singer'], resolve) }
    },
    {
      path: '/search/singerclassify/singer/singerdetail',
      component: (resolve) => { require(['@/pages/singerDetail/SingerDetail'], resolve) }
    }
  ]
})
