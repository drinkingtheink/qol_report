<template>
  <section>
    <h4 class="animated fadeInDown" style="animation-delay: .3s;">Or try one of these destinations...</h4>
    
    <div class="static_locale_options">
      <div 
        class="static_option animated fadeIn"
        v-for="(option, index) in staticLocaleOptions"
        :key="option.name"
        :style="`animation-delay: ${index}00ms;`"
        @click="updateCurrentLocale(option.data)"
      >
        {{ option.name }}
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import { staticLocaleOptions } from '../../data/staticLocales.js'
export default {
  name: 'StaticLocaleOptions',
  data () {
    return {
      staticLocaleOptions: staticLocaleOptions
    }
  },
  methods: {
    ...mapMutations(['updateCurrentLocale'])
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/_palette.scss';
@import '../../style/_mixins.scss';

.static_locale_options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.static_option {
  padding: 2rem 1rem;
  background-color: $dark;
  width: 28%;
  margin: 0 .5rem .5rem 0;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    color: $color1;
    background-color: $dark2;
  }
}
</style>