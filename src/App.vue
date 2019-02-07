<template>
  <div id="app">
    <LocaleSelect v-if="!currentLocale"/>
    <LocaleProfile v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LocaleSelect from './components/LocaleSelect.vue'
import LocaleProfile from './components/profile/LocaleProfile.vue'

export default {
  name: 'app',
  components: {
    LocaleSelect,
    LocaleProfile
  },
  computed: {
    ...mapState(['currentLocale'])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
