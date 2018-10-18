<template>
  <div class="recommend"
       ref="recommend">
    <scroll class="recommend-content"
            ref="scroll"
            :data="banners">
      <div>
        <swiper :banners="banners"></swiper>
        <iconfont />
        <home-item v-for="(item, index) in items"
                   :key="index"
                   :title="item.title"
                   :url="item.url">
        </home-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import Swiper from '@/components/swiper'
import Iconfont from './Iconfont'
import Scroll from '@/components/Scroll'
import HomeItem from '@/components/HomeItem'
import { getData } from '@/utils'
import { playlistMixin } from '@/mixin'
export default {
  name: 'Home',
  mixins: [playlistMixin],
  components: {
    Swiper,
    Iconfont,
    Scroll,
    HomeItem
  },
  data () {
    return {
      banners: []
    }
  },
  methods: {
    // 获取轮播图
    async requestBanner () {
      const result = await getData('/banner')
      let items = []
      for (let i = 0; i < result.banners.length; i++) {
        items.push(result.banners[i].picUrl)
      }
      this.banners = items
    },
    // 当播放器变成mini播放器的时候，重新计算scroll的高度
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '102px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    }
  },
  created () {
    this.requestBanner()
    // 定义传给子组件homeitem数据
    this.title = ''
    this.url = ''
    this.items = [
      {
        title: '推荐歌单',
        url: 'personalized'
      },
      {
        title: '推荐电台',
        url: '/personalized/djprogram'
      }
    ]
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  position fixed
  width 100%
  top 85px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
</style>
