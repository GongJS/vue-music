<template>
  <div class="recommend">
    <scroll  class="recommend-content" :data="banners">
      <div>
        <swiper :banners="banners"></swiper>
        <iconfont />
        <song-sheet />
        <tv-station />
      </div>
    </scroll>
  </div>
</template>

<script>
import Swiper from '@/components/swiper'
import Iconfont from './Iconfont'
import SongSheet from './SongSheet'
import TvStation from './TvStation'
import Scroll from '@/components/Scroll'
export default {
  name: 'Home',
  components: {
    Swiper,
    Iconfont,
    SongSheet,
    TvStation,
    Scroll
  },
  data () {
    return {
      banners: []
    }
  },
  methods: {
    // 获取轮播图
    async requestBanner (id) {
      this.$http.get('/banner')
        .then(res => {
          let items = []
          if (res.status === 200) {
            for (let i = 0; i < res.data.banners.length; i++) {
              items.push(res.data.banners[i].picUrl)
            }
            this.banners = items
          }
        })
    }
  },
  created () {
    this.requestBanner()
  }
}
</script>

<style lang="stylus" scoped>
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
