<template>
  <div class="song">
    <!--加载动画-->
    <show-loading v-if="showLoading" />
    <div v-else>
      <!--标题-->
      <div class="wrapper border-bottom">
        <div class="item">
          <span class="iconfont">&#xe62d;</span>
          <p style="margin-left:7px;">收藏热门50单曲</p>
        </div>
        <div class="item">
          <span class="iconfont">&#xe666;</span>
          <p style="margin-left:2px;color:red;">多选</p>
        </div>
      </div>
      <!--歌曲列表信息-->
      <div v-for="(item, index) in songs"
           :key="index"
           class="song-list border-bottom">
        <div class="content"
             @click="selectItem(item, index)">
          <div class="index">{{index + 1}}</div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="singer">
              <span v-if="item.eq"
                    class="sq">SQ</span>
              <span>{{name}}</span>
              <span v-if="item.alia.length">{{item.alia[0]}}</span>
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
import { getSongDate } from '@/utils'
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
  },
  methods: {
    async selectItem (item, index) {
      // 因为vuex里的playlist里面没有保存歌曲的封面，url地址，歌手名称，歌词，所以在切换新歌曲的时候需要根据歌曲id获取相关信息
      if (item.backImage !== undefined) {
        return
      }
      let backImage
      let playUrl
      let lyric
      const result = await getSongDate(item)
      backImage = result.backImage
      playUrl = result.playUrl
      lyric = result.lyric
      this.$emit('select', backImage, playUrl, index, lyric)
    }
  }
}
</script>
<style lang="stylus" scoped>
.song
  background white
  min-height 800px
  .wrapper
    display flex
    justify-content space-between
    align-content center
    box-sizing border-box
    height 45px
    width 100%
    color #838383
    .item
      display flex
      justify-content center
      align-items center
    .iconfont
      margin-left 5px
      font-size 20px
      color red
    p
      font-size 12px
      margin-left 10px
      margin-right 10px
    p:nth-child(1)
      margin-left 20px
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
      .index
        display flex
        justify-content center
        align-items center
        width 30px
        height 100%
        color #B0B0B0
        float left
        line-height 45px
      .info
        display flex
        align-items center
        flex-wrap wrap
        height 100%
        .name
          display flex
          align-items center
          height 17px
          margin-top 8px
          width 100%
          color #535353
          font-size 12px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        .singer
          display flex
          align-items center
          height 17px
          margin-bottom 8px
          font-size 10px
          color #9D9D9D
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
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
