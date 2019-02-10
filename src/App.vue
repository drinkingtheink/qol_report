<template>
  <div id="app">
    <Indicator />
    <LocaleSelect v-if="!currentLocale"/>
    <LocaleProfile v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LocaleSelect from './components/LocaleSelect.vue'
import LocaleProfile from './components/profile/LocaleProfile.vue'
import Indicator from './components/Indicator.vue'

export default {
  name: 'app',
  components: {
    Indicator,
    LocaleSelect,
    LocaleProfile
  },
  computed: {
    ...mapState(['currentLocale'])
  },
  watch: {
    currentLocale () {
      console.log(`LOCALE UPDATED }}}} ${JSON.stringify(this.currentLocale)}`)
    }
  }
};
</script>

<style lang="scss">
@import './style/_base_styles.scss';
@import './style/_palette.scss';
@import './style/_forms.scss';
@import './style/_bg_texture.scss';

html,
body {
  height: 100%;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  border-top: 3px solid $color1;
}

body {
  @include bg_texture;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 4em;
}
</style>
