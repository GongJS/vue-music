<template>
  <div>
    <div class="title">
      <span>推荐电台</span>
       <span class="iconfont">&#xe624;</span>
    </div>
    <div class="items">
       <div v-for="item of items" :key="item.id" class="item">
         <img v-lazy="item.picUrl" >
         <span>{{item.name}}</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TvStation',
  data () {
    return {
      items: []
    }
  },
  methods: {
    // 获取最新歌曲
    async request () {
      this.$http.get('/personalized/djprogram')
        .then(res => {
          if (res.status === 200) {
            for (let i = 0; i < 6; i++) {
              this.items.push(res.data.result[i])
            }
          }
        })
    }
  },
  created () {
    this.request()
  }
}
</script>

<style lang="stylus" scoped>
    .title
      display flex
      align-items center
      width 100%
      height 50px
      color #5A5A5A
      font-size 18px
      margin-left 5px
      span
        margin-right 4px
    .items
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap
      width 100%
      .item
        width 32%
        line-height 12px
        img
          width 100%
          height 33vw
        span
          display inline-block
          margin 5px 2px
          height 25px
          font-size 10px
          color #8F8F8F
          overflow hidden
          -webkit-line-clamp 2
          text-overflow ellipsis
          display -webkit-box
          -webkit-box-orient vertical
</style>
