<template>
  <div class="city_search">
    <h1>Search for a City</h1>

    <div class="search_input_wrapper">
      <input v-model="searchTerm" class="search_term_input" />
    </div>

    <section class="search_option_gallery" v-if="searchOptions">
      <p class="search_options_header"><strong>{{ optionsCount }}</strong> options found</p>
      <CitySearchOption 
        v-for="(option, index) in searchOptions" 
        :key="`option_number_${index}`"
        :option="option"
      ></CitySearchOption>
    </section>
  </div>
</template>

<script>
/* eslint no-console: 0 */
import axios from 'axios'
import CitySearchOption from './search/CitySearchOption.vue'
const searchUrl = 'https://api.teleport.org/api/cities/?search='

export default {
  name: 'LocaleSelect',
  components: {
    CitySearchOption: CitySearchOption
  },
  data () {
    return {
      searchTerm : null,
      searchOptions: null,
      optionsCount: null,
      searchFeedback: null
    }
  },
  watch: {
    searchTerm () {
      if (this.searchTerm.length > 2) {
        this.searchForLocale(this.searchTerm)
      }
    }
  },
  methods: {
    searchForLocale (searchTerm) {
      let vue = this
      axios.get(`${searchUrl}${searchTerm}`)
        .then(function (response) {
          let callSuccess = response && response.data && response.data.count > 0
          
          if (callSuccess) {
            let responseData = response.data || {}
            let embeddedData = responseData._embedded || {}
            let citySearchResults = embeddedData[Object.keys(embeddedData)[0]] || []
            vue.searchOptions = citySearchResults
            vue.optionsCount = response.data.count
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../style/_palette.scss';

$component_width: 40%;

.city_search {
  h1 {
    color: $color1;
  }
}

.search_input_wrapper {
  width: $component_width;
  margin: 0 auto;
}

.search_options_header {
  margin: 0;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(black, .1);
}

.search_option_gallery {
  background-color: $grey1;
  width: $component_width;
  margin: 0 auto;
}
</style>
