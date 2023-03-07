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
              <a class="nav-link active mainFont" aria-current="page"><router-link to="/" class="router-link">Home</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link mainFont" href="#">About</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle mainFont" href="#"  data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul class="dropdown-menu">
                <li v-if="isLoggedIn"><a class="dropdown-item mainFont"><router-link to="/OwnerAccount" class="black">Profile</router-link> </a></li>
                <li v-if="!isLoggedIn"><a class="dropdown-item mainFont"><router-link to="/Login" class="black">Login</router-link></a></li>
                <li v-if="!isLoggedIn"><a class="dropdown-item mainFont"><router-link to="/OwnerSignUp" class="black">Sign up</router-link> </a></li>
                <li><a class="dropdown-item mainFont">><router-link @click="logout" to="/">Logout</router-link></a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import app from "../api/firebase"
  ;
import
{getAuth, onAuthStateChanged, signOut} from "firebase/auth"
  ;
export default
{
  name: "Navigation"
  ,
  data() {
    return
    {
      isLoggedIn : false
    }
  }
  ,
  created (){
// Check if the user is logged in
    const auth = getAuth
        (app
        )
    ;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console
            .log(user)
        ;
        this.isLoggedIn = true;
      } else
      {
        this.isLoggedIn = false;
      }
    })
    ;
  }
  ,
  methods : {
    logout(){
      signOut
      (getAuth
      (app)).then(() => {
// Send them back to the home page!
        this.$router.push("/"
        )
        ;
      })
      ;
    }
  }
}

</script>

<style scoped>

</style>