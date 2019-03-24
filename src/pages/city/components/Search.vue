<template>
  <div>
    <div class="search">
      <input v-model="key" class="search-input" type="text" placeholder="输入城市名或拼音" />
    </div>
    <div class="search-content" ref="search" v-show="key">
       <ul>
         <li class="search-item border-bottom" v-for="item of list" :key="item.id"  @click="HandleCityClick(item.name)">{{item.name}}</li>
         <li class="search-item border-bottom" v-show="!list.length">没有找到数据</li>
       </ul>

    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      key: '',
      list: [],
      timer: null
    }
  },
  // computed: {
  //   hasNoData () {
  //     return !list.length
  //   }
  // },
  watch: {
    key () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.key) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.key) > -1 || value.name.indexOf(this.key) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  methods: {
    HandleCityClick (city) {
      // this.$store.dispatch('changeCity',city)
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      // 编程式的导航
      this.$router.push('/')
      // alert(city)
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  }
}
</script>

<style lang="stylus" scoped>
   @import '~styles/varibles.styl';
   .search
    height:.72rem
    padding : 0 .1rem
    background:$bgColor
    .search-input
      box-sizing:border-box
      width:100%
      height :.62rem
      line-height :.62rem
      padding:0 .1rem
      text-align:center
      border-radius:.06rem
      color:#666
  .search-content
    z-index :1
    overflow: hidden
    position:absolute
    top: 1.58rem
    left :0
    right :0
    bottom :0
    background :#eee
    .search-item
      line-height :.62rem
      padding-left :.2rem
      color :#666
      background :#fff
</style>
