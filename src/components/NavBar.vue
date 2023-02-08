<template>
  <div>
    <nav class="navbar fixed-top navbar navbar-expand-lg navbar-dark mainColour"  data-bs-theme="light" >
      <div>
        <h1 class="navbar-brand mainFont" href="#">Accommodate<a class="secondaryColour">Me</a></h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active mainFont" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mainFont" href="#">About</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle mainFont" href="#"  data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item mainFont" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item mainFont" href="#">Login</a></li>
                <li><a class="dropdown-item mainFont" href="#">Sign up</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navBar"
}
</script>

<style scoped>

</style>