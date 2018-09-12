<template>
  <div class="filter">
    <div class="title">请选择</div>
    <scroll :data="alphabets" class="filter-content">
      <div>
          <div v-for="(item,index) of alphabets" :key="index" class="item">
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
  created () {
    this.alphabets = ['热门选择', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }
}
</script>

<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
  .filter
    position fixed
    background white
    width 80%
    top px2Rem(10px)
    bottom px2Rem(10px)
    box-shadow 2px 2px 2px #c8c8c8
    overflow: hidden
    .title
      height px2Rem(40px)
      line-height px2Rem(40px)
      margin-left px2Rem(15px)
    .filter-content
      height: 100%
      overflow: hidden
      .item
        height px2Rem(30px)
        line-height px2Rem(30px)
        margin-left px2Rem(15px)
        border-bottom px2Rem(1px) solid #F9F5F5
</style>
