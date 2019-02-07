<template>
  <section class="locale_profile">
    <h1>{{ currentLocale.matching_full_name }}</h1>

    <button @click="updateCurrentLocale(null)">Clear Location</button>
  </section>
</template>

<script>
/* eslint no-console: 0, no-mixed-spaces-and-tabs: 0 */

import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'LocaleProfile',
  computed: {
    ...mapState(['currentLocale']),
    basicInfoUrl () {
      return this.currentLocale ? this.currentLocale._links['city:item'].href : null
    }
  },
  watch: {
    basicInfoUrl () {
      console.log(`LETS GET INFOOOOOOOOOOOOO`)
      this.getBasicInfo(this.basicInfoUrl)
    }
  },
  methods: {
    ...mapActions(['updateCurrentLocale']),
    getBasicInfo () {
      console.log('lets do this }}}}}}}}}')
      axios.get(this.basicInfoUrl)
        .then(function (response) {
          console.log(`${JSON.stringify(response)}`)
        })
        .catch(function (error) {
          console.log(error);
        });    
    }
  }
}
</script>