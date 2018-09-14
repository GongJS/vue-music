<template>
    <div class="singer-detail">
      <div class="back" @click="back">
        xxxx
      </div>
      <h1  class="title">{{name}} </h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
      </div>
      <tab ref="tab" class="tab"></tab>
      <scroll
        :data="songs"
        :startScroll="startScroll"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        @scroll="scroll"
        class="list"
        ref="list"
      >
        <div>
          <collect></collect>
          <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
          </div>
        </div>
      </scroll>
      </div>
</template>

<script>
import Tab from './Tab'
import Collect from './Collect'
import Scroll from '@/components/Scroll'
import SongList from './SongList'
export default {
  name: 'SingerDetail',
  components: {
    Tab,
    Collect,
    Scroll,
    SongList
  },
  data () {
    return {
      songs: [],
      bgImage: '',
      name: '',
      scrollY: 0
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
      console.log(77, translateY)
      if (translateY > -210) {
        this.$refs.tab.$el.style.transform = `translate3d(0,${translateY}px,0)`
      }
      console.log(777, this.scrollY, this.minTranslateY)
      if (this.scrollY < this.minTranslateY) {
        zIndex = 10
        this.$refs.tab.$el.style.transform = 'translate3d(0,-30px,0)'
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${77}px`
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  methods: {
    // 获取歌曲
    async requestSinger (id) {
      this.$http.get(`/artists?id=${id}`)
        .then(res => {
          let items = []
          if (res.status === 200) {
            this.bgImage = res.data.artist.picUrl
            this.name = res.data.artist.name
            for (let i = 0; i < res.data.hotSongs.length; i++) {
              items.push(res.data.hotSongs[i])
            }
            this.songs = items
          }
        })
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      console.log(2)
    }

  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.startScroll = false
    this.requestSinger(this.$route.params.id)
  },
  mounted () {
    this.$nextTick(() => {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + 40
      this.$refs.list.$el.style.top = `${this.imageHeight + 40}px`
    })
  }
}
</script>

<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      text-align: center
      line-height: 40px
      font-size: 14px
      color: red
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
    .tab
      position: relative
      background white
      height 40px
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      margin-top px2Rem(-1px)
    .tab
      background white
      z-index 40
 </style>
