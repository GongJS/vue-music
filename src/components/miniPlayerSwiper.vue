<template>
  <div class="wrapper">
    <swiper :options="swiperOption"
            style="height:102px;"
            ref="mySwiper">
      <swiper-slide v-for="item of playlist"
                    :key="item.id"
                    style="height:102px;"
                    class="content">
        <img v-if="item.backImage"
             :src="item.backImage"
             style="width:90px;height:90px;" />
        <img v-else
             :src="currentSong.backImage"
             style="width:90px;height:90px;" />
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p v-if="showTip">横滑可以切换上下首哦</p>
          <p v-else
             class="lyric">{{playingLyric}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Swiper',
  components: {
    swiper,
    swiperSlide
  },
  props: ['songReady', 'playingLyric'],
  data () {
    return {
      showTip: true,
      swiperOption: {
        observer: true,
        observeParents: true,
        on: {
          // 右滑切歌
          slideNextTransitionEnd: () => {
            console.log(1)
            if (!this.songReady) {
              this.swiper.slideTo(this.currentIndex, 20, false)
              return
            }
            if (this.showTip === true) {
              this.showTip = false
            }
            this.$emit('next')
          },
          // 左滑切歌
          slidePrevTransitionEnd: () => {
            if (!this.songReady) {
              this.swiper.slideTo(this.currentIndex, 20, false)
              return
            }
            if (this.showTip === true) {
              this.showTip = false
            }
            this.$emit('prev')
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    ...mapGetters([
      'playlist',
      'currentSong',
      'currentIndex',
      'nextSong',
      'prevSong'
    ])
  },
  watch: {
    currentIndex () {
      this.swiper.slideTo(this.currentIndex, 0, false)
    }
  },
  mounted () {
    this.swiper.update()
  }
}
</script>
<style lang="stylus" scoped>
// 修改轮播图的小点点颜色
.wrapper >>> .swiper-pagination-bullet-active
  background #DF433A
.wrapper
  width 85%
  height 100%
  .content
    display flex
    align-items center
    height 102px
    img
      border-radius 10px
      padding 5px
      width 90px
      height 90px
    .info
      width 70%
      p
        padding 5px
        &.name
          font-size 13px
        &.lyric
          color #6B6B6B
          font-size 11px
</style>
