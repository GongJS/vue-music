<template>
  <div>
     <div class="header">
       <router-link to="/recommend">
         <span class="iconfont font">&#xe72a;</span>
       </router-link>
        <span>华语男歌手-热门歌手</span>
        <span class="position">筛选</span>
     </div>
  </div>
</template>

<script>
export default {
  name: 'SingerHeader'

}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .header
    display flex
    align-items center
    position relative
    height px2Rem(45px)
    background #DF433A
    width 100%
    .font
      font-size px2Rem(18px)
    .position
      position absolute
      right px2Rem(5px)
    span
      display inline-block
      margin-left px2Rem(10px)
      margin-right px2Rem(5px)
      font-size px2Rem(12px)
      color white
</style>
