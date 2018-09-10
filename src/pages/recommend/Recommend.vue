<template>
  <div>
    <home-swiper :imgSrc="imgSrc"></home-swiper>
    <iconfont />
    <song-sheet />
  </div>
</template>

<script>
import HomeSwiper from '@/components/swiper'
import Iconfont from './Iconfont'
import SongSheet from './SongSheet'
import imgSrc from './imgSrc'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    Iconfont,
    SongSheet
  },
  data () {
    return {
      imgSrc
    }
  }
}
</script>

<style lang="stylus">
 @import '~styles/varibles.styl'
</style>
