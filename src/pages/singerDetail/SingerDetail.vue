<template>
    <div class="singer-detail" >
      <div class="header" @click="back">
         <div class="back">
          <span class="iconfont">&#xe72a;</span>
          <span class="title">{{name}}</span>
        </div>
        <div class="share">
          <div class="hidden" v-show="isHidden === 'none'">
            <span class="iconfont">&#xe632;</span>
            <span style="font-size:0.25rem;">收藏</span>
          </div>
          <div>
            <span class="iconfont" @click.stop="share">&#xe643;</span>
          </div>
        </div>
      </div>
      <div class="homepage" ref="homepage" :style="{display: isHidden}">
        <p class="collect">
          <span class="iconfont">&#xe632;</span>
          <span>收藏</span>
        </p>
        <p class="page">
          <span class="iconfont">&#xe607;</span>
          <span class="user">个人主页</span>
        </p>
      </div>
      <div class="bg-image" :style="bgStyle" @load="loadImage" ref="bgImage">
      </div>
      <singer-tab
        ref="tab"
        class="tab"
        :tabs="tabs"
        :flag="flag"
        @switchTab="switchTab"
      >
      </singer-tab>
      <transition name="list-fade">
      <scroll
        :data="[bgImage]"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        @scroll="scroll"
        class="list"
        ref="list"
      >
        <div>
          <div class="song-list-wrapper">
            <keep-alive>
              <song-list v-if="songState" :id="id"></song-list>
              <album-list v-else-if="albumState" :id="id"></album-list>
              <singer-info  v-else-if="singerInfoState" :id="id" :name="name"></singer-info>
              <vedio v-else/>
            </keep-alive>
          </div>
        </div>
      </scroll>
      </transition>
    </div>
</template>

<script>
import SingerTab from '@/components/Tab'
import Scroll from '@/components/Scroll'
import SongList from './SongList'
import AlbumList from './AlbumList'
import SingerInfo from './singerInfo'
import Vedio from './Vedio'
import {getData} from '@/utils'
export default {
  name: 'SingerDetail',
  components: {
    Scroll,
    SongList,
    AlbumList,
    SingerInfo,
    Vedio,
    SingerTab
  },
  data () {
    return {
      id: 0, // 歌手id
      cat: '', // 歌手分类
      bgImage: '', // 背景图地址
      name: '', // 歌手名称
      scrollY: 0, // 滚轮位置
      isHidden: '', // 控制“收藏” “个人主页” 显示
      songState: true, // tab切换状态  热门演唱  专辑  视频  个人信息
      albumState: false,
      singerInfoState: false,
      vedioState: false,
      showLoading: true,
      url: 'artists'
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  watch: {
    scrollY () {
      let translateY = Math.max(this.minTranslateY, this.scrollY)
      let zIndex = 0
      let scale = 1
      let opacity = 1
      let brightness = 1
      const percent = Math.abs(this.scrollY / this.imageHeight)
      brightness = 1 - percent < 0.2 ? 0.2 : 1 - percent// 保留一点图片亮度
      opacity = 1 - percent
      this.$refs.bgImage.style.filter = `brightness(${brightness})`
      this.$refs.tab.$el.style.transform = `translate3d(0,${translateY}px,0)`
      this.$refs.homepage.style.transform = `translate3d(0,${translateY}px,0)`
      this.$refs.homepage.style.opacity = `${opacity}`
      // 向下拖动可放大图片
      if (this.scrollY > 0) {
        scale = 1 + percent
        zIndex = 10
      }
      // 限制向上拖动的最大距离
      if (this.scrollY < this.minTranslateY || this.scrollY === this.minTranslateY) {
        zIndex = 10
        this.$refs.tab.$el.style.transform = 'translate3d(0,0,0)'
        this.$refs.bgImage.style.paddingTop = 0
        this.isHidden = 'none'
        this.$refs.bgImage.style.height = `1rem`
      } else {
        this.isHidden = ''
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style.transform = `scale(${scale})`
    }
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.go(-1)
    },
    share () {
      console.log('分享')
    },
    switchTab (data) {
      this.songState = false
      this.albumState = false
      this.singerInfoState = false
      this.vedioState = false
      if (data === '热门演唱') {
        this.songState = true
      } else if (data === '专辑') {
        this.albumState = true
      } else if (data === '艺人信息') {
        this.singerInfoState = true
      } else if (data === '视频') {
        this.vedioState = true
      } else {
        console.log('no tab')
      }
      // 在第一次切换tab的时候，加载完数据滑动到原先的位置
      setTimeout(() => {
        this.$refs.list.scrollTo(0, this.scrollY)
      }, 20)
    },
    // 图片加载完重新刷新  better-scroll  防止无法拖动
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.list.refresh()
      }
    },
    async request () {
      const result = await getData(this.url, this.id)
      this.showLoading = false
      this.bgImage = result.artist.picUrl
      this.name = result.artist.name
    }
  },
  created () {
    // 设置scroll相关信息
    this.probeType = 3
    this.listenScroll = true
    // 获取歌手ID
    this.id = this.$route.query.id
    this.cat = this.$route.query.cat
    // 设置tab相关信息
    this.tabs = [
      {title: '热门演唱'},
      {title: '专辑'},
      {title: '视频'},
      {title: '艺人信息'}
    ]
    this.flag = true
    this.request()
  },
  mounted () {
    this.$nextTick(() => {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight * 0.847
      this.$refs.list.$el.style.top = `${this.imageHeight * 1.152}px`
    })
  },
  activated () {
    if (this.id !== this.$route.query.id) {
      this.id = this.$route.query.id
      this.request()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    .header
      position absolute
      display flex
      justify-content space-between
      top: 0
      left: 10px
      right: 6px
      z-index: 50
      color white
      line-height 40px
      font-size 16px
      .back
        display flex
        justify-content space-around
        .iconfont
          font-size  20px
          margin-right 10px
      .share
        display flex
        justify-content space-around
        align-items center
        .hidden
          display flex
          justify-content space-around
          align-items center
          background #E14537
          height 25px
          width 50px
          border-radius 0.5rem 0.5rem 0.5rem 0.5rem
          font-size 16px
          margin-right 15px
          padding 0 5px
        .iconfont
          font-size  20px
          margin-right 10px
    .homepage
      position absolute
      z-index 50
      display flex
      justify-content space-around
      align-items center
      height 40px
      top 32%
      left 20%
      right 20%
      margin 0 auto
      background transparent
      color white
      .collect
        background #E14537
        display flex
        justify-content space-around
        align-items center
        width 80px
        height 25px
        border-radius 0.5rem 0.5rem 0.5rem 0.5rem
        .iconfont
          font-size 20px
      .page
        display flex
        justify-content space-around
        align-items center
        width 80px
        height 25px
        border-radius 0.5rem 0.5rem 0.5rem 0.5rem
        border 1px solid white
        .iconfont
          font-size 20px
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size: cover
    .tab
      position: relative
      background white
      height 40px
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      margin-top -1px
 </style>
