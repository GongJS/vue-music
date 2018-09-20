<template>
<div>
  <div class="header">
    <div class="header-left">
       <span class="iconfont font">&#xeed4;</span>
    </div>
    <div class="header-center">
        <span
          class="iconfont"
          v-for="(item,index) in iconItems"
          :key="item.id"
          :class="{active: setIndex === index}"
          v-html="item.icon"
          @click="handleClick($event, index, item.router)"
        >
        </span>
    </div>
    <div class="header-right">
      <span class="iconfont font">&#xe678;</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      setIndex: 1,
      iconItems: [
        {icon: '&#xe680;', router: '/local', id: 0},
        {icon: '&#xe674;', router: '/recommend', id: 1},
        {icon: '&#xe678;', router: '/music', id: 2}
      ]
    }
  },
  methods: {
    handleClick (e, index, router) {
      console.log(index)
      this.setIndex = index
      this.$nextTick(() => {
        this.$router.push({
          path: router
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
    .header
      display flex
      justify-content space-between
      align-items center
      background #DF433A
      color #bfbfbf
      height 45px
      width 100%
      .header-left
        display flex
        justify-content center
        align-items center
        color white
        width 50px
        .font
          font-size 18px
          font-weight bold
      .header-center
        width 120px
        display flex
        justify-content space-between
        align-items center
        .active
          font-size 18px
          color white
          font-weight bold
      .header-right
        display flex
        justify-content center
        align-items center
        color white
        width 50px
        .font
          font-size 18px
          font-weight bold
</style>
