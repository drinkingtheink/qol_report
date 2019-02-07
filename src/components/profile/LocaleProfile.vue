<template>
  <section class="locale_profile">
    <h1>{{ currentLocale.matching_full_name }}</h1>
    <p v-if="population"><strong>POPULATION:</strong> {{ Number(population).toLocaleString() }}</p>

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
      long: null,
      urbanAreaData: null,
      qol: {
        categories: null
      }
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
          let latLong = locData.latlon || {}
          vue.lat = latLong.latitude || null
          vue.long = latLong.longitude || null
          vue.population = data.population || null

          let otherLinks = data._links || {}
          let urbanAreaDataLocation = otherLinks['city:urban_area'] || {}
          let urbanAreaDataUrl = urbanAreaDataLocation.href || null

          if (urbanAreaDataUrl) {
            vue.getUrbanAreaInfo(urbanAreaDataUrl)
          } 

        })
        .catch(function (error) {
          console.log(error);
        });    
    },
    getUrbanAreaInfo (urbanAreaDataUrl) {
      let vue = this
      axios.get(`${urbanAreaDataUrl}scores/`)
        .then(function (response) {
          let data = response.data || {}
          vue.qol.categories = data.categories || null
        })
        .catch(function (error) {
          console.log(error);
        });  
    }
  }
}
</script>