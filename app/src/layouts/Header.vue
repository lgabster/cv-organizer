<template>
  <div class="pos-f-t">
    <div class="collapse" id="navbar-header">
      <div class="container bg-inverse p-1">
        <h3>ASDASASD</h3>
        <p>Toggleable via the navbar brand.</p>
      </div>
    </div>
    <nav class="navbar navbar-dark navbar-static-top bg-faded bg-inverse">
      <div class="container">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-expanded="false" aria-controls="exCollapsingNavbar2" aria-label="Toggle navigation"></button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
          <v-link class="navbar-brand" href="/">CV App</v-link>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <v-link class="nav-link" href="/cv">CV</v-link>
            </li>
            <li class="nav-item">
              <v-link class="nav-link" href="/about">About</v-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  export default {
    components: {
      VLink
    }
  }
</script>
