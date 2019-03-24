<template>
  <div>
    <city-Header></city-Header>
    <city-Search :cities="cities"></city-Search>
    <city-List :letter="lettle" :cities="cities" :hot="hotCities"></city-List>
    <city-Alphabet :cities="cities" @change="handleLeterChange"></city-Alphabet>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {},
      hotCities: [],
      lettle: ''
    }
  },
  methods: {
    getCicyInfo () {
      axios.get('/api/city.json').then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handleLeterChange (lettle) {
      this.lettle = lettle
      // console.log(lettle)
    }
  },
  mounted () {
    this.getCicyInfo()
  }
}
</script>

<style lang="stylus" scoped>
</style>
