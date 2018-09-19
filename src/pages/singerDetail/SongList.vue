<template>
  <div class="song">
   <show-loading v-if="showLoading"/>
   <div v-else>
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
      <div v-for="(item, index) in songs" :key="index" class="song-list border-bottom">
        <div class="content">
          <div class="index">{{index + 1}}</div>
          <div class="info">
            <div class="name">{{item.al.name}}</div>
            <div class="singer">
              <span v-if="item.eq" class="sq">SQ</span>
              <span>{{name}}</span>
              <span v-if="item.alia.length">{{item.alia[0]}}</span>
            </div>
          </div>
        </div>
        <div class="play">
          <span class="iconfont font">&#xe6f6;</span>
          <span class="iconfont font">&#xe6b2;</span>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
export default {
  name: 'SongList',
  props: ['id'],
  components: {
    ShowLoading
  },
  data () {
    return {
      albumSize: 0,
      bgImage: '',
      name: '',
      songs: [],
      showLoading: true
    }
  },
  methods: {
    // 获取歌手信息/热门歌曲
    async requestSinger (id) {
      this.$http.get(`/artists?id=${id}`)
        .then(res => {
          let items = []
          if (res.status === 200) {
            this.albumSize = res.data.artist.albumSize
            this.bgImage = res.data.artist.picUrl
            this.name = res.data.artist.name
            for (let i = 0; i < res.data.hotSongs.length; i++) {
              items.push(res.data.hotSongs[i])
            }
            this.songs = items
            this.showLoading = false
            this.$emit('singerDate', [this.name, this.bgImage])
          }
        })
    }
  },
  created () {
    this.requestSinger(this.id)
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
       .font
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
        .font
          font-size 14px
</style>
