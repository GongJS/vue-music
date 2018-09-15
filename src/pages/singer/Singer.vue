<template>
<div class="wrapper" @click="cancel">
  <div>
    <div class="header" :style="{opacity: opacity, display: isHidden}" >
      <router-link to="/recommend">
        <span class="iconfont font">&#xe72a;</span>
      </router-link>
      <span>华语男歌手-热门歌手</span>
      <span class="filter" @click.stop="filter">筛选</span>
    </div>
    <div class="singer" :style="{opacity: opacity, display: isHidden}">
      <scroll class="singer-content"
        :data="items"
        @scroll="scroll"
        :listenScroll="listenScroll"
        :probeType="probeType"
      >
        <div>
          <div v-for="item of items" :key="item.id" class="item" @click="selectSinger(item.id)">
            <img v-lazy="item.img1v1Url">
            <span>{{item.name}}</span>
            <div v-if="item.accountId" class="item-right">
              <span class="iconfont font">&#xe7ad;</span>
              <span>已入驻</span>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
  <div v-if="isFilter" class="filter-wrapper" @touchstart="touch">
     <singer-filter v-on:updateList="updateList" ></singer-filter>
  </div>
  <router-view @hiddenList="hiddenList"></router-view>
</div>
</template>

<script>
import Scroll from '@/components/Scroll'
import SingerFilter from './SingerFilter'
export default {
  name: 'Singer',
  components: {
    Scroll,
    SingerFilter
  },
  data () {
    return {
      items: [],
      hotItems: [],
      classifyItems: [],
      isFilter: false,
      concat: false,
      state: '热门歌手',
      isHidden: 'block',
      opacity: 1,
      offset: 0,
      scrollY: -400
    }
  },
  watch: {
    // 监听路由跳转，隐藏歌手列表
    '$route' (to, from) {
      if (to.path !== '/singer/') {

      } else {
        this.isHidden = 'block'
      }
    }
  },
  methods: {
    // 获取热门歌手
    async requestHot () {
      this.$http.get(`/top/artists?offset=1&limit=20`)
        .then(res => {
          let newItems = []
          if (res.status === 200) {
            for (let i = 0; i < res.data.artists.length; i++) {
              newItems.push(res.data.artists[i])
            }
            if (this.concat === false) {
              this.hotItems = []
            } else {
              this.scrollY = this.scrollY - res.data.artists.length * 53
            }
            this.isFilter = false
            this.opacity = 1
            this.hotItems = this.hotItems.concat(newItems)
            this.items = this.hotItems
          }
        })
    },
    // 按字母排列获取歌手
    async requestClassify (params) {
      this.$http.get(`/artist/list?cat=1001&initial=${params}&offset=${this.offset}&limit=20`)
        .then(res => {
          let newItems = []
          if (res.status === 200) {
            for (let i = 0; i < res.data.artists.length; i++) {
              newItems.push(res.data.artists[i])
            }
            if (this.concat === false) {
              this.classifyItems = []
            } else {
              this.scrollY = this.scrollY - res.data.artists.length * 53
            }
            this.classifyItems = this.classifyItems.concat(newItems)
            this.items = this.classifyItems
          }
        })
    },
    updateList (data) {
      this.state = data
      this.isFilter = false
      this.opacity = 1
      this.concat = false
      this.scrollY = -400
      if (data === '热门歌手') {
        this.requestHot()
      } else {
        this.requestClassify(data)
      }
    },
    filter () {
      this.isFilter = !this.isFilter
      if (this.opacity === 1) {
        this.opacity = 0.4
      } else {
        this.opacity = 1
      }
    },
    cancel () {
      if (this.isFilter === false) {
      } else {
        this.isFilter = false
        this.opacity = 1
      }
    },
    touch () {
      this.isFilter = false
      this.opacity = 1
    },
    scroll (pos) {
      let data = this.state
      if (pos.y <= this.scrollY) {
        this.offset = this.offset + 1
        this.concat = true
        if (data === '热门歌手') {
          this.requestHot()
        } else {
          this.requestClassify(data)
        }
      } else if (pos.y >= 20) {
        this.offset = 0
        this.concat = false
        if (data === '热门歌手') {
          this.requestHot()
        } else {
          this.requestClassify(data)
        }
      } else {}
    },
    selectSinger (id) {
      this.$router.push({
        path: `/singer/${id}`
      })
      this.isHidden = 'none'
    },
    // 子组件通知父组件隐藏歌手列表
    hiddenList () {
      this.isHidden = 'none'
    }
  },
  created () {
    this.requestHot()
    this.listenScroll = true
    this.probeType = 2
  }
}
</script>

<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
  .wrapper
  position relative
  display flex
  justify-content center
  align-items center
    .header
      height 45px
      background #DF433A
      width 100%
      line-height 45px
      .font
        font-size 18px
      .filter
        position absolute
        right 5px
      span
        display inline-block
        margin-left 10px
        margin-right 5px
        font-size 12px
        color white
    .singer
      position fixed
      width 100%
      top 45px
      bottom 0
      display none
      .singer-content
        height: 100%
        overflow: hidden
        .item
          display flex
          align-items center
          height 52px
          width 100%
          border-bottom 1px solid #F9F5F5
          position relative
          span
            margin-left 10px
          .item-right
            display flex
            align-items center
            position absolute
            right 5px
            .font
              color #DF433A
              font-size 18px
            span:nth-child(2)
              font-size 2px
              display inline-block
              margin-right 15px
              margin-left 5px
              color #BEBEBE
          img
            height 46px
            width 46px
            margin-left 5px
            border-radius 4px
    .filter-wrapper
      position absolute
      display flex
      justify-content center
      align-items center
      height 100%
      width  100%
</style>
