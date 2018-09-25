<template>
  <div class="song">
   <!--加载动画 -->
   <show-loading v-if="showLoading"/>
   <div v-else>
      <!--歌曲列表信息 -->
      <div v-for="(item, index) in songs" :key="index" class="song-list border-bottom">
        <div class="content">
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="singer">
              <span v-if="item.eq" class="sq">SQ</span>
              <span class="artists">{{item.artists[0].name}}-</span>
              <span class="artists">{{item.album.name}}</span>
            </div>
          </div>
        </div>
        <div class="play">
          <span class="iconfont">&#xe6f6;</span>
          <span class="iconfont">&#xe6b2;</span>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
export default {
  name: 'SongList',
  props: {
    // 歌手名称
    name: {
      type: String,
      default: ''
    },
    // 搜索的关键词
    searchName: {
      type: String,
      default: ''
    },
    // 歌曲数据
    songs: {
      type: Array
    },
    // 是否显示加载动画
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ShowLoading
  }
}
</script>
<style lang="stylus" scoped>
  .song
    background white
    min-height 800px
    .song-list
      height 45px
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      .content
        display flex
        align-items center
        height 45px
        width calc(100% - 50px)
        .info
          display flex
          align-items center
          flex-wrap wrap
          height 100%
          margin-left 5px
          .name
            display flex
            align-items center
            height 17px
            margin-top 8px
            width 100%
            color #55669A
            font-size 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          .singer
            display flex
            align-items center
            height 17px
            margin-bottom 8px
            font-size 10px
            color #9D9D9D
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            .artists
              color #7A7A7A
            .sq
              border 1px solid #F6BC91
              color #F38115
      .play
        display flex
        justify-content space-around
        align-items center
        height 45px
        width 50px
        color #B0B0B0
        .iconfont
          font-size 14px
</style>
