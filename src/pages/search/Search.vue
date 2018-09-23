<template>
  <div class="search" @click="cancalFrame" ref="search">
    <!--搜索框 -->
    <div class="header" @click.stop>
      <div class="back" @click="back">
        <span class="iconfont">&#xe72a;</span>
      </div>
      <div class="input">
        <input v-model="inputData" @focus="handleFocus"/>
        <span v-if="showDelete" @click="handleDelete" class="iconfont delete">&#xe61a;</span>
      </div>
    </div>
    <router-link tag="div" class="classify border-bottom" to="/search/singerclassify">
      <span class="iconfont fontSize">&#xe607;</span>
      <span>歌手分类</span>
      <span class="iconfont">&#xe624;</span>
    </router-link>
    <div class="hotSearch">
      <span class="title">
        热门搜索
      </span>
      <div class="hotItems">
        <span v-for="(item, index) in hotsSearch" :key="index" class="item">
          {{item}}
        </span>
      </div>
    </div>
    <!--搜索建议 -->
    <div class="frame" v-show="showFrame" @click="handleSearch">
      <p  :data-search="inputData" class="title border-bottom">搜索 "{{inputData}}"</p>
      <p v-for="item in suggestContent"
        :key="item.id"
        :data-search="item.name"
        :data-singer="item.artists[0].name"
        class="title border-bottom"
      >
         <span class="iconfont">&#xe678;</span>
         {{item.name}} {{item.artists[0].name}}
      </p>
    </div>
    <!--搜索记录 -->
    <div
      class="searchHistory border-bottom"
      v-for="(item, index) in searchHistory"
      :key="index"
    >
       <span class="iconfont">&#xe636;</span>
       <span class="content">{{item}}</span>
       <span @click="deleteHistory(item)" class="iconfont delete">&#xe61a;</span>
    </div>
  </div>
</template>

<script>
import {getData} from '@/utils'
export default {
  name: 'Search',
  data () {
    return {
      inputData: '', // input框数据
      showDelete: false, // 是否显示删除符
      showFrame: false, // 是否显示下拉搜索框
      oldUrl: '', // 上一个页面地址
      hotsSearch: [], // 热门搜索内容
      suggestContent: [], // 建议搜索内容（下拉框里显示）
      searchHistory: [] // 搜索记录
    }
  },
  watch: {
    inputData () {
      if (this.inputData !== '') {
        this.requestSuggestContent()
        this.showDelete = true
        this.showFrame = true
      } else {
        this.showDelete = false
        this.showFrame = false
      }
    }
  },
  methods: {
    // 清除输入
    handleDelete () {
      this.inputData = ''
    },
    // 关闭下拉搜索框
    cancalFrame () {
      this.showFrame = false
    },
    // 跳转到上一个页面
    back () {
      this.$router.push({
        path: this.oldUrl
      })
    },
    // 处理input的焦点事件
    handleFocus () {
      if (this.inputData !== '') {
        this.showFrame = true
      }
    },
    // 获取热门搜索
    async requestHotSearch () {
      const result = await getData('/search/hot')
      if (result.code === 200) {
        let items = []
        for (let i = 0; i < result.result.hots.length; i++) {
          items.push(result.result.hots[i].first)
        }
        this.hotsSearch = items
      }
    },
    // 获取建议搜索内容
    async requestSuggestContent () {
      const result = await getData(`/search/suggest?keywords=${this.inputData}&limit=30`)
      if (result.code === 200) {
        let items = []
        for (let i = 0; i < result.result.songs.length; i++) {
          items.push(result.result.songs[i])
        }
        this.suggestContent = items
      }
    },
    handleSearch (e) {
      // 用户搜索记录存到localStorage里面
      let searchHistory = []
      if (localStorage.getItem('searchHistory') !== null) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
      }
      // 判断搜索内容是否包含歌手名字
      if (e.target.getAttribute('data-singer')) {
        this.inputData = e.target.getAttribute('data-search') + ' ' + e.target.getAttribute('data-singer')
      }
      // 判断该搜索记录是否已经存在
      let result = searchHistory.some((item, index) => {
        if (item === this.inputData) {
          return true
        }
      })
      if (result === true) { return }
      searchHistory.unshift(this.inputData)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
      this.inputData = ''
      this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    },
    // 删除历史记录
    deleteHistory (deleteData) {
      let arr = JSON.parse(localStorage.getItem('searchHistory'))
      let len = arr.length
      for (let i = 0; i < len; i++) {
        if (arr[i] === deleteData) {
          arr.splice(i, 1)
        }
      }
      this.searchHistory = arr
      localStorage.setItem('searchHistory', JSON.stringify(arr))
    }
  },
  created () {
    this.requestHotSearch()
  },
  mounted () {
    // 设置当前的页面高度，这样在点击页面的其他地方时候，可以隐藏下拉搜索框
    this.innerHeight = window.innerHeight
    this.$refs.search.style.height = `${this.innerHeight}px`
  },
  activated () {
    // 从localStorage读取搜索记录
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      if (from.path === '/search/singerclassify') {
        return
      }
      vm.oldUrl = from.path
    })
  }
}
</script>

<style lang="stylus" scoped>
.search
  background white
  width 100%
  height 231px
  position relative
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
    .input
      display flex
      position relative
      align-items center
      width calc(100% - 50px)
      height 100%
      input
        color #FEB0AE
        background #DF433A
        border-bottom 1px solid #FEB0AE
        width calc(100% - 10px)
        font-size 12px
        padding-bottom 2px
      .delete
        position absolute
        right 10px
        font-weight bold
  .classify
    width 30%
    text-align center
    height 30px
    line-height 30px
    color #606060
    font-size 12px
    margin 0 auto
    .fontSize
      font-size 16px
      font-weight bold
    .iconfont
      font-size 12px
  .hotSearch
    width 95%
    margin 10px auto
    .title
      color #7A7A7A
      font-size 10px
      padding-left 2px
    .hotItems
      display flex
      justify-content space-around
      flex-wrap wrap
      margin-top 10px
      .item
        border 1px solid #D9D9D9
        padding 5px
        border-radius 10px
        margin-right 5px
        margin-bottom 5px
        color #1D1D1D
  .frame
    position absolute
    width 90%
    top 45px
    left 5%
    right 5%
    z-index 2
    background white
    box-shadow 0 5px 5px rgba(0, 0, 0, 0.7)
    .title
      height 30px
      line-height 30px
      color #657B92
      margin-left 5px
  .searchHistory
    width 95%
    margin 10px auto
    height 30px
    line-height 30px
    .content
      margin-left 5px
    .delete
      float right
      font-size 12px
</style>
