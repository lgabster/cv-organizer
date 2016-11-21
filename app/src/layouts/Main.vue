<template>
  <div>
    <header-component/>

    <div class="container main-content">
      <slot></slot>
    </div>

    <footer-component/>
  </div>
</template>

<script>
  import HeaderComponent from './Header.vue'
  import FooterComponent from './Footer.vue'
  export default {
    components: {
      HeaderComponent,
      FooterComponent
    }
  }
</script>

<style lang="sass">
  @import '../style/variables';
  body {
    background-color: $color-white;
  }
</style>
