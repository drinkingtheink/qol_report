<template>
  <div class="indicator_stage" :class="stateClass">
    <i class="fa" :class="iconClass"></i>
    <span class="indicator"></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Indicator',
  computed: {
    ...mapState(['currentLocale']),
    iconClass () {
      return this.currentLocale ? 'fa-globe' : 'fa-search'
    },
    stateClass () {
      return this.currentLocale ? 'profile' : 'search'
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../style/_palette.scss';

.indicator_stage {
  position: relative;
  height: .5rem;
  margin-bottom: 8rem;
  background-color: $dark;

  .indicator {
    display: inline-block;
    width: 0;    
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid $color1;
    margin: 0 auto 1rem auto;
  }

  i {
    position: absolute;
    left: 0;
    right: 0;
    top: 1rem;
    font-size: 2rem;
    margin: auto
  }
}
</style>