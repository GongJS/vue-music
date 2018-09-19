<template>
    <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) of banners" :key="index" class="swiper-img">
          <img :src="item">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Swiper',
  components: {
    swiper,
    swiperSlide
  },
  props: ['banners'],
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  // 修改轮播图的小点点颜色
  .wrapper >>> .swiper-pagination-bullet-active
    background #DF433A
  .wrapper
    width 100%
    height 46.02vw
    .swiper-img
      img
        width 100%
</style>
