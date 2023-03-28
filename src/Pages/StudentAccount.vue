<template>

  <div v-if="likedHouseArray.length > 0">
    <ul>
      <li v-for="(House , index)  in likedHouseArray" :key = "index">
        <div class="dispDiv" >
          <span>
            <div class="card"  style="width: 18rem;">
            <div :id="'carousel'+index" class="carousel slide">
            <div class="carousel-inner">
            <div class="carousel-item active">
              <img v-bind:src="House.data.image" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img v-bind:src="House.data.image" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img v-bind:src="House.data.image" class="d-block w-100" alt="...">
            </div>
            </div>
              <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel'+index" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
                <button class="carousel-control-next" type="button" :data-bs-target="'#carousel'+index" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
            </div>
              <div class="card-body">
               <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </span>
        </div>
      </li>
    </ul>
  </div>







</template>

<script>
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from "@/api/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  data(){
    return{
      handle: "",
      user: null,
      likedHouseArray:[],
    }
  },
  created() {
    // Check for logged in user
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User", user);
        this.user = user;
        this.handle = user.email;
        this.getGroupLikes();

      } else {
        console.log("No user found")
        // User is not signed in
      }

    });
  },
  methods: {
    getGroupLikes(){
      const functions = getFunctions(app);
      const getGroupLikes = httpsCallable(functions, "getgrouplikes");
      console.log(this.handle);
      getGroupLikes({ user: this.handle }).then((result) => {
        console.log(result.data);
        console.log(this.handle);
        this.likedHouseArray = result.data;
      });

    }
  }
};
</script>
<style scoped>
.card{
  padding: 10px;
}
img{
  border-radius: .25em;
}
li{
  width: fit-content;
  object-fit: contain;
  display: inline-block;
  margin: 10px;
}
ul{
  width: 80vw;
  margin: 0;
  padding: 0;
}
</style>