<template>
  <div 
    class="city_search_option"
    @click="updateCurrentLocale(option)"
  >
    {{ option.matching_full_name || '-- NA --' }}
  </div>
</template>

<script>
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
}
</script>

<style scoped>
.city_search_option {
  padding: 1rem;
  border-bottom: rgba(#000, .1);
}

.city_search_option:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>