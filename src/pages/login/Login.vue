<template>
  <div class="login">
    <div class="header">
      <span class="iconfont back" @click="back">&#xe72a;</span>
      <div class="title">手机号登录</div>
    </div>
    <br>
    <br>
    <div class="phone">
      <span class="iconfont">&#xe62e;</span>
      <span class="tip" ref="tip">+86</span>
      <!--限制只能输入数字，并自动过滤空格 -->
      <input placeholder="请输入手机号" type="number" v-model.number.trim="phone">
      <span v-if="showDelete" @click="handleDelete" class="iconfont delete">&#xe61a;</span>
    </div>
    <div class="password">
      <span class="iconfont">&#xe61c;</span>
      <input placeholder="请输入密码" type="password" v-model="password">
      <span class="forget">忘记密码？</span>
    </div>
    <div class="button" @click="login">登录</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      password: '',
      showDelete: false,
      oldUrl: ''
    }
  },
  watch: {
    phone () {
      if (this.phone !== '') {
        this.showDelete = true
        this.$refs.tip.style.color = '#272727'
      } else {
        this.showDelete = false
        this.$refs.tip.style.color = '#D4D4D4'
      }
    }
  },
  methods: {
    handleDelete () {
      this.phone = ''
    },
    back () {
      this.$router.push({
        path: this.oldUrl
      })
    },
    login () {
      let _this = this
      this.$http.get(`/login/cellphone?phone=${this.phone}&password=${this.password}`)
        .then(res => {
          if (res.status === 200) {
            // 把用户userId存到vuex里
            this.userId(res.data.account.id)
            _this.back()
          }
        })
    },
    ...mapMutations({
      userId: 'USERID'
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.oldUrl = from.path
    })
  }
}
</script>
<style lang="stylus" scoped>
  .login
    width 100%
    .header
      display flex
      justify-content space-between
      align-items center
      height 45px
      width 100%
      color white
      background #DF433A
      .back
        display flex
        justify-content center
        align-items center
        width 50px
        height 100%
        font-weight bold
        color white
      .title
        width calc(100% - 50px)
        color white
        font-size 14px
    .phone
      width 95%
      line-height 40px
      height 40px
      margin 0 auto
      border-bottom 1px solid #D4D4D4
      color #323232
      .iconfont
        display inline-block
        width 25px
        font-size 16px
      .tip
        color #D4D4D4
        display inline-block
        width 30px
        font-size 14px
      input
        width calc(100% - 90px)
        font-size 14px
        padding-bottom 5px
        font-weight 50
        &::-webkit-input-placeholder
          color #D4D4D4
    .password
      width 95%
      line-height 40px
      height 40px
      margin 10px auto
      border-bottom 1px solid #D4D4D4
      color #272727
      .iconfont
        display inline-block
        width 25px
        font-size 20px
      input
        width calc(100% - 100px)
        font-size 14px
        padding-bottom 5px
        font-weight 50
        &::-webkit-input-placeholder
          color #D4D4D4
      .forget
        color #6C7E92
    .button
      width 95%
      text-align center
      height 40px
      line-height 40px
      margin 20px auto
      background #DF433A
      color white
      border-radius 20px
  </style>
