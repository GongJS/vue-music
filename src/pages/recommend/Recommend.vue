<template>
  <div class="recommend">
    <scroll  class="recommend-content" :data="banners">
      <div>
        <swiper :banners="banners"></swiper>
        <iconfont />
        <home-item
          v-for="(item, index) in items"
          :key="index"
          :title="item.title"
          :url="item.url"
        >
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
export default {
  name: 'Home',
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
 @import '~styles/varibles.styl'
    .recommend
      position fixed
      width 100%
      top 85px
      bottom 0
      .recommend-content
        height: 100%
        overflow: hidden
</style>
