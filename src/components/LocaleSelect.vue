<template>
  <div class="city_search">
    <h1>Search for a City</h1>

    <div class="search_input_wrapper">
      <i class="fa fa-search search_icon"></i>
      <input v-model="searchTerm" class="search_term_input" :placeholder="placeholder" />

      <section class="search_option_gallery" v-if="searchOptions">
        <p class="search_options_header"><strong>{{ optionsCount }}</strong> options found</p>
        <CitySearchOption 
          v-for="(option, index) in searchOptions" 
          :key="`option_number_${index}`"
          :option="option"
        ></CitySearchOption>
      </section>

      <StaticLocaleOptions />
    </div>

  </div>
</template>

<script>
/* eslint no-console: 0 */
import axios from 'axios'
import CitySearchOption from './search/CitySearchOption.vue'
import StaticLocaleOptions from './search/StaticLocaleOptions.vue'
const searchUrl = 'https://api.teleport.org/api/cities/?search='

export default {
  name: 'LocaleSelect',
  components: {
    CitySearchOption,
    StaticLocaleOptions
  },
  data () {
    return {
      searchTerm : null,
      searchOptions: null,
      optionsCount: null,
      searchFeedback: null
    }
  },
  computed: {
    placeholder () {
      return 'What city do you want to learn about?'
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

$component_width: 70%;

.city_search {
  h1 {
    color: $color1;
    margin-bottom: 2rem;
  }
}

.search_input_wrapper {
  width: $component_width;
  margin: 0 auto;
  position: relative;

  .search_icon {
    position: absolute;
    left: 1rem;
    top: 1rem;
    opacity: .3;
    font-size: 120%;
  }

  .search_term_input {
    border-radius: 5px;
    border: none;
    padding-left: 3rem;

    &::placeholder {
      opacity: .5;
    }
  }
}

.search_options_header {
  margin: 0;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(black, .1);
}

.search_option_gallery {
  background-color: $grey1;
  width: 106%;
  margin: 0 auto 0 .25rem;
  padding-bottom: 3rem;
  border-radius: 0 0 5px 5px;
}
</style>
