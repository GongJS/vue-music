<template>
  <div class="filter"
       @touchstart.stop>
    <div class="title"
         @click.stop
         :style="{borderBottom: hasBorder}">
      <p>请选择</p>
    </div>
    <div class="content"
         ref="filter">
      <scroll :data="alphabets"
              class="filter-content"
              :listenScroll="listenScroll"
              ref="scroll"
              @scroll="scroll">
        <div>
          <div v-for="(item,index) of alphabets"
               class="item border-bottom"
               :key="index"
               @click.stop="selectItem(item)">
            {{item}}
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
import { playlistMixin } from '@/mixin'
export default {
  name: 'SingerFilter',
  mixins: [playlistMixin],
  props: ['title', 'changeState'],
  components: {
    Scroll
  },
  data () {
    return {
      state: '', // 当前的选择状态
      hasBorder: '', // 滑动的时候是否显示下边框
      alphabets: ['热门歌手', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  watch: {
    changeState () {
      if (this.state === '热门歌手') {
        this.alphabets = this.alphabets.slice(0, 1)
      }
    }
  },
  methods: {
    selectItem (data) {
      if (data === this.state) {
        return
      }
      if (data === '热门歌手') {
        this.state = '热门歌手'
        this.$emit('updateList', data)
      } else {
        this.state = data
        let params = data.toLocaleLowerCase()
        this.$emit('updateList', params)
      }
    },
    // 监听滚轮
    scroll (pos) {
      if (pos.y < -10) {
        this.hasBorder = '1px solid #f9f5f5'
      } else {
        this.hasBorder = ''
      }
    },
    // 当播放器变成mini播放器的时候，重新计算scroll的高度
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '112px' : ''
      this.$refs.filter.style.bottom = bottom
      this.$refs.scroll.refresh()
    }
  },
  created () {
    this.listenScroll = true
    if (this.changeState === '热门歌手' || this.title === '热门歌手') {
      this.alphabets = this.alphabets.slice(0, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.filter
  position relative
  background white
  width 80%
  left 10%
  top 10px
  bottom 40px
  z-index 100
  .title
    position fixed
    top 10px
    height 40px
    background white
    left 10%
    width 80%
    line-height 40px
    z-index 10
    p
      margin-left 15px
  .content
    position fixed
    background white
    width 80%
    top 50px
    bottom 10px
  .filter-content
    height 100%
    overflow hidden
    .item
      height 30px
      line-height 30px
      margin-left 15px
</style>
