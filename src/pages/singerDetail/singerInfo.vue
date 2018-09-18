<template>
<div class="info">
  <show-loading v-if="showLoading"/>
  <div v-else>
    <div>
      <br>
      <p class="title">{{name}}简介</p>
      <div class="content">
        <p>{{info.slice(0,65)}}</p>
        <p>{{info.slice(65)}}</p>
        <p class="spread">完整歌手介绍 ></p>
      </div>
    </div>
    <div>
      <p class="column">相关专栏文章</p>
      <div v-for="item in topicData" :key="item.id" class="wrapper">
        <div>
          <img v-lazy="item.coverUrl" />
        </div>
        <div class="border-bottom content">
          <p class="heading">{{item.mainTitle}}</p>
          <p class="author">by {{item.creator.nickname}} 阅读{{formatDate(item.readCount)}}万</p>
        </div>
      </div>
      <br>
      <p class="count">全部专栏文章({{count}}) ></p>
    </div>
    <div>
      <br>
      <p class="title">相似歌手</p>
      <div class="content">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ShowLoading from '@/components/ShowLoading'
export default {
  name: 'SingerInfo',
  props: ['id', 'name'],
  components: {
    ShowLoading
  },
  data () {
    return {
      info: '',
      topicData: [],
      count: 0,
      showLoading: true
    }
  },
  methods: {
    // 获取歌手信息
    async requestSingerInfo (id) {
      this.$http.get(`/artist/desc?id=${this.id}`)
        .then(res => {
          if (res.status === 200) {
            let item = []
            this.info = res.data.briefDesc
            this.count = res.data.count
            this.showLoading = false
            for (let i = 0; i < res.data.topicData.length; i++) {
              item.push(res.data.topicData[i])
            }
            this.topicData = item
          }
        })
    },
    // 获取相似歌手
    async requestSingerSimi (id) {
      this.$http.get(`/simi/artist?id=${this.id}`, {xhrFields: { withCredentials: true }})
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // 暂时获取不到
          }
        })
    },
    formatDate (data) {
      let newDate = (data / 10000).toFixed(1)
      return newDate
    }
  },
  created () {
    this.requestSingerInfo(this.id)
    this.requestSingerSimi(this.id)
  }
}
</script>

<style lang="stylus" scoped>
.info
  background white
  min-height 800px  //如果内容太少导致高度不够，会导致“收藏”和“个人主页”无法滑动到最顶部并隐藏
  .title
    margin-left 10px
    margin-top 10px
    font-size 14px
    color black
    font-weight bold
  .content
    margin 10px
    color #6d6d6d
    line-height 18px
    font-size 10px
    .spread
      width 100%
      text-align center
      color #9F9F9F
      font-size 9px
  .column
    margin 10px
    font-size 14px
    color black
    font-weight bold
  .wrapper
    display flex
    align-items center
    img
      width 88px
      height 60px
      margin-left 10px
      margin-right 10px
    .content
      display flex
      align-items center
      flex-wrap wrap
      height 60px
      .heading
        color  #4E4E4E
      .author
        color #A4A4A4
        font-size 9px
  .count
    width 100%
    text-align center
    color #9F9F9F
    font-size 9px
</style>
