<template>
  <div class="pos-f-t">
    <div class="collapse" id="navbar-header">
      <div class="container bg-inverse p-1">
        <h3>Collapsed content</h3>
        <p>Toggleable via the navbar brand.</p>
      </div>
    </div>
    <nav class="navbar navbar-dark navbar-static-top bg-faded bg-inverse">
      <div class="container">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2" aria-expanded="false" aria-controls="exCollapsingNavbar2" aria-label="Toggle navigation"></button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
          <a class="navbar-brand" href="#">Sticky footer</a>
          <ul class="nav navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Nav item <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Another nav item</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">More nav</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Last link</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        msg:'Hello Vue',
      }
    }
  }
</script>

<style>
</style>
