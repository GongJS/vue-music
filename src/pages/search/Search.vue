<template>
  <div class="search"
       @click="cancalFrame"
       ref="search">
    <!--搜索框 -->
    <div class="header"
         @click.stop>
      <div class="back"
           @click="back">
        <span class="iconfont">&#xe72a;</span>
      </div>
      <div class="input">
        <input v-model="inputData"
               @focus="handleFocus" />
        <span v-if="showDelete"
              @click="handleDelete"
              class="iconfont delete">&#xe61a;</span>
      </div>
    </div>
    <!--搜索建议下拉框 -->
    <div class="frame"
         v-show="showFrame"
         @click="handleSearch">
      <p :data-search="inputData"
         class="title border-bottom">搜索 "{{inputData}}"</p>
      <p v-for="item in suggestContent"
         :key="item.id"
         :data-search="item.name"
         :data-singer="item.artists[0].name"
         class="title border-bottom">
        <span class="iconfont">&#xe678;</span>
        {{item.name}} {{item.artists[0].name}}
      </p>
    </div>
    <!--歌手分类跳转 -->
    <div v-if="next">
      <router-link tag="div"
                   class="classify border-bottom"
                   to="/search/singerclassify">
        <span class="iconfont fontSize">&#xe607;</span>
        <span>歌手分类</span>
        <span class="iconfont">&#xe624;</span>
      </router-link>
      <div class="hotSearch">
        <span class="title">
          热门搜索
        </span>
        <!--热门搜索 -->
        <div class="hotItems">
          <span v-for="(item, index) in hotsSearch"
                :key="index"
                class="item"
                @click="hotSelect($event, item)">
            {{item}}
          </span>
        </div>
      </div>
      <!--搜索记录 -->
      <div class="searchHistory"
           ref="searchHistory">
        <scroll ref="searchScroll"
                class="searchScroll"
                :data="searchHistory">
          <div>
            <div class=" border-bottom"
                 v-for="(item, index) in searchHistory"
                 :key="index">
              <span class="iconfont">&#xe636;</span>
              <span class="content"
                    @click="historySelect($event, item)">{{item}}</span>
              <span @click="deleteHistory(item)"
                    class="iconfont delete">&#xe61a;</span>
            </div>
          </div>
        </scroll>
      </div>
    </div>
    <!--搜索结果 -->
    <div class="searchResult"
         v-else>
      <tab :tabs="tabs"
           @switchTab="switchTab"></tab>
      <div class="result"
           ref="search">
        <keep-alive>
          <!--单曲-->
          <song-list :songs="songs"
                     :showLoading="showLoading"
                     v-if="songState"
                     @select="selectItem">
          </song-list>
          <!--专辑-->
          <album-list :inputData="inputData"
                      :showLoading="showLoading"
                      :inputState="inputState"
                      v-else-if="albumState">
          </album-list>
          <!--视频-->
          <vedio v-else-if="vedioState"></vedio>
          <!--歌手-->
          <singer :inputData="inputData"
                  :showLoading="showLoading"
                  :inputState="inputState"
                  v-else-if="singerState">
          </singer>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/utils'
import { playlistMixin } from '@/mixin'
import { mapActions } from 'vuex'
import Tab from '@/components/Tab'
import SongList from './SongList'
import AlbumList from './AlbumList'
import Vedio from './Vedio'
import Singer from './Singer'
import Scroll from '@/components/Scroll'
export default {
  name: 'Search',
  mixins: [playlistMixin],
  components: {
    Tab,
    SongList,
    AlbumList,
    Vedio,
    Singer,
    Scroll
  },
  data () {
    return {
      inputData: '', // input框数据
      oldInputData: '', // 保存上一次的input框的数据
      inputState: false, // input框数据是否输入完判断状态
      showDelete: false, // 是否显示删除符
      showLoading: false, // 是否显示加载动画
      showFrame: false, // 是否显示下拉搜索框
      oldUrl: '', // 上一个页面地址
      hotsSearch: [], // 热门搜索内容
      suggestContent: [], // 建议搜索内容（下拉框里显示）
      searchHistory: [], // 搜索记录
      next: true, // 是否跳转到下一个页面
      songs: [], // 传给子组件的歌曲内容
      songState: true, // tab切换状态  热门演唱  专辑  视频  个人信息
      albumState: false,
      singerState: false,
      vedioState: false
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
    ...mapActions([
      'selectPlay'
    ]),
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
    // 监听tab组件的切换选项
    switchTab (data) {
      this.songState = false
      this.albumState = false
      this.singerState = false
      this.vedioState = false
      if (data === '单曲') {
        this.songState = true
        // 判断和上一次输入的内容是否一致
        if (this.oldInputData === this.inputData) {
          return
        }
        this.requestKeyWords(1)
      } else if (data === '视频') {
        this.vedioState = true
      } else if (data === '歌手') {
        this.singerState = true
      } else if (data === '专辑') {
        this.albumState = true
      } else {
        console.log('no tab')
      }
    },
    // 选择热门搜索
    hotSelect (e, item) {
      this.inputData = item
      this.handleSearch(e)
    },
    // 选择历史记录搜索
    historySelect (e, item) {
      this.inputData = item
      this.handleSearch(e)
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
      const result = await getData(`/search?keywords=${this.inputData}&limit=15`)
      if (result.code === 200) {
        let items = []
        for (let i = 0; i < result.result.songs.length; i++) {
          items.push(result.result.songs[i])
        }
        this.suggestContent = items
      }
    },
    // 按输入的关键词搜索内容  type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
    async requestKeyWords (type) {
      this.showLoading = true
      const result = await getData(`/search?keywords=${this.inputData}&type=${type}`)
      if (result.code === 200) {
        let items = []
        for (let i = 0; i < result.result.songs.length; i++) {
          items.push(result.result.songs[i])
        }
        this.songs = items
      }
      this.showLoading = false
      this.showFrame = false
    },
    handleSearch (e) {
      // 判断和上一次输入的内容是否一致
      if (this.oldInputData === this.inputData) {
        return
      }
      // 判断搜索内容是否包含歌手名字
      if (e.target.getAttribute('data-singer')) {
        this.inputData = e.target.getAttribute('data-search') + ' ' + e.target.getAttribute('data-singer')
      }
      // 这里用异步，是因为在改变input的时候，在watch里面又会把showFrame置成true，涉及到时间差，所以用了异步
      setTimeout(() => {
        this.showFrame = false
      })
      this.inputState = !this.inputState
      // 只有在歌曲页面的情况下，才改变oldInput
      if (this.songState === true) {
        this.oldInputData = this.inputData
      }
      // 页面跳转
      this.next = false
      if (this.songState === true) {
        this.requestKeyWords(1)
      }
      // 用户搜索记录存到localStorage里面
      let searchHistory = []
      if (localStorage.getItem('searchHistory') !== null) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
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
    },
    // 选择播放歌曲
    selectItem (backImage, playUrl, index, lyric) {
      this.songs[index].backImage = backImage
      this.songs[index].playUrl = playUrl
      this.songs[index].lyric = lyric
      this.songs[index].singer = this.name
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    // 当播放器变成mini播放器的时候，重新计算scroll的高度
    handlePlaylist (playlist) {
      if (playlist.length === 0) {
        return
      }
      const bottom = '102px'
      this.$refs.searchHistory.style.bottom = bottom
      this.$refs.searchScroll.refresh()
    }
  },
  created () {
    this.requestHotSearch()
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    this.tabs = [
      { title: '单曲' },
      { title: '视频' },
      { title: '歌手' },
      { title: '专辑' }
    ]
  },
  mounted () {
    // 设置当前的页面高度，这样在点击页面的其他地方时候，可以隐藏下拉搜索框
    this.innerHeight = window.innerHeight
    this.$refs.search.style.height = `${this.innerHeight}px`
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      if (from.path.indexOf('search') === 1) {
        vm.oldUrl = sessionStorage.getItem('oldUrl')
      } else {
        vm.oldUrl = from.path
        // 记录首页访问search页面的路由
        sessionStorage.setItem('oldUrl', from.path)
      }
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
    position fixed
    width 90%
    left 5%
    right 5%
    top 180px
    bottom 35px
    line-height 30px
    .searchScroll
      height 100%
      overflow hidden
      .content
        margin-left 5px
        height 30px
      .delete
        float right
        font-size 12px
</style>
