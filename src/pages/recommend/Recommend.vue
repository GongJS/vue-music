<template>
  <div class="recommend">
    <scroll  class="recommend-content" :data="imgSrc">
      <div>
        <home-swiper :imgSrc="imgSrc"></home-swiper>
        <iconfont />
        <song-sheet />
        <tv-station />
      </div>
    </scroll>
  </div>
</template>

<script>
import HomeSwiper from '@/components/swiper'
import Iconfont from './Iconfont'
import SongSheet from './SongSheet'
import TvStation from './TvStation'
import Scroll from '@/components/Scroll'
import imgSrc from './imgSrc'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    Iconfont,
    SongSheet,
    TvStation,
    Scroll
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
    .recommend
      position fixed
      width 100%
      top 90px
      bottom 0
      .recommend-content
        height: 100%
        overflow: hidden
</style>
