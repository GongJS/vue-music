<template>
  <div>
    <div class="title">
      <span>推荐歌单</span>
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
  name: 'SongSheet',
  data () {
    return {
      items: []
    }
  },
  methods: {
    // 获取推荐歌单
    async request () {
      this.$http.get('personalized')
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
 @import '~styles/varibles.styl'
    .title
      display flex
      align-items center
      width 100%
      height px2Rem(50px)
      color #5A5A5A
      font-size px2Rem(18px)
      margin-left px2Rem(5px)
      span
        margin-right px2Rem(4px)
    .items
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap
      width 100%
      .item
        overflow hidden
        width 32%
        img
          width 100%
          height 33vw
        span
          display inline-block
          margin-top px2Rem(5px)
          height px2Rem(30px)
          font-size px2Rem(8px)
          color #8F8F8F
</style>
