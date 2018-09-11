<template>
  <div id="app">
    <home-header v-show="this.$route.meta.showHeader"/>
    <home-tab v-show="this.$route.meta.showTab"/>
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
  }
}
</script>

<style></style>
