<template>
  <div class="slidelogin">
    <div class="login">
      <div v-if="!userId">
          <p>登录网易云音乐<br>
          320K高音质无限下载，手机电脑多端同步
          </p>
          <p class="button" @click="handleClick">立即登录</p>
      </div>
      <div v-else class="userInfo">
        <div class="left">
          <img :src="avatarUrl" />
           <p>
            <span>{{nickname}}</span>
            <span class="vip">lv.{{vipType}}</span>
          </p>
        </div>
        <div class="right">
          <p>
            <span class="iconfont font">&#xeed4;</span>
            <span class="register">签到</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'SlideLogin',
  props: ['hidden'],
  data () {
    return {
      nickname: '', // 用户名称
      avatarUrl: '', // 用户头像地址
      vipType: 0 // 用户vip等级
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  watch: {
    userId () {
      if (this.userId) {
        this.$http.get(`/user/detail?uid=${this.userId}`)
          .then(res => {
            if (res.status === 200) {
              this.nickname = res.data.profile.nickname
              this.avatarUrl = res.data.profile.avatarUrl
              this.vipType = res.data.profile.vipType
            }
          })
      }
    }
  },
  methods: {
    handleClick () {
      this.$router.push({
        path: '/login'
      })
      this.$emit('confirmLogin')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slidelogin
    background white
    text-align center
    font-size 14px
    color white
    .login
      display flex
      justify-content center
      align-items center
      height 125px
      background url('../../assets/image/login.jpeg')
      background-size 325px 125px
      font-weight 100
      .button
        width 100px
        padding 5px
        border 1px solid white
        border-radius 10px
        margin  10px auto
      .userInfo
        display flex
        justify-content space-between
        width 100%
        height 100%
        .left
          img
            height 50px
            width 50px
            border-radius 25px
            margin-left -25px
            margin-top 30px
          p
            margin-left 10px
            margin-top 10px
            height 15px
            line-height 15px
            .vip
              display inline-block
              border 1px solid white
              border-radius 5px
              font-size 10px
              width 30px
              margin-bottom 10px
              margin-left 5px
        .right
          display flex
          align-items flex-end
          p
            border 1px solid white
            padding 2px
            border-radius 5px
            margin-bottom 20px
            margin-right 10px
            font-size 12px
            .iconfont
              font-size 12px
</style>
