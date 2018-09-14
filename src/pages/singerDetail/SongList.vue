<template>
  <div class="song-list">
    <div v-for="(item, index) in songs" :key="index" class="items">
      <p>{{index}}</p>
      <div>
        <p>{{item.al.name}}</p>
        <p>{{item.ar.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: ['songs']
}
</script>
<style lang="stylus" scoped>
 @import '~styles/varibles.styl'
  .song-list
    background white
    .items
      height px2Rem(48px)
</style>
