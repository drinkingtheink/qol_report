<template>
  <div class="city_search">
    <h1 class="animated fadeInDown search_header">Search for a City</h1>

    <div class="search_input_wrapper">
      <i class="fa fa-search search_icon" ></i>
      <input 
        v-model="searchTerm" 
        class="search_term_input animated fadeInDown" 
        :placeholder="placeholder" 
        ref="search_term_input"
      />

      <section class="search_option_gallery animated fadeInDown" v-if="searchOptions">
        <p class="search_options_header">
          <strong>{{ optionsCount }}</strong> option{{ optionsCount > 1 ? 's' : '' }} found | 
          <span class="clear_search" @click="clearOutSearch()"> Clear Search <i class="fa fa-close"></i></span>
        </p>
        <CitySearchOption 
          v-for="(option, index) in searchOptions" 
          :key="`option_number_${index}`"
          :option="option"
        ></CitySearchOption>
      </section>

      <section class="no_search_results animated fadeInDown" v-if="showNoSearchResultsMessage">
        <h4><i class="fa fa-info-circle"></i> Sorry, no search results found. Try a different term.</h4>
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
      optionsCount: 0,
      searchFeedback: null
    }
  },
  mounted () {
    this.setFocus()
  },
  computed: {
    placeholder () {
      return 'What city do you want to learn about?'
    },
    showNoSearchResultsMessage () {
      return this.searchTerm && this.searchTerm.length > 2 && !this.optionsCount
    }
  },
  watch: {
    searchTerm () {
      if (this.searchTerm.length > 2) {
        this.searchForLocale(this.searchTerm)
      }

      if (!this.searchTerm) {
        this.clearOutSearch()
      }
    }
  },
  methods: {
    clearOutSearch () {
      this.searchOptions = null
      this.optionsCount = 0
      this.setFocus()
    },
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
    },
    setFocus () {
      this.$refs.search_term_input.focus();
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
    z-index: 10;
    left: 1rem;
    top: 1rem;
    opacity: .6;
    font-size: 120%;
    color: $grey3;
  }

  .search_term_input {
    border-radius: 5px;
    border: none;
    padding-left: 3rem;

    &::placeholder {
      opacity: .6;
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
  width: 102%;
  margin: 0 auto 0 .25rem;
  padding-bottom: 3rem;
  border-radius: 0 0 5px 5px;
}

.clear_search {
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: $color1;
  }
}

</style>
