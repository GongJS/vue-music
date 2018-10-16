<template>
  <div>
    <!--加载动画 -->
    <show-loading v-if="showLoading" />
    <!--歌曲列表信息 -->
    <div v-else
         class="song"
         ref="song">
      <scroll class="song-content"
              :data="songs"
              ref="scroll">
        <div>
          <div v-for="(item, index) in songs"
               :key="index"
               class="song-list border-bottom">
            <div class="content"
                 @click="selectItem(item, index)">
              <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="singer">
                  <span v-if="item.eq"
                        class="sq">SQ</span>
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
      </scroll>
    </div>
  </div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
import Scroll from '@/components/Scroll'
import { playlistMixin } from '@/mixin'
import { getSongDate } from '@/utils'
export default {
  name: 'SongList',
  mixins: [playlistMixin],
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
    ShowLoading,
    Scroll
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
    },
    // 当播放器变成mini播放器的时候，重新计算scroll的高度
    handlePlaylist (playlist) {
      if (playlist.length === 0 || this.showLoading === true) {
        return
      }
      const bottom = '102px'
      this.$refs.song.style.bottom = bottom
      this.$refs.scroll.refresh()
    }
  }
}
</script>
<style lang="stylus" scoped>
.song
  position fixed
  width 100%
  top 88px
  bottom 0
  .song-content
    height 100%
    overflow hidden
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
