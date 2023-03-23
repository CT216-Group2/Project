<template>
  <div class="input-group mb-3">
    <label class="input-group-text" for="inputGroupSelect01">Area</label>
    <select class="form-select" id="inputGroupSelect01">
      <option selected>Choose Area</option>
      <option value="Knocknacarra">Knocknacarra</option>
      <option value="Rahoon">Rahoon</option>
      <option value="Dangan">Dangan</option>
      <option value="Newcastle">Newcastle</option>
      <option value="Shantalla">Shantalla</option>
      <option value="Salthill">Salthill</option>
      <option value="Claddagh">Claddagh</option>
      <option value="TerryLand">TerryLand</option>
      <option value="WellPark">WellPark</option>
      <option value="Ballybane">Ballybane</option>
      <option value="Murrough">Murrough</option>
      <option value="Ballybrit">Ballybrit</option>
      <option value="Roscam">Roscam</option>
      <option value="Doughiska">Doughiska</option>
    </select>
  </div>

  <div class="input-group mb-3">
    <select class="form-select" id="inputGroupSelect02">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">Four</option>
      <option value="5">Five</option>
    </select>
    <label class="input-group-text" for="inputGroupSelect02">Group Size</label>
  </div>

  <div class="input-group mb-3">
    <label class="input-group-text" for="inputGroupSelect01">Something else</label>
    <select class="form-select" id="inputGroupSelect03">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>

  <div class="input-group">
    <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <button class="btn btn-outline-secondary" type="button" @click="getHouse" style="background-color: rgb(121,4,4); color: white;">Search</button>
  </div>
  <div v-if="houseArray.length > 0">
    <ul>
      <li v-for="(House , index)  in houseArray" :key = "index">
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
    <a class="btn btn-primary" @click="addLikes(House.id)">Double Tap</a>
  </div>
</div>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>

import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import 'firebase/storage';
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {

  data(){
    return{
      filePath: '',
      image: '',
      houseArray:[],
      Liked: '',
      handle: "",
      user: null,
    }
  },
  created(){
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
    this.getHouse();
    //window.setInterval(this.getComments, 1000);
  },

  methods: {
    getHouse() {
      const functions = getFunctions(app);
      const getHouse = httpsCallable(functions, 'gethouse');

      getHouse().then((result) => {
        //console.log(result.data);
        //console.log(result.data.image);
        //console.log("///////////");
        this.houseArray = result.data;
      }).catch((error) => {
        console.error(error);
      });
    },
    getImage() {
      const storage = getStorage();
      const functions = getFunctions(app);
      const getImage = httpsCallable(functions, 'getImage');
      const storageRef = ref(storage, this.filePath);
      getImage().then((result) => {
        //console.log(result.data);
        try {
          console.log(getDownloadURL(storageRef))
          return getDownloadURL(storageRef);
        } catch (error) {
          console.error(error);
          return null;
        }
      })

    },
    addLikes(houseId) {
      const functions = getFunctions(app);
      const addLikes = httpsCallable(functions, 'addLikes')
      addLikes({ houseId: houseId, user: this.handle })
          .then(result => {
            console.log(result.data)
          })
          .catch(error => {
            console.error(error)
          })
    }
  }
}
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