<template>
  <div id="app">
    <home-header v-show="this.$route.meta.showHeader" @showSlideLogin="showSlideLogin"/>
    <home-tab v-show="this.$route.meta.showTab" :tabs="tabs"/>
    <div class="login" v-show="hidden">
      <slideLogin @confirmLogin="confirmLogin"></slideLogin>
    </div>
    <!--遮罩层 -->
    <div class="masklayer"
      v-show="hidden"
      @click="handleClick"
      @touchstart="handleTouch"
    ></div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from '@/components/Header'
import HomeTab from '@/components/Tab'
import SlideLogin from '@/pages/slideLogin/SlideLogin'
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeTab,
    SlideLogin
  },
  data () {
    return {
      hidden: false
    }
  },
  methods: {
    showSlideLogin () {
      this.hidden = true
    },
    confirmLogin () {
      this.hidden = false
    },
    handleClick () {
      this.hidden = false
    },
    handleTouch () {
      this.hidden = false
    }
  },
  created () {
    this.tabs = [
      {title: '推荐', path: '/recommend'},
      {title: '朋友', path: '/friends'},
      {title: '电台', path: '/radios'}
    ]
  }
}
</script>

<style lang="stylus" scoped>
    .login
      position absolute
      background white
      left 0
      top 0
      bottom 0
      right 50px
      z-index 2
    .masklayer
      position absolute
      z-index 1
      top 0
      bottom 0
      left 0
      right 0
      background-color: rgba(0,0,0,0.7)
</style>
