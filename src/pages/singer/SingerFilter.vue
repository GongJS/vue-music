<template>
  <div class="filter" @touchstart.stop>
    <div class="title" @click.stop>请选择</div>
    <scroll :data="alphabets" class="filter-content"
      :listenScroll="listenScroll"
      @scroll="scroll"
    >
      <div>
          <div v-for="(item,index) of alphabets" class="item"
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
      state: ''
    }
  },
  methods: {
    selectItem (data) {
      console.log(data)
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
    scroll (pos) {
      console.log(pos)
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
 @import '~styles/varibles.styl'
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
        border-bottom 1px solid #F9F5F5
</style>
