<template>
  <div class="wrapper border-bottom">
    <div class="item">
      <span class="iconfont font">&#xe689;</span>
       <p class="">私人FM</p>
    </div>
     <div class="item">
      <span class="iconfont font">&#xe65b;</span>
       <p class="">每日推荐</p>
    </div>
     <div class="item">
      <span class="iconfont font">&#xe675;</span>
       <p class="">歌单</p>
    </div>
     <div class="item">
      <span class="iconfont font">&#xe642;</span>
       <p class="">排行榜</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Iconfont'
}
</script>

<style lang="stylus" scoped>
  .wrapper
    display flex
    justify-content space-around
    height 90px
    width 100%
    .item
      position relative
      background #DF433A
      width 48px
      height 48px
      border-radius 50%
      display flex
      justify-content center
      align-items center
      flex-wrap wrap
      color white
      box-shadow 2px 2px 2px #888888
      margin-top 10px
      .font
        font-size 22px
      p
        color #5c5c5c
        position absolute
        font-size 10px
        height 16px
        top 52px
</style>
