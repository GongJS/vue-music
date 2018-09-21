<template>
<div class="tab" ref="tab">
  <!--这里用代理的方式，而不是为每个li绑定点击函数 -->
  <!--headerTab singerTab,分别对应不同tab样式（首页和歌手页面），这里采用的方式是用不同的样式来覆盖伪类::before -->
  <ul @click="handleSwitchTab" class="border-bottom">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{
        headerActive: setIndex === index && !flag,
        headerTab: !flag,
        singerActive: setIndex === index && flag,
        singerTab: flag
      }"
      :data-index="index"
      :data-route="tab.path || ''"
      ref="li"
    >
      {{tab.title}}
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Tab',
  props: {
    // tab数据
    tabs: {
      type: Array,
      default: null
    },
    // 配色方案切换（home页面还是singer页面,默认home页面配色方案）
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      setIndex: 0
    }
  },
  methods: {
    handleSwitchTab (e) {
      // 设置滑动动画效果
      this.setIndex = Number(e.target.getAttribute('data-index'))
      if (e.target.getAttribute('data-route') !== '') {
        // 如果设置了路由，就跳转到对应的路由页面
        this.$router.push({
          path: e.target.getAttribute('data-route')
        })
      }
      // 切换不同的选项卡
      let data = e.target.innerHTML.toString().trim()
      for (let i = 0; i < this.tabs.length; i++) {
        if (data === this.tabs[i].title) {
          // 可以监听切换的状态，根据不同的状态来显示不同的页面内容
          this.$emit('switchTab', e.target.innerHTML.toString().trim())
        } else {
          console.log(e)
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
/* 参考博客 https://blog.csdn.net/BetterGG/article/details/81390111*/
.tab
  position relative
  height 40px
  background #DF433A
  color #bfbfbf
  font-size 12px
  ul
    display flex
    justify-content space-around
    align-items center
    position absolute
    width 100%
    .headerTab
      position relative
      line-height 40px
      width 80px
      text-align center
      cursor pointer
      color #bfbfbf
      &::before
        content ""
        position absolute
        width 0
        top -15%
        left 100%
        height 100%
        border-bottom 2px solid white
        transition 0.1s all linear
      &:active
        background #B4382E
    .headerActive ~ li::before
      left 0
    .headerActive
      color white
      &::before
        width 30px
        left 0
        top 10
        transform translate(80%, 0)
    .singerTab
      position relative
      line-height 40px
      width 80px
      text-align center
      cursor pointer
      color #C9C9C9
      &::before
        content ""
        position absolute
        width 0
        top -15%
        left 100%
        height 100%
        border-bottom 2px solid red
        transition 0.1s all linear
      &:active
        background #C9C9C9
    .singerActive ~ li::before
      left 0
    .singerActive
      color red
      &::before
        width 30px
        left 0
        top 10
        transform translate(80%, 0)
</style>
