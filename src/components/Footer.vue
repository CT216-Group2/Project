<template>
  <div>
    <!-- FOOTER -->
    <footer class="w-100 p-3 mainColour position-absolute start-0">
      <div class="container py-1 ">
        <div class="row gy-4 gx-5">
          <div class="col-lg-8 col-md-6">
            <h5 class="h1 logoFont1">Accommodate<a class="logoFont2">Me</a></h5>
            <p class="logoFont1-1">Where <a class="logoFont2-1" >Students </a> meet Houses</p>
            <p class="small mainFont black mb-0">&copy; Copyrights. All rights reserved. <a class="mainFont secondaryColour" href="#">Group 2</a></p>
          </div>
          <div class="col-lg-4 col-md-3">
            <h5 class="fontMain" style="font-size:18px; color: #0f8fef ">Quick links</h5>
            <ul class="list-unstyled text-muted">
              <li><a class="secondaryColour fontMain"><router-link to="/" class="fontMain">Home</router-link></a></li>
              <li><a class="secondaryColour fontMain"><router-link to="/About" class="fontMain">About</router-link></a></li>
              <li><a class="secondaryColour fontMain"><router-link to="/StudentAccount" class="fontMain">Student Account</router-link></a></li>
              <li><a class="secondaryColour fontMain"><router-link to="/StudentSignUp" class="fontMain">Student Sign-Up</router-link></a></li>
              <li><a class="secondaryColour fontMain"><router-link to="/OwnerAccount" class="fontMain">Owner Account</router-link></a></li>
              <li><a class="secondaryColour fontMain"><router-link to="/OwnerSignUp" class="fontMain">Owner Sign-Up</router-link></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
</script>

<style scoped>
.fontMain{
  font-family: Calibri,ui-sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: bold ;
}
</style>