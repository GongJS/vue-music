<template>
  <div id="app">
    <home-header />
    <router-view/>
  </div>
</template>

<script>
import HomeHeader from '@/components/Header'
export default {
  name: 'App',
  components: {
    HomeHeader
  }
}
</script>

<style></style>
