<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~styles/varibles.styl'
  .tab
    display: flex
    justify-content space-around
    align-items center
    background #DF433A
    color #bfbfbf
    height px2Rem(45px)
    font-size: px2Rem(14px)
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: px2Rem(5px)
      &.router-link-active
        .tab-link
          color white
          border-bottom px2Rem(2px) solid white
</style>
