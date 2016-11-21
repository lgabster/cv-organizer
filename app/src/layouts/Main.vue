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
    data() {
      return {
        msg:'hello vue',
        asd: 'asasd'
      }
    },
    components: {
      HeaderComponent,
      FooterComponent
    }
  }
</script>
