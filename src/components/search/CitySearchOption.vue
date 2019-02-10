<template>
  <div 
    class="city_search_option"
    @click="updateCurrentLocale(option)"
  >
    {{ option.matching_full_name || '-- NA --' }}
  </div>
</template>

<script>
/* eslint no-console: 0, no-mixed-spaces-and-tabs: 0 */

import { mapState, mapActions } from 'vuex'
export default {
  props: ['option'],
  name: 'CitySearchOption',
  computed: {
    ...mapState(['currentLocale'])
  },
  methods: {
    ...mapActions(['updateCurrentLocale'])
  }
};
</script>

<style lang="scss" scoped>
.city_search_option {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(#000, .1);

  &:hover {
    font-weight: bold;
    cursor: pointer;
    background-color: white;
  }
}
</style>
