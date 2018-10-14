<template>
  <!-- better-scroll具体封装思路参考 https://www.imooc.com/article/18232 -->
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /** 点击列表是否派发click事件 */
    click: {
      type: Boolean,
      default: true
    },
    /** 列表数据 */
    data: {
      type: Array,
      default: null
    },
    /** 是否派发滚动事件 */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**  */
    startScroll: {
      type: Boolean,
      default: true
    },
    /** 是否派发滚动到底部事件，用于上来加载 */
    pullup: {
      type: Boolean,
      default: false
    },
    /** 是否派发顶部下拉事件，用于下拉刷新 */
    pulldown: {
      type: Boolean,
      default: false
    }

  },
  mounted () {
    // 初始化better-scroll
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // 初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      // 是否派发监听
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    // 代理better-scroll的enable方法   下同
    enable () {
      this.scroll && this.scroll.enable()
    },

    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据变化，重新计算，防止better-scroll无法拖动
    data () {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  }
}

</script>

<style></style>
