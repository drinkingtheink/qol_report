<template>
  <section class="locale_profile">
    <h1 class="location_headline">{{ currentLocale.matching_full_name }}</h1>
    <p class="meta">
      <span v-if="population" class="population">POPULATION: <strong>{{ Number(population).toLocaleString() }}</strong></span>
      <span v-if="lat">LAT: <strong>{{ lat }}</strong></span>
      <span v-if="long">LONG: <strong>{{ long }}</strong></span>
    </p>

    <p><button @click="updateCurrentLocale(null)"><i class="fas fa-redo"></i>Change City</button></p>

    <section class="qol_aggregate" v-if="aggregateScore">
      <div class="agg_tray aggregate_display">
        <h4>
          Aggregate Score <span v-if="shortName"> for {{ shortName }}</span>
        </h4>
      
        <span class="aggregate_score_display">{{ aggregateScore }}</span>
      </div>

      <div class="agg_tray top_categories">
        <h4>Best Categories</h4>

        <ul v-if="top3Categories" class="category_highlight"> 
          <li v-for="category in top3Categories">
            {{ category.name }} <span class="category_rating">{{ roundScore(category.score_out_of_10)}}</span>
          </li>
        </ul>
      </div>

      <div class="agg_tray bottom_categories">
        <h4>Worst Categories</h4>

        <ul v-if="bottom3Categories" class="category_highlight"> 
          <li v-for="category in bottom3Categories">
            {{ category.name }} <span class="category_rating">{{ roundScore(category.score_out_of_10)}}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="qol_categories" v-if="categories">
      <CategoryDisplay
        v-for="(category, index) in categories"
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
      categories: null,
      aggregateScore: null
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
      return arrayToSort ? arrayToSort.sort((a, b) => a - b) : null
    },
    bottom3Categories () {
      return this.sortedBotToTopCategories ? this.sortedBotToTopCategories.slice(0, 3) : null
    },
    sortedTopToBotCategories () {
      let arrayToSort = this.categories ? this.categories.slice(0) : null
      return arrayToSort ? arrayToSort.sort((a, b) => a > b) : null
    },
    top3Categories () {
      return this.sortedTopToBotCategories ? this.sortedTopToBotCategories.slice(0, 3) : null
    },
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
      return Math.max( Math.round(rating * 10) / 10, 2.8 ).toFixed(2);
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
  font-size: 4rem;
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