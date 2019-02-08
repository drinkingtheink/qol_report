<template>
  <section class="locale_profile">
    <h1 class="location_headline">{{ currentLocale.matching_full_name }}</h1>
    <p class="meta">
      <span v-if="population" class="population">POPULATION: <strong>{{ Number(population).toLocaleString() }}</strong></span>
      <span v-if="lat">LAT: <strong>{{ lat }}</strong></span>
      <span v-if="long">LONG: <strong>{{ long }}</strong></span>
    </p>

    <p><button @click="updateCurrentLocale(null)">Change City</button></p>

    <section class="qol_categories" v-if="qol.categories">
      <CategoryDisplay
        v-for="(category, index) in qol.categories"
        class="qol_category"
        :category="category"
        :key="`category_${index}_key`"
      >
      </CategoryDisplay>
    </section>

    <button @click="updateCurrentLocale(null)">Find a Different City</button>
  </section>
</template>

<script>
/* eslint no-console: 0, no-mixed-spaces-and-tabs: 0 */

import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import CategoryDisplay from './CategoryDisplay.vue'

export default {
  name: 'LocaleProfile',
  components: {
    CategoryDisplay: CategoryDisplay
  },
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
};
</script>

<style lang="scss" scoped>
@import '../../style/_palette.scss';
@import '../../style/_mixins.scss';

.location_headline {
  color: $color1;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.meta {
  max-width: 65%;
  margin: 0 auto 2rem auto;
  
  span {
    @include opaque_el;
    color: white;
    display: inline-block;
    margin: 0 .5rem .5rem 0;
    padding: .5rem 1.5rem;
    border-radius: 5px;

    &.population {
      display: block;
      width: auto;
    }
  }
}

.qol_categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 2em;
}

.qol_category {
  width: 25%;
}
</style>