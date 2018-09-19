<template>
  <div>
    <div class="title">
      <span>{{title}}</span>
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
  name: 'HomeItem',
  props: ['title', 'url'],
  data () {
    return {
      items: []
    }
  },
  methods: {
    // 根据父组件传递的不同url请求不同的数据
    async request (url) {
      this.$http.get(url)
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
    this.request(this.url)
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
        width calc(33.3% - 10px)
        line-height 12px
        padding-left 5px
        padding-right 5px
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
