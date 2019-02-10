<template>
  <section class="locale_profile">
    <h1 class="location_headline">{{ currentLocale.matching_full_name }}</h1>
    <p class="meta">
      <span v-if="population" class="population">POPULATION: <strong>{{ Number(population).toLocaleString() }}</strong></span>
      <span v-if="lat">LAT: <strong>{{ lat }}</strong></span>
      <span v-if="long">LONG: <strong>{{ long }}</strong></span>
    </p>

    <p><button @click="updateCurrentLocale(null)"><i class="fa fa-map-marker"></i> {{ changeCTA }}</button></p>

    <h4 class="section_header">Quality of Life</h4>

    <section class="qol_stage" v-if="categoriesFound">
      <section class="qol_aggregate">
        <div class="agg_tray aggregate_display" v-if="aggregateScore">
          <h4>
            Aggregate Score <span v-if="shortName"> for {{ shortName }}</span>
          </h4>
        
          <span class="aggregate_score_display">{{ aggregateScore }}</span>
        </div>

        <div class="agg_tray top_categories" v-if="top3Categories">
          <h4>Best Categories</h4>

          <ul v-if="top3Categories" class="category_highlight"> 
            <li v-for="(category, index) in top3Categories" :key="`top_${index}_key`">
              {{ category.name }} <span class="category_rating">{{ roundScore(category.score_out_of_10)}}</span>
            </li>
          </ul>
        </div>

        <div class="agg_tray bottom_categories" v-if="bottom3Categories">
          <h4>Worst Categories</h4>

          <ul v-if="bottom3Categories" class="category_highlight"> 
            <li v-for="(category, index) in bottom3Categories" :key="`bot_${index}_key`">
              {{ category.name }} <span class="category_rating">{{ roundScore(category.score_out_of_10)}}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="qol_categories" v-if="categoriesFound">
        <CategoryDisplay
          v-for="(category, index) in categories"
          class="qol_category"
          :category="category"
          :key="`category_${index}_key`"
        >
        </CategoryDisplay>
      </section>

    </section>

    <section class="no_categories_found" v-else>
        <h2>No Quality of Life data found. You may need to select a larger urban area.</h2>

        <div class="icon_stage">
          <i class="fa fa-globe"></i>
        </div>
    </section>

    <button @click="updateCurrentLocale(null)"><i class="fa fa-map-marker"></i> {{ changeCTA }}</button>
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
      categories: null,
      aggregateScore: null,
      changeCTA: 'Chang City'
    }
  },
  computed: {
    ...mapState(['currentLocale']),
    basicInfoUrl () {
      return this.currentLocale ? this.currentLocale._links['city:item'].href : null
    },
    categoriesFound () {
      return !!(this.categories && this.categories.length)
    },
    shortName () {
      return this.currentLocale ? this.currentLocale.matching_full_name.substr(0, this.currentLocale.matching_full_name.indexOf(',')) : null
    },
    sortedBotToTopCategories () {
      let arrayToSort = this.categories ? this.categories.slice(0) : null
      let composedArray = arrayToSort ? arrayToSort.sort((a, b) => { return a.score_out_of_10 - b.score_out_of_10 }) : null
      return composedArray ? composedArray : null
    },
    bottom3Categories () {
      return this.sortedBotToTopCategories ? this.sortedBotToTopCategories.slice(0, 3) : null
    },
    sortedTopToBotCategories () {
      let arrayToSort = this.categories ? this.categories.slice(0) : null
      let composedArray = arrayToSort ? arrayToSort.sort((a, b) => b.score_out_of_10 - a.score_out_of_10) : null
      return composedArray ? composedArray : null
    },
    top3Categories () {
      return this.sortedTopToBotCategories ? this.sortedTopToBotCategories.slice(0, 3) : null
    }
  },
  watch: {
    categories () {
      if (this.categoriesFound) {
        this.computeAggregateScore()
      }
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
    computeAggregateScore () {
      let vue = this
      let sum = 0
      if (this.categories) {
        for( var i = 0; i < this.categories.length; i++ ){
            sum += parseInt( vue.categories[i].score_out_of_10, 10 );
        }

        let avg = sum/this.categories.length

        this.aggregateScore = this.roundScore(avg)
      }
    },
    roundScore (rating) {
      let ratingTo10th = Math.max( Math.round(rating * 10) / 10, 2.8 ).toFixed(2)
      return ratingTo10th
    },
    getUrbanAreaInfo (urbanAreaDataUrl) {
      let vue = this
      axios.get(`${urbanAreaDataUrl}scores/`)
        .then(function (response) {
          let data = response.data || {}
          vue.categories = data.categories || null
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

$maxWidth: 95%;

.location_headline {
  color: $color1;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.meta {
  max-width: $maxWidth;
  margin: 0 auto 1rem auto;
  
  span {
    @include opaque_el;
    color: white;
    display: inline-block;
    margin: 0 .5rem .5rem 0;
    padding: .5rem 1.5rem;
    border-radius: 5px;
  }
}


.section_header {
  font-size: 2.5rem;
  color: $grey2;
  background-color: $dark;
  margin: 1rem 0;
  padding: 1rem 0;
}

.qol_aggregate {
  @include opaque_el;
  max-width: $maxWidth;
  padding: 1rem;
  margin: 1rem auto 1rem auto;
  display: flex;
  justify-content: center;

  h4 {
    text-shadow: none;
    color: white;
    margin: 1rem 0;
  }
}

.aggregate_score_display {
  font-size: 5rem;
  color: white;
  font-weight: bold;
  color: $color1;
}

.qol_categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.qol_category {
  width: 25%;
}

.no_categories_found {
  color: $grey2;
  background-color: $dark;
  padding: 4rem 0;
  margin: 0 0 1rem 0;
}

.icon_stage {
  text-align: center;

  i {
    font-size: 16rem;
    opacity: .5;
    color: $color1;
  }
}

ul.category_highlight {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;

  li {
    color: $grey2;
    font-weight: bold;
  }

  .category_rating {
    color: $color1;
  }
}

.agg_tray {
  padding-right: 3em;
}

</style>