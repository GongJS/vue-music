<template>
  <div id="app">
    <home-header />
    <home-tab />
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
