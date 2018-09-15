<template>
  <div class="wrapper border-bottom">
    <div class="item">
       <span class="iconfont font">&#xe62d;</span>
       <p style="margin-left:7px;">收藏热门50单曲</p>
    </div>
     <div class="item">
       <span class="iconfont font">&#xe666;</span>
       <p style="margin-left:2px;color:red;">多选</p>
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
    height 45px
    width 100%
    color #838383
    background white
    .item
      display flex
      justify-content center
      align-items center
      .font
        margin-left 5px
        font-size 18px
        color red
      p
        font-size 10px
        margin-left 10px
        margin-right 10px
      p:nth-child(1)
        margin-left 20px
</style>
