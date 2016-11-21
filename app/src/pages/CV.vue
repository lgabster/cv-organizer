<template>
  <main-layout>
    <p class="cica">CV page</p>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  export default {
    components: {
      MainLayout
    }
  }
</script>

<style lang="sass">
  @import '../style/variables';
  .main-content {
    background-color: $color-red;
  }
</style>
