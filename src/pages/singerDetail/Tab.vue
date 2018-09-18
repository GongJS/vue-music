<template>
  <div class="wrapper border-bottom" @click.stop="switchTab">
    <div class="item">
       <p class="">热门演唱</p>
    </div>
     <div class="item">
       <p class="">专辑</p>
    </div>
     <div class="item">
       <p class="">视频</p>
    </div>
     <div class="item">
       <p class="">艺人信息</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tab',
  data () {
    return {
      state: '热门演唱'
    }
  },
  methods: {
    switchTab (e) {
      let data = e.target.innerHTML.toString()
      if (data === '热门演唱' || data === '专辑' || data === '视频' || data === '艺人信息') {
        this.$emit('switchTab', e.target.innerHTML)
      } else {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
  .wrapper
    display flex
    justify-content space-around
    align-content center
    box-sizing border-box
    height 40px
    width 100%
    border-top 1px solid #EFF3F4
    border-radius 0.2rem 0.2rem 0 0
    background white
    .item
      display flex
      justify-content center
      align-items center
      color #D33F40
      p
        font-size 10px
</style>
