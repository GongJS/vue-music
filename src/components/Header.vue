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
          :key="index"
          :class="{active: setIndex === index}"
          :style="{color:active}"
          v-html="item.icon"
          @click="handleClick(index, item.router)"
        >
        </span>
    </div>
    <div class="header-right">
      <router-link to="/search" tag="span">
        <span class="iconfont font">&#xe678;</span>
      </router-link>
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
      active: '',
      iconItems: [
        {icon: '&#xe680;', router: '/local'},
        {icon: '&#xe674;', router: '/recommend'},
        {icon: '&#xe6f6;', router: '/music'}
      ]
    }
  },
  methods: {
    handleClick (index, router) {
      this.setIndex = index
      this.$router.push({
        path: router
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
