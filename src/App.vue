<template>
  <div id="app">
    <home-header v-show="this.$route.meta.showHeader"/>
    <home-tab v-show="this.$route.meta.showTab" :tabs="tabs"/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from '@/components/Header'
import HomeTab from '@/components/Tab'
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeTab
  },
  created () {
    this.tabs = [
      {title: '推荐', path: '/recommend'},
      {title: '歌手', path: '/singer'},
      {title: '电台', path: '/radio'}
    ]
  }
}
</script>

<style></style>
