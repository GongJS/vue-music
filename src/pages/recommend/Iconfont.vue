<template>
  <div class="wrapper">
     <div class="item">
       <span class="iconfont font">&#xe689;</span>
    </div>
      <div class="item">
       <span class="iconfont font">&#xe65b;</span>
    </div>
     <div class="item">
       <span class="iconfont font">&#xe675;</span>
    </div>
     <div class="item">
       <span class="iconfont font">&#xe642;</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Iconfont'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .wrapper
    display flex
    justify-content space-around
    align-items center
    height 90px
    width 100%
    border-bottom px2Rem(1px) solid #EFF3F4
    .item
     background #DF433A
     width px2Rem(45px)
     height px2Rem(45px)
     border-radius 50%
     display flex
     justify-content center
     align-items center
     color white
     box-shadow 2px 2px 2px #888888
     .font
       font-size px2Rem(22px)
</style>
