<template>
  <div>
    <singer-header />
    <div class="singer">
      <scroll class="singer-content" :data="items">
        <div>
          <div v-for="item of items" :key="item.img1v1Id" class="item">
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
</template>

<script>
import SingerHeader from './Header'
import Scroll from '@/components/Scroll'
export default {
  name: 'Singer',
  components: {
    SingerHeader,
    Scroll
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    // 获取热门歌手
    async request () {
      this.$http.get('/top/artists')
        .then(res => {
          if (res.status === 200) {
            console.log(res)
            for (let i = 0; i < 50; i++) {
              this.items.push(res.data.artists[i])
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
 .singer
    position fixed
    width 100%
    top 45px
    bottom 0
    .singer-content
       height: 100%
       overflow: hidden
      .item
        display flex
        align-items center
        height px2Rem(52px)
        width 100%
        border-bottom px2Rem(1px) solid #F9F5F5
        position relative
        span 
          margin-left px2Rem(10px)
        .item-right
          display flex
          align-items center
          position absolute
          right px2Rem(5px)
          .font
            color #DF433A
            font-size px2Rem(18px)
          span:nth-child(2)
            font-size px2Rem(2px)
            display inline-block
            margin-right px2Rem(15px)
            margin-left px2Rem(5px)
            color #BEBEBE
        img
          height px2Rem(46px)
          width px2Rem(46px)
          margin-left px2Rem(5px)
          border-radius px2Rem(4px)
    </style>
