<template>
  <div class="player"
       v-show="playlist.length > 0">
    <!--全屏播放器 -->
    <div class="normal-player"
         v-show="fullScreen">
      <!--header -->
      <div class="header">
        <div class="back"
             @click="back">
          <span class="iconfont">&#xe72a;</span>
        </div>
        <div class="title">
          <p class="name">{{currentSong.name}}</p>
          <p class="singer">{{currentSong.singer}} ></p>
        </div>
        <div class="share">
          <span class="iconfont">&#xe643;</span>
        </div>
      </div>
      <!--背景图-->
      <div class="bg-blur">
        <img width="100%"
             height="100%"
             :src="currentSong.backImage">
      </div>
      <!--圆形碟片图 -->
      <div class="disc">
        <div class="song-img"
             :style="`background-image:url(${currentSong.backImage})`"
             ref="rotate">
        </div>
      </div>
      <!--底部播放器 -->
      <div class="footer">
        <div class="top">
          <span class="iconfont">&#xe613;</span>
          <span class="iconfont">&#xe646;</span>
          <span class="iconfont">&#xe748;</span>
          <span class="iconfont">&#xe6b2;</span>
        </div>
        <div class="range"></div>
        <div class="bottom">
          <span class="iconfont">&#xe66d;</span>
          <span class="iconfont">&#xe6e1;</span>
          <span class="iconfont"
                style="font-size:60px;">&#xe696;</span>
          <span class="iconfont">&#xe718;</span>
          <span class="iconfont">&#xe802;</span>
        </div>
      </div>
    </div>
    <!--mini播放器 -->
    <div class="mini-player"
         v-show="!fullScreen">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong'
    ])
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style lang="stylus" scoped>
.player
  position relative
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 200
    background black
    .header
      width 100%
      color white
      display flex
      align-items space-between
      height 40px
      .back
        width 20px
        line-height 40px
        margin-left 10px
      .title
        width calc(100% - 70px)
        margin-left 10px
        .name
          margin-top 10px
        .singer
          color white
          font-size 12px
          filter brightness(0.8)
          margin-top 3px
      .share
        width 30px
        line-height 40px
        margin-right 10px
    .bg-blur
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      opacity 0.6
      filter blur(20px)
    .disc
      position relativ
      margin-top 20%
      margin-left calc(((100% - 240px) / 2))
      width 240px
      height 240px
      border-radius 240px
      transform rotate(45deg)
      background-image radial-gradient(5em 8em ellipse, #fff, #000)
      border 2px solid #131313
      box-shadow 0 0 0 5px #343935
      opacity 0.7
      .song-img
        position absolute
        top 50%
        left 50%
        transform-origin center center
        transform translate(-50%, -50%) rotate(0deg)
        width 170px
        height 170px
        background-size cover
        background-repeat no-repeat
        background-position center
        border 2px solid #000
        border-radius 200px
    .footer
      width 100%
      color white
      position absolute
      bottom 0
      height 100px
      .top
        width 70%
        margin 0 auto
        display flex
        justify-content space-around
        align-items center
        .iconfont
          font-size 20px
      .range
        width 100%
        height 30px
      .bottom
        width 80%
        margin 0 auto
        display flex
        justify-content space-around
        align-items center
        .iconfont
          font-size 20px
</style>
