<template>
  <div class="qol_category_display">
    <h4 class="name">{{category.name}}</h4>
    
    <div class="scale_tray">
      <span
        class="scale_fill"
        :style="generatedStyles(category)"
      ></span>
      <span class="rating">{{roundRating(category.score_out_of_10)}} </span>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable  */
export default {
  props: ['category'],
  name: 'CategoryDisplay',
  methods: {
  	roundRating (rating) {
  		return Math.max( Math.round(rating * 10) / 10, 2.8 ).toFixed(2);
  	},
  	generatedStyles (category) {
  		return {
  			width: `${category.score_out_of_10 * 10}%`
  		}
  	}
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/_palette.scss';
@import '../../style/_mixins.scss';

.qol_category_display {
  @include opaque_el;
  margin: 0 .5rem .5rem 0;
  padding-bottom: 2rem;
}

.name {
  color: white;
}

.rating {
  color: white;
  text-shadow: 0 0 4px rgba(black, .9);
  display: inline-block;
  position: absolute;
  right: .5rem;
  top: .2rem;
}

$scale_radius: 5px;

.scale_tray {
  background-color: $dark2;
  height: 1.5em;
  margin: 0 1rem;
  border-radius: $scale_radius;
  position: relative;
}

.scale_fill {
  display: inline-block;
  height: 100%;
  position: absolute;
  left: 0;
  border-radius: $scale_radius;
  background-color: $color1;
}
</style>
