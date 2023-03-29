<template xmlns="http://www.w3.org/1999/html">
  <div>
    <nav class="navbar fixed-top navbar navbar-expand-lg navbar-dark mainColour"  data-bs-theme="light" >
      <h1 class="navbar-brand mb-0 h1">

        <h1 class="logoFont1" href="#">
          <img class = "d-inline-block align-top"
               src="/House.ico"
               width = "25" height="25"/>
           Accommodate<a class="logoFont2">Me </a>
        </h1>
      </h1>
      <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarone"
          class="navbar-toggler"
          aria-controls="navbarone"
          aria-expanded="false"
          aria-label="Toggle Navigation"
          >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarone">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active fontMain">
            <router-link to="/" class="nav-link active fontMain">Home</router-link>
          </li>
          <li class="nav-item active fontMain">
            <router-link to="/" class="nav-link active fontMain">About</router-link>
          </li>
          <li class="nav-item dropdown fontMain">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Student
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/" class="dropdown-item fontMainDropdown">Profile</router-link>
              </li>
              <li>
                <router-link to="/StudentLogin" class="dropdown-item fontMainDropdown">Log In</router-link>
              </li>
              <li v-if="this.$LoggedIn">
                <router-link to="/StudentSignUp" class="dropdown-item fontMainDropdown">Sign Up</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown fontMain">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Landlord
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/OAP" class="dropdown-item fontMainDropdown">Profile</router-link>
              </li>
              <li>
                <router-link to="/StudentLogin" class="dropdown-item fontMainDropdown">Log In</router-link>
              </li>
              <li>
                <router-link to="/StudentSignUp" class="dropdown-item fontMainDropdown">Sign Up</router-link>
              </li>
            </ul>
          </li>
        </ul>
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
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },

}

</script>

<style scoped>
.fontMain{
  font-family: Calibri,ui-sans-serif;
  color: white;
  text-transform: uppercase;
  font-weight: bold ;
}
.fontMainDropdown{
  font-family: Calibri,ui-sans-serif;
  color: #790404;
  text-transform: uppercase;
  font-weight: bold ;
}
</style>