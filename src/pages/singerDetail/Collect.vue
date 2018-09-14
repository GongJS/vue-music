<template>
  <div class="wrapper">
    <div class="item">
       <span class="iconfont font">&#xe689;</span>
       <p class="">收藏热门50单曲</p>
    </div>
     <div class="item">
       <span class="iconfont font">&#xe689;</span>
       <p class="">多选</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Collect'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .wrapper
    display flex
    justify-content space-between
    align-content center
    box-sizing border-box
    height px2Rem(45px)
    width 100%
    border-bottom px2Rem(1px) solid #EFF3F4
    color #838383
    background white
    .item
      display flex
      justify-content center
      align-items center
      .font
        margin-left px2Rem(10px)
      p
        font-size px2Rem(10px)
        margin-left px2Rem(10px)
        margin-right px2Rem(10px)
      p:nth-child(1)
        margin-left px2Rem(20)px
</style>
