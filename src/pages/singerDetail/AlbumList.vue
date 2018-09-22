<template>
  <div class="albums">
    <show-loading v-if="showLoading"/>
    <div v-else>
      <div class="header border-bottom">
        <div class="item">
          <p style="margin-left:7px;">按发行时间排序</p>
        </div>
        <div class="item">
          <span class="iconfont">&#xe603;</span>
        </div>
      </div>
      <div v-for="item in albums" :key="item.id" class="album-list">
        <div v-show="showMask" class="mask"></div>
        <div class="albumImg">
          <img v-lazy="item.blurPicUrl" />
        </div>
        <div class="info border-bottom">
          <p class="name">{{item.name}}</p>
          <p class="date">
            {{formatTime(item.publishTime)}} 歌曲 {{item.size}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
import {getData} from '@/utils'
export default {
  name: 'AlbumList',
  props: ['id'],
  components: {
    ShowLoading
  },
  data () {
    return {
      showMask: false, // 控制遮罩层
      albums: [], // 专辑数据
      showLoading: true // 是否显示加载状态
    }
  },
  watch: {
    id () {
      this.requestAlbum()
    }
  },
  methods: {
    // 获取专辑
    async requestAlbum () {
      const result = await getData('/artist/album', this.id)
      let items = []
      for (let i = 0; i < result.hotAlbums.length; i++) {
        items.push(result.hotAlbums[i])
      }
      this.albums = items
      this.showLoading = false
    },
    // 时间格式转换
    formatTime (time) {
      let date = new Date(time)
      return date.toLocaleString().slice(0, 8).replace(/\//, '.')
    }
  },
  created () {
    this.requestAlbum()
  }
}
</script>
<style lang="stylus" scoped>
  .albums
    background white
    min-height 800px
    .header
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
        height 50px
        .iconfont
          margin-right 10px
          color #323232
    .album-list
      position relative
      display flex
      align-content center
      margin-left 5px
      .mask
        position absolute
        width 46px
        height 46px
        background black
        border-radius 50%
        left 6px
        top 2x
      .albumImg
        position relative
        z-index 2
        display flex
        justify-content center
        align-content center
        img
          border-radius 5px
          height 45px
          width 45px
      .info
        display flex
        align-content center
        flex-wrap wrap
        margin-left 10px
        .name
          width 100%
          height 50%
          line-height 25px
          color #4E4E4E
          font-size 12px
        .date
          line-height 25px
          color #A5A5A5
          height 50%
          font-size 9px
</style>
