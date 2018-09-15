<template>
  <div class="song-list">
    <div v-for="(item, index) in songs" :key="index" class="items border-bottom">
      <div class="index">{{index + 1}}</div>
      <div class="item">
        <div class="song">{{item.al.name}}</div>
        <div class="singer">
          <span v-if="item.eq" class="sq">SQ</span>
          <span>{{name}}</span>
          <span v-if="item.alia.length">{{item.alia[0]}}</span>
        </div>
      </div>
      <div class="play">
        <span class="iconfont font">&#xe6f6;</span>
        <span class="iconfont font">&#xe6b2;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: ['songs', 'name']
}
</script>
<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
  .song-list
    background white
    .items
      height 48px
      box-sizing border-box
      .index
        display flex
        justify-content center
        align-items center
        width 30px
        float left
        height 100%
        color #B0B0B0
      .item
        display flex
        align-items center
        flex-wrap: wrap
        height 100%
        float left
        .song
          display flex
          align-items flex-end
          width 100%
          height 50%
          margin-bottom 4px
          color #535353
        .singer
          height 50%
          margin-top 2px
          font-size 8px
          color #9D9D9D
          .sq
            border 1px solid #F6BC91
            color #F38115
      .play
        display flex
        justify-content space-around
        align-items center
        float right
        height 100%
        width 50px
        color #B0B0B0
</style>
