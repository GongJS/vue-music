<template>
<div>
  <!--加载动画-->
  <show-loading v-if="showLoading"/>
  <!--歌手列表信息-->
  <div v-else v-for="item of singers" :key="item.id" class="item" @click="selectSinger(item.id)">
    <img v-lazy="item.img1v1Url">
    <span>{{item.name}}</span>
    <div v-if="item.accountId" class="item-right">
      <span class="iconfont">&#xe7ad;</span>
      <span>已入驻</span>
    </div>
  </div>
</div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
import {getData} from '@/utils'
export default {
  name: 'Singer',
  props: ['inputData', 'showLoading', 'inputState'],
  components: {
    ShowLoading
  },
  data () {
    return {
      singers: []
    }
  },
  watch: {
    inputState () {
      // 数据输入完才发起请求
      this.requestSinger()
    }
  },
  methods: {
    // 获取歌手
    async requestSinger () {
      const result = await getData(`/search?keywords=${this.inputData}&type=100`)
      let items = []
      if (result.code === 200) {
        console.log(result)
        for (let i = 0; i < result.result.artists.length; i++) {
          items.push(result.result.artists[i])
        }
        this.singers = items
      }
      this.showLoading = false
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
    console.log(22)
    this.requestSinger()
  },
  activated () {
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
