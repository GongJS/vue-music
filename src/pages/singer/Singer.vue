<template>
<div  @click="cancel">
  <div>
    <!--header -->
    <div class="header">
      <router-link to="/search/singerclassify">
        <span class="iconfont">&#xe72a;</span>
      </router-link>
      <span v-if="title === '热门歌手'">热门歌手</span>
      <span v-else>{{title}}-{{state ? state.toLocaleUpperCase() : ''}}</span>
      <span class="filter" @click.stop="filter">筛选</span>
    </div>
    <!--遮罩层 -->
    <div class="masklayer"
      ref="masklayer"
      v-show="isFilter"
    ></div>
    <!--歌手列表信息 -->
    <div class="singer">
      <scroll class="singer-content"
        :data="items"
        :listenScroll="listenScroll"
        :probeType="probeType"
        :pullup="pullup"
        @scroll="scroll"
        @scrollToEnd="scrollToEnd"
      >
        <div>
          <div v-for="item of items" :key="item.id" class="item" @click="selectSinger(item.id)">
            <img v-lazy="item.img1v1Url">
            <span>{{item.name}}</span>
            <div v-if="item.accountId" class="item-right">
              <span class="iconfont">&#xe7ad;</span>
              <span>已入驻</span>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
  <!--歌手筛选列表 A B C 。。。。-->
  <div v-if="isFilter" class="filter-wrapper" @touchstart="touch">
     <singer-filter v-on:updateList="updateList" :title="title" :changeState="state"></singer-filter>
  </div>
  <!--加载动画 -->
  <show-loading v-show="showloading" class="loading"/>
</div>
</template>

<script>
import Scroll from '@/components/Scroll'
import SingerFilter from './SingerFilter'
import ShowLoading from '@/components/ShowLoading'
import {getData} from '@/utils'
export default {
  name: 'Singer',
  components: {
    Scroll,
    SingerFilter,
    ShowLoading
  },
  data () {
    return {
      items: [], // 存放歌手数据
      isFilter: false, // 是否显示遮罩层
      concat: true, // 是否拼接数据，用于下拉加载数据
      title: '', // 歌手大分类（header）
      state: 'a', // 歌手细分类 （header）
      cat: 0, // 查询歌手分类参数
      offset: 0, // 数据偏移量
      showloading: true // 是否显示加载动画
    }
  },
  methods: {
    // 获取歌手(热门歌手和字母分类歌手封装在一个函数里)
    async request (offset, cat, initial) {
      let newUrl = ''
      let newInitial = initial === undefined ? 'a' : initial
      if (cat === 0) { // 请求热门歌手
        newUrl = `/top/artists?&offset=${offset}&limit=20`
      } else {
        newUrl = `/artist/list?cat=${cat}&initial=${newInitial}&offset=${offset}&limit=20`
      }
      const result = await getData(newUrl)
      let newItems = []
      for (let i = 0; i < result.artists.length; i++) {
        newItems.push(result.artists[i])
      }
      this.showloading = false
      if (this.concat === false) {
        this.items = []
      }
      this.items = this.items.concat(newItems)
    },
    // 根据筛选列表的选项更新数据
    updateList (data) {
      this.state = data
      this.isFilter = false
      this.concat = false
      this.showloading = true
      this.offset = 0
      if (data === '热门歌手') {
        this.title = data
        this.request(this.offset, 0)
      } else {
        this.request(this.offset, this.cat, data)
      }
    },
    // 筛选列表开关
    filter () {
      this.isFilter = !this.isFilter
    },
    // 关闭筛选列表  click
    cancel () {
      if (this.isFilter === false) {
      } else {
        this.isFilter = false
      }
    },
    // 关闭筛选列表 touch
    touch () {
      this.isFilter = false
    },
    // 监听滚轮
    scroll (pos) {

    },
    // 滚轮滑到底部监听事件
    scrollToEnd () {
      this.offset = this.offset + 20
      // 后台限制数据最多获取100条
      if (this.offset < 100) {
        this.concat = true
        this.showloading = true
        // 判是否是热门歌手
        if (this.cat === 0) {
          this.request(this.offset, 0)
        } else {
          this.request(this.offset, this.cat)
        }
      }
    },
    // 根据选中的歌手跳转到相应的页面
    selectSinger (id) {
      let cat = this.cat
      this.$router.push({
        path: '/search/singerclassify/singer/singerdetail/',
        query: {id, cat}
      })
    }
  },
  created () {
    this.cat = this.$route.query.cat
    this.title = this.$route.query.title
    if (this.cat === 0) {
      this.title = '热门歌手'
    }
    this.request(this.offset, this.cat)
    this.listenScroll = true // 派发滚动事件
    this.probeType = 2 // 滚动实时派发scroll事件，不会截流
    this.pullup = true // 派发滚动到底部的事件，用于上拉加载
  },
  activated () {
    this.offset = 0
    this.concat = false
    this.title = this.$route.query.title
    if (this.title !== '热门歌手') {
      this.state = 'a'
    }
    // 判断是否需要重新获取数据
    if (this.cat !== this.$route.query.cat) {
      this.cat = this.$route.query.cat
      this.request(this.offset, this.cat)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .header
      height 45px
      background #DF433A
      width 100%
      line-height 45px
      .iconfont
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
    .masklayer
      position absolute
      z-index 1
      top 0
      bottom 0
      left 0
      right 0
      background-color: rgba(0,0,0,0.7)
    .singer
      position fixed
      width 100%
      top 45px
      bottom 0
      .singer-content
        height: 100%
        overflow: hidden
        .loading
          position fixed
          bottom 0
          z-index 2
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
            .iconfont
              color #DF433A
              font-size 18px
            span:nth-child(2)
              font-size 10px
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
      z-index 2
    .loading
      position fixed
      bottom 0
      z-index 2
      width 100%
      margin 0 auto
</style>
