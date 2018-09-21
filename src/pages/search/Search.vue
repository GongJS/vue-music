<template>
  <div class="search">
    <div class="header">
      <div class="back" @click="back">
        <span class="iconfont font">&#xe72a;</span>
      </div>
      <div class="input">
        <input v-model="inputData" />
        <span v-if="showDelete" @click="handleDelete" class="iconfont delete">&#xe61a;</span>
      </div>
    </div>
    <router-link tag="div" class="classify border-bottom" to="/search/singerclassify">
      <span class="iconfont fontSize">&#xe607;</span>
      <span>歌手分类</span>
      <span class="iconfont font">&#xe624;</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      inputData: '',
      showDelete: false,
      oldUrl: ''
    }
  },
  watch: {
    inputData () {
      if (this.inputData !== '') {
        this.showDelete = true
      } else {
        this.showDelete = ''
      }
    }
  },
  methods: {
    // 清除输入
    handleDelete () {
      this.inputData = ''
    },
    // 跳转到上一个页面
    back () {
      this.$router.push({
        path: this.oldUrl
      })
    }
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
    width 100%
    text-align center
    height 30px
    line-height 30px
    color #606060
    font-size 12px
    .fontSize
      font-size 16px
      font-weight bold
    .font
      font-size 12px
</style>
