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
      <div class="collapse navbar-collapse" id = "navbarone">
          <ul class="navbar-nav">
            <li class="nav-item active fontMain">
              <a href="#" class="nav-link active">
                <router-link to="/" class="fontMain">Home</router-link>
              </a>
            </li>
            <li class="nav-item active fontMain">
              <a href="#" class="nav-link active">
                <router-link to="/" class="fontMain" >About</router-link>
              </a>
            </li>
            <li class="nav-item dropdown fontMain">
              <a href="#"
                 class="nav-link dropdown-toggle"
                 id="navbarDropdown" role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded="false" >
                Account
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a href="#"
                      class="dropdown-item">
                      <router-link to="/" class="fontMainDropdown">Home</router-link>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <router-link to="/StudentLogin" class="fontMainDropdown">Log In</router-link>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      <router-link to="/StudentSignUp" class="fontMainDropdown">Sign Up</router-link>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="dropdown-item">
                      Log Out
                    </a>
                  </li>
                </ul>


              </a>

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