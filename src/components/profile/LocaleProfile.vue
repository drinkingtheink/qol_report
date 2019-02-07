<template>
  <section class="locale_profile">
    <h1>{{ currentLocale.matching_full_name }}</h1>
    <p v-if="population">POPULATION: {{ Number(population).toLocaleString() }}</p>

    <button @click="updateCurrentLocale(null)">Clear Location</button>
  </section>
</template>

<script>
/* eslint no-console: 0, no-mixed-spaces-and-tabs: 0 */

import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'LocaleProfile',
  data () {
    return {
      population: 0,
      lat: null,
      long: null
    }
  },
  computed: {
    ...mapState(['currentLocale']),
    basicInfoUrl () {
      return this.currentLocale ? this.currentLocale._links['city:item'].href : null
    }
  },
  mounted () {
    this.getBasicInfo(this.basicInfoUrl)
  },
  methods: {
    ...mapActions(['updateCurrentLocale']),
    getBasicInfo () {
      let vue = this
      axios.get(this.basicInfoUrl)
        .then(function (response) {
          let data = response.data || {}
          let locData = data.location || {}
          let latLong = locData.latlong || {}
          vue.lat = latLong.lat || null
          vue.long = latLong.long || null
          vue.population = data.population || null
        })
        .catch(function (error) {
          console.log(error);
        });    
    }
  }
}
</script>