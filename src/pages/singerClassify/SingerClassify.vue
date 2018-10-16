<template>
  <div class="classify">
    <div class="header">
      <router-link to="/search"
                   class="back">
        <span class="iconfont">&#xe72a;</span>
      </router-link>
      <div class="title">歌手分类</div>
    </div>
    <div class="scroll"
         ref="classify"
         @click="handleClick">
      <scroll class="scroll-content"
              :data="singerClassifys"
              ref="singerClassify">
        <!--列表嵌套循环 -->
        <div>
          <div v-for="(items,index) in singerClassifys"
               :key="index"
               class="items">
            <div v-for="(item, index) in items"
                 :key="index"
                 class="item"
                 :data-cat="item.cat"
                 :data-title="item.title">
              {{item.title}}
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
import { playlistMixin } from '@/mixin'
export default {
  name: 'SingerClassify',
  mixins: [playlistMixin],
  components: {
    Scroll
  },
  methods: {
    handleClick (e) {
      let cat = Number(e.target.getAttribute('data-cat'))
      let title = e.target.getAttribute('data-title')
      this.$router.push({
        path: `/search/singerclassify/singer/`,
        query: {
          cat,
          title
        }
      })
    },
    // 当播放器变成mini播放器的时候，重新计算scroll的高度
    handlePlaylist (playlist) {
      if (playlist.length === 0) {
        return
      }
      const bottom = '102px'
      this.$refs.classify.style.bottom = bottom
      this.$refs.singerClassify.refresh()
    }
  },
  created () {
    this.singerClassifys = [
      [
        { title: '热门歌手', cat: '' }
      ],
      [
        { title: '华语男歌手', cat: '1001' },
        { title: '华语女歌手', cat: '1002' },
        { title: '华语乐队/组合', cat: '1003' }
      ],
      [
        { title: '欧美男歌手', cat: '2001' },
        { title: '欧美女歌手', cat: '2002' },
        { title: '欧美乐队/组合', cat: '2003' }
      ],
      [
        { title: '日本男歌手', cat: '6001' },
        { title: '日本女歌手', cat: '6002' },
        { title: '日本乐队/组合', cat: '6003' }
      ],
      [
        { title: '韩国男歌手', cat: '7001' },
        { title: '韩国女歌手', cat: '7002' },
        { title: '韩国乐队/组合', cat: '7003' }
      ],
      [
        { title: '其他男歌手', cat: '4001' },
        { title: '其他女歌手', cat: '4002' },
        { title: '其他乐队/组合', cat: '4002' }
      ]
    ]
  }
}
</script>

<style lang="stylus" scoped>
.classify
  width 100%
  .header
    display flex
    justify-content space-between
    align-items center
    height 45px
    width 100%
    color white
    background #DF433A
    .back
      display flex
      justify-content center
      align-items center
      width 50px
      height 100%
      font-weight bold
      color white
    .title
      width calc(100% - 50px)
      color white
      font-size 14px
  .scroll
    position fixed
    width 100%
    top 45px
    bottom 0
    background #F5F5F5
    .scroll-content
      height 100%
      overflow hidden
      .items
        background white
        color #252525
        width 100%
        margin 10px 0
        .item
          height 45px
          line-height 45px
          padding-left 10px
</style>
