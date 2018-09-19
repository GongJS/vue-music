<template>
  <div class="filter" @touchstart.stop>
    <div class="title" @click.stop :style="{borderBottom: hasBorder}">请选择</div>
    <scroll :data="alphabets" class="filter-content"
      :listenScroll="listenScroll"
      @scroll="scroll"
    >
      <div>
          <div v-for="(item,index) of alphabets" class="item border-bottom"
             :key="index"
             @click.stop="selectItem(item)"
           >
           {{item}}
          </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
export default {
  name: 'SingerFilter',
  components: {
    Scroll
  },
  data () {
    return {
      state: '', // 当前的选择状态
      hasBorder: '' // 滑动的时候是否显示下边框
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
      console.log(pos)
      if (pos.y < -10) {
        this.hasBorder = '1px solid #f9f5f5'
      } else {
        this.hasBorder = ''
      }
    }
  },
  created () {
    this.alphabets = ['热门歌手', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    this.listenScroll = true
  }
}
</script>

<style lang="stylus" scoped>
  .filter
    position fixed
    background white
    width 80%
    top 10px
    bottom 10px
    box-shadow 1px 1px 1px #f9f5f5
    overflow: hidden
    .title
      height 40px
      line-height 40px
      margin-left 15px
    .filter-content
      height: 100%
      overflow: hidden
      .item
        height 30px
        line-height 30px
        margin-left 15px
</style>
