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
      <!--圆形碟片CD ||  歌词 -->
      <div class="middle"
           @click="switchLyric">
        <div class="disc"
             :class="cdCls"
             v-show="!showLyric">
          <div class="song-img"
               :style="`background-image:url(${currentSong.backImage})`"
               ref="rotate">
          </div>
        </div>
        <div class="func"
             v-show="!showLyric">
          <span class="iconfont">&#xe613;</span>
          <span class="iconfont">&#xe646;</span>
          <span class="iconfont">&#xe748;</span>
          <span class="iconfont">&#xe6b2;</span>
        </div>
        <scroll v-show="showLyric"
                class="lyric"
                v-if="currentLyric"
                :data="currentLyric && currentLyric.lines"
                ref="lyricList">
          <div class="lyric-wrapper">
            <div>
              <p ref="lyricLine"
                 class="text"
                 :class="{'current': currentLineNum ===index}"
                 v-for="(line, index) in currentLyric.lines"
                 :key="index">
                {{line.txt}}
              </p>
            </div>
          </div>
        </scroll>
      </div>
      <!--normal 播放器 -->
      <div class="footer">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent"
                          @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-r">{{format(totalDurationTime)}}</span>
        </div>
        <div class="bottom">
          <span class="iconfont"
                v-html="iconMode"
                @click="changeMode"></span>
          <span class="iconfont"
                @click="prev">&#xe6e1;</span>
          <span class="iconfont"
                style="font-size:60px;"
                @click="togglePlaying"
                v-html="playIcon"></span>
          <span class="iconfont"
                @click="next">&#xe718;</span>
          <span class="iconfont">&#xe802;</span>
        </div>
      </div>
    </div>
    <!--mini播放器 -->
    <div class="mini-player"
         v-show="!fullScreen"
         @click="openNormalPlayer">
      <img :src="currentSong.backImage" />
      <div class="info">
        <p>{{currentSong.name}}</p>
        <p>横滑可以切换上下首哦</p>
      </div>
      <div class="icon">
        <progress-circle :radius="radius"
                         :percent="percent">
          <span class="iconfont control-icon"
                @click.stop="togglePlaying"
                v-html="miniIcon"></span>
        </progress-circle>
        <span class="iconfont">&#xe802;</span>
      </div>
    </div>
    <audio :src="currentSong.playUrl"
           ref="normalPlay"
           @canplay="ready"
           @timeupdate="updateTime"
           @durationchange="durationTime"
           @ended="end"
           @error="error">您的浏览器不支持audio标签</audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getSongDate, shuffle } from '@/utils'
import { playMode } from '@/config'
import ProgressBar from '@/components/ProgressBar'
import ProgressCircle from '@/components/ProgressCircle'
import Scroll from '@/components/Scroll'
import Lyric from 'lyric-parser'
export default {
  name: 'Player',
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll
  },
  data () {
    return {
      songReady: false,
      currentTime: 0,
      totalDurationTime: 0,
      radius: 45,
      showLyric: false,
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: ''
    }
  },
  computed: {
    playIcon () {
      return this.playing ? '&#xe769;' : '&#xe696;'
    },
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    iconMode () {
      return this.mode === playMode.sequence ? '&#xe6aa;' : this.mode === playMode.loop ? '&#xe66d;' : '&#xe77d;'
    },
    miniIcon () {
      return this.playing ? '&#xe7af;' : '&#xe696;'
    },
    percent () {
      return this.currentTime / this.totalDurationTime
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'nextSong',
      'prevSong',
      'mode',
      'sequenceList'
    ])
  },
  watch: {
    async currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      // 延时1秒，是为了保证在微信端从后台切换到前台，audio的ready事件可以正常触发
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.playing) {
          this.$refs.normalPlay.play()
          this.getLyric()
        }
      }, 1000)
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.normalPlay
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setSong: 'SET_SONG',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'selectPlay'
    ]),
    // 页面后退
    back () {
      this.setFullScreen(false)
    },
    // 进入全屏播放器
    openNormalPlayer () {
      this.setFullScreen(true)
    },
    // audio歌曲准备完毕事件
    ready () {
      this.songReady = true
    },
    // audio歌曲发生错误事件
    error () {
      this.songReady = true
    },
    // 歌曲播放完毕触发事件
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    // 歌曲循环
    loop () {
      this.$refs.normalPlay.currentTime = 0
      this.$refs.normalPlay.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    // 改变播放模式
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 在切换播放模式的时候，找到原先播放的那首歌
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 下一曲
    async next () {
      // 先判断歌曲是否准备好 防止快速切换歌曲
      let currentSong = this.nextSong
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        // 因为vuex里的playlist里面没有保存歌曲的封面，url地址，歌手名称，所以在切换新歌曲的时候需要根据歌曲id获取相关信息
        if (this.nextSong.backImage === undefined) {
          const result = await getSongDate(this.nextSong)
          currentSong.backImage = result.backImage
          currentSong.singer = result.singer
          currentSong.playUrl = result.playUrl
          currentSong.lyric = result.lyric
          this.setSong(currentSong, index)
        }
        this.setCurrentIndex(index)
      }
      this.songReady = false
    },
    // 上一曲
    async prev () {
      // 先判断歌曲是否准备好 防止快速切换歌曲
      let currentSong = this.prevSong
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        // 因为vuex里的playlist里面没有保存歌曲的封面，url地址，歌手名称，歌词，所以在切换新歌曲的时候需要根据歌曲id获取相关信息
        if (this.nextSong.backImage === undefined) {
          const result = await getSongDate(this.nextSong)
          currentSong.backImage = result.backImage
          currentSong.singer = result.singer
          currentSong.playUrl = result.playUrl
          currentSong.lyric = result.lyric
          this.setSong(currentSong, index)
        }
        this.setCurrentIndex(index)
      }
      this.songReady = false
    },
    // 控制音乐播放与暂停
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 歌曲播放的当前时间
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    // 歌曲总时长
    durationTime (e) {
      this.totalDurationTime = e.target.duration
    },
    // 时间格式化
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    // 小数点补位
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 监听进度条滑动
    onProgressBarChange (percent) {
      const currentTime = this.totalDurationTime * percent
      this.$refs.normalPlay.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    // 切换歌词显示
    switchLyric () {
      this.showLyric = !this.showLyric
    },
    // 初始化歌词
    getLyric () {
      this.currentLyric = new Lyric(this.currentSong.lyric, this.handleLyric)
      this.currentLyric.play()
    },
    // 处理歌词显示效果
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    }
  },
  created () {
    if (this.currentSong.lyric) {
      this.getLyric()
    }
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
    background #222
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
    .middle
      height calc(100% - 200px)
      position relative
      z-index 100
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
        &.play
          animation rotate 20s linear infinite
        &.pause
          animation-play-state paused
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
      .func
        position absolute
        bottom 0px
        left 15%
        right 15%
        width 70%
        display flex
        justify-content space-around
        align-items center
        color white
        .iconfont
          font-size 20px
      .lyric
        display inline-block
        vertical-align top
        width 100%
        height 100%
        overflow hidden
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 32px
            color raba(255, 255, 255, 0.5)
            font-size 14px
            &.current
              color white
    .footer
      width 100%
      color white
      position absolute
      bottom 10px
      height 60px
      .progress-wrapper
        width 100%
        height 30px
        display flex
        align-items center
        .time
          flex 0 0 30px
          line-height 30px
          width 30px
          &.time-l
            text-align left
            padding-left 10px
          &.time-r
            text-align right
            padding-right 10px
        .progress-bar-wrapper
          flex 1
      .bottom
        width 80%
        margin 0 auto
        display flex
        justify-content space-around
        align-items center
        .iconfont
          font-size 20px
  .mini-player
    position fixed
    left 0
    bottom 0
    z-index 180
    width 100%
    height 50px
    display flex
    align-items center
    border-top 1px solid #f1e9e9
    background white
    img
      border-radius 10px
      padding 5px
      height 90%
    .info
      width 70%
      p
        padding 5px
    .icon
      width calc(30% - 45px)
      display flex
      align-content center
      justify-content space-around
      .iconfont
        font-size 0.6rem
        margin-right 5px
        font-weight lighter
      .control-icon
        position absolute
        top 0
        left 0
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)
</style>
