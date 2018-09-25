<template>
  <div class="albums">
    <!--加载动画-->
    <show-loading v-if="showLoading"/>
    <div v-else>
      <!--专辑列表信息-->
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
  props: ['inputData', 'showLoading', 'inputState'],
  components: {
    ShowLoading
  },
  data () {
    return {
      showMask: true, // 控制遮罩层
      albums: [] // 专辑数据
    }
  },
  watch: {
    inputState () {
      // 数据输入完才发起请求
      this.requestAlbum()
    }
  },
  methods: {
    // 获取专辑
    async requestAlbum () {
      console.log(this.inputData)
      const result = await getData(`/search?keywords=${this.inputData}&type=10`)
      let items = []
      if (result.code === 200) {
        for (let i = 0; i < result.result.albums.length; i++) {
          items.push(result.result.albums[i])
        }
        this.albums = items
      }
      this.showLoading = false
    },
    // 时间格式转换
    formatTime (time) {
      let date = new Date(time)
      return date.toLocaleString().slice(0, 8).replace(/\//g, '.')
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
