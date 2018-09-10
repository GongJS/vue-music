<template>
<div>
  <div class="header">
    <div class="header-left">
        <span class="iconfont">&#xe61b;</span>
    </div>
    <div class="header-center">
      <span class="iconfont">&#xe680;</span>
      <span class="iconfont">&#xe674;</span>
      <span class="iconfont">&#xe6f6;</span>
    </div>
    <div class="header-right">
      <span class="iconfont">&#xe678;</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style lang="stylus">
  @import '~styles/varibles.styl'
    .header
      display flex
      justify-content space-between
      align-items center
      background #DF433A
      height 45px
      width 100%
      .header-left
        display flex
        justify-content center
        align-items center
        width px2Rem(50px)
        font-size px2Rem(24px)
      .header-center
        display flex
        justify-content space-between
        width px2Rem(120px)
      .header-right
        display flex
        justify-content center
        align-items center
        width px2Rem(50px)
        font-size px2Rem(24px)
</style>
