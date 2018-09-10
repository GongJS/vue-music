<template>
<div>
  <div class="header">
    <div class="header-left">
       <span class="iconfont font">&#xeed4;</span>
    </div>
    <div class="header-center">
      <router-link tag="div" to="/local">
         <span class="iconfont font">&#xe680;</span>
      </router-link>
      <router-link tag="div" to="/home">
       <span class="iconfont font">&#xe674;</span>
      </router-link>
      <router-link tag="div" to="/music">
       <span class="iconfont font">&#xe6f6;</span>
      </router-link>
    </div>
    <div class="header-right">
      <span class="iconfont font">&#xe678;</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
    .header
      display flex
      justify-content space-between
      align-items center
      background #DF433A
      color #bfbfbf
      height 45px
      width 100%
      .header-left
        display flex
        justify-content center
        align-items center
        color white
        width px2Rem(50px)
        .font
          font-size px2Rem(18px)
      .header-center
        width px2Rem(120px)
        display flex
        justify-content space-between
        align-items center
          .font
            font-size px2Rem(18px)
      .router-link-active
        color white
      .header-right
        display flex
        justify-content center
        align-items center
        color white
        width px2Rem(50px)
        .font
          font-size px2Rem(18px)
</style>
