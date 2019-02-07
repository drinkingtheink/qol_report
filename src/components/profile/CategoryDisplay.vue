<template>
  <div class="qol_category_display">
    <h4>{{category.name}}</h4>
    <p class="rating">{{category.score_out_of_10}} </p>
  </div>
</template>

<script>
export default {
  props: ['category'],
  name: 'CategoryDisplay'
}
</script>
