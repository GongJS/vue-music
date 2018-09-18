<template>
<div  @click="cancel">
  <div>
    <div class="header" :style="{display: isHidden}" >
      <router-link to="/recommend">
        <span class="iconfont font">&#xe72a;</span>
      </router-link>
      <span>华语男歌手-{{state ? state.toLocaleUpperCase() : ''}}</span>
      <span class="filter" @click.stop="filter">筛选</span>
    </div>
    <div class="masklayer"
      ref="masklayer"
      v-show="isFilter"
    ></div>
    <div class="singer" :style="{display: isHidden}">
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
  <show-loading v-show="showloading" class="loading"/>
</div>
</template>

<script>
import Scroll from '@/components/Scroll'
import SingerFilter from './SingerFilter'
import ShowLoading from '@/components/ShowLoading'
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
      state: '热门歌手', // 歌手分类
      isHidden: 'block', // 是否隐藏歌手列表
      offset: 0, // 数据偏移量
      showloading: true // 是否显示加载动画
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
    // 获取歌手(热门歌手和字母分类歌手封装在一个函数里)
    async request (offset, params) {
      let newUrl = ''
      if (params === undefined) { // 请求热门歌手
        newUrl = `/top/artists?offset=${offset}&limit=20`
      } else {
        newUrl = `/artist/list?cat=1001&initial=${params}&offset=${this.offset}&limit=20`
      }
      this.$http.get(newUrl)
        .then(res => {
          let newItems = []
          if (res.status === 200) {
            for (let i = 0; i < res.data.artists.length; i++) {
              newItems.push(res.data.artists[i])
            }
            this.showloading = false
            if (this.concat === false) {
              this.items = []
            }
            this.items = this.items.concat(newItems)
          }
        })
    },
    // 根据筛选列表的选项更新数据
    updateList (data) {
      this.state = data
      this.isFilter = false
      this.concat = false
      this.showloading = true
      this.offset = 0
      if (data === '热门歌手') {
        this.request(this.offse)
      } else {
        this.request(this.offset, data)
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
        this.request(this.offset)
      }
    },
    // 根据选中的歌手跳转到相应的页面
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
    this.request(this.offset)
    this.listenScroll = true // 派发滚动事件
    this.probeType = 2 // 滚动实时派发scroll事件，不会截流
    this.pullup = true // 派发滚动到底部的事件，用于上拉加载
  }
}
</script>

<style lang="stylus" scoped>
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
      display none
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
            .font
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
