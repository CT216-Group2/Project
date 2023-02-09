 <template>
  <div>
  <!-- FOOTER -->
  <footer class="w-100 p-3 mainColour position-absolute start-0">
    <div class="container py-1 ">
      <div class="row gy-4 gx-5">
        <div class="col-lg-8 col-md-6">
          <h5 class="h1 text-white mainFont">Accommodate<a class="secondaryColour">Me</a></h5>
          <p class="small text-white">Where Students meet Houses</p>
          <p class="small mainFont black mb-0">&copy; Copyrights. All rights reserved. <a class="mainFont secondaryColour" href="#">Group 2</a></p>
        </div>
        <div class="col-lg-4 col-md-3">
          <h5 class="text-white mb-3 mainFont">Quick links</h5>
          <ul class="list-unstyled text-muted">
            <li><a class="secondaryColour mainFont"><router-link to="/" class="secondaryColour">Home</router-link></a></li>
            <li><a class="secondaryColour mainFont" href="#">About</a></li>
            <li><a class="secondaryColour mainFont"><router-link to="/StudentAccount" class="secondaryColour">Account</router-link></a></li>
            <li><a class="secondaryColour mainFont"><router-link to="/StudentSignUp" class="secondaryColour">Sign-Up</router-link></a></li>
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

</style>