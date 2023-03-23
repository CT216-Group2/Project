<template>
  <link rel="stylesheet" href="src/assets/bootstrap.css">
  <link rel="stylesheet" href="src/assets/bootstrap-grid.css">
  <link rel="stylesheet" href="src/assets/bootstrap-reboot.css">

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
        // User is signed in
      } else {
        console.log("No user found")
        // User is not signed in
      }
    });
    console.log("HERE//");
    this.getGroupLikes();
  },

  methods: {

    getGroupLikes(){
      const functions = getFunctions(app);
      const getGroupLikes = httpsCallable(functions, "getgrouplikes");
      getGroupLikes({user: this.handle}).then((result) => {
        console.log(result.data);
        this.getHouses(result.data);

      })
    },

    getHouses(houseIds){
      const functions = getFunctions(app);
      const getHouses = httpsCallable(functions, "getlikedhouses");
      getHouses().then((result) => {
        console.log(result.data);
        const filteredHouses = result.data.filter(house => houseIds.includes(house.id));
        console.log(filteredHouses);
        this.likedHouseArray = filteredHouses;
      })
    },

    

  }
};




</script>
<style scoped>

</style>