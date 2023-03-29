<template>
  <div class="account-page">
    <h1>My Account</h1>
    <div class="details">
      <div class="detail_left">
        <div class = "pd-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 40 40">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          </svg>
          <div>
            <h3>User Name </h3>
            <p>Landlord</p>
          </div>
        </div>

      </div>
      <div class="detail_right">

      </div>
    </div>
    <button type="button" class="btn btn-success" @click="show('createPopup'); show('popup-background')">
      <p class="white mainFont">
        Add New House
      </p>
    </button>
    <div class="popup-background" id="popup-background">
    <div class="popup" id="createPopup">
      <form>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Size</label>
          <input  class="form-control" id="size" v-model="houseName" placeholder="House Name">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Size</label>
          <input  class="form-control" id="size" v-model="location" placeholder="Enter the Location">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Area</label>
          <select class="form-select" id="inputGroupSelect01" v-model="selectedArea" style="color: #666666;">
            <option class="whatever"  value="" disabled>Please select an area</option>
            <option class="whatever" v-for="area in areas" :key="area" :value="area">{{ area }}</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Description</label>
          <input  class="form-control" id="size" v-model="description" placeholder="Add a description...">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Number of Bedrooms</label>
          <input  class="form-control" id="size" v-model="numBed" placeholder="Enter the Number of Beds...">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"  style="color: #666666;">Number of Bathrooms</label>
          <input  class="form-control" id="size" v-model="numBath" placeholder="Enter the Number of Bathrooms...">
        </div>

        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Monthly Rent</label>
          <input  class="form-control" id="size" v-model="mRent" placeholder="Enter the monthly Rent...">
        </div>
        <div>
          <input type="file" id="file" multiple="multiple" v-on:change="fileArray=$event.target.files" >
        </div>
        <br>
        <button type="submit" class="btn btn-primary" @click.prevent="addHouse();hide('createPopup');hide('popup-background')">Submit</button>
        <button type="button" class="btn btn-secondary" @click.prevent="hide('createPopup');hide('popup-background')">Cancel</button>
      </form>
    </div>
    </div>

    <div class="popup" id="createLikesPopup">
      <form>
        <h3>Likes</h3>
        <div v-if="groups.length>0">
          <ul>
            <li v-for="group in groups" :key="group.id">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  Group Size: {{group.data.size}}       Group Area:     {{group.data.area}}
                  <br>
                  <a @click.prevent="shareContactDetails(group.id)" style="#0f8fef : white">Share Details</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>


    <h2>My Houses</h2>
    <div v-if="houses.length>0">
      <ul>

        <li v-for="house in houses" :key="house.id">

          <div class="card" style="width: 18rem;">
            <img :src="house.image[0]" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">Name:  {{ house.name }}</p>
              <p class="card-text">Location: {{ house.location }}</p>
              <p class="card-text">Description: {{ house.description }}</p>
              <p class="card-text">Bedrooms: {{ house.numBed }}</p>
              <p class="card-text">Bathrooms: {{ house.numBath }}</p>
              <p class="card-text" >Likes: {{house.numlikes}}</p>
              <a @click.prevent=" fetchLikes(house.id);show('createLikesPopup'); this.currenthouseId=house.id" style="#0f8fef : white">See Likes</a>
              <br>
              <a @click.prevent=" deleteHouse(house.id);" style="#0f8fef : white">Delete House</a>
            </div>
          </div>

        </li>
      </ul>
    </div>

    <h2>Account Settings</h2>
    <div>
      <p>Email:  {{this.user.email}}</p>
      <p>Password: {{this.password}}</p>
      <button type="submit">Save</button>
    </div>
  </div>
</template>

<script>
import firebase from '../api/firebase';
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const db = getFirestore(app);
import 'firebase/storage';
import 'firebase/functions';
import {getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  data() {
    return {
      houses: [], // an array of house objects
      likes: [], // an array of like objects
      name: '', // the landlord's name
      email: '', // the landlord's email address
      password: '', // the landlord's password
      showHouseForm: false,
      houseName:'',
      location:'',
      description:'',
      numBath:'',
      numBed:'',
      file:'',
      fileArray:[],
      filePath: "images/",
      handle:'',
      user:null,
      areas: ["Knocknacarra","Rahoon","Dangan","Newcastle","Shantalla","Salthill","Claddagh","TerryLand","WellPark","Ballybane","Murrough","Ballybrit","Roscam","Doughiska"],
      groups:[],
      counter:-1,
      mRent:0,
      selectedArea:'',
      currenthouseId: ''
    };
  },
  created() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log("User", user);
        this.user = user;
        this.handle = user.email;
        this.fetchHouses();
        this.fetchLikes(this.houses);
        // User is signed in
      } else {
        //console.log("No user found")
        // User is not signed in
      }
    });
    // fetch houses and likes data from an API
    // this.fetchLikes();
  },
  methods: {
    shareContactDetails(groupId){
      console.log(groupId);
      const functions = getFunctions(app);
      const updatedetails = httpsCallable(functions, 'updatedetails');
      updatedetails({"email" : this.handle, "groupId" : groupId, "houseId": this.currenthouseId }).then((result) => {
        console.log(result.data);
      });
    },
    show(id) {
      document.getElementById(id).style.display = 'block';
    },
    hide(id) {
      document.getElementById(id).style.display = 'none';
    },
    showLikes(id) {
      document.getElementById(id).style.display = 'block';
    },
    hideLikes(id) {
      document.getElementById(id).style.display = 'none';
    },
    fetchHouses() {
      console.log("running");
      const functions = getFunctions(app);
      const gethouses = httpsCallable(functions, 'gethouses');
      gethouses({"user" : this.handle}).then((result) => {
        this.houses = result.data;
        console.log(this.houses);
      });
    },
    fetchLikes(houseId) {
      console.log(houseId);
      const functions = getFunctions(app);
      const getLikes = httpsCallable(functions, 'getLikes');
      getLikes({"houseId" : houseId}).then((result) => {
        this.groups = result.data;
        console.log(this.groups);
      });
    },
    addHouse() {
      const functions = getFunctions(app);
      const uploadHouse = httpsCallable(functions, 'uploadHouse');
      // Create an array of promises that will resolve to the download URLs of the images
      const uploadPromises = [];
      for (let i = 0; i < this.fileArray.length; i++) {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg'
        };
        const filePath = "images/" + this.fileArray[i].name;
        const storageRef = ref(storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, this.fileArray[i], metadata);
        // Add the promise that will resolve to the download URL of the current image to the array
        uploadPromises.push(
            new Promise((resolve, reject) => {
              uploadTask.on('state_changed', null, reject, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(resolve);
              });
            })
        );
      }
      // Wait for all the promises in the array to resolve
      Promise.all(uploadPromises).then((downloadURLs) => {
        // Call the uploadHouse function with the array of download URLs
        uploadHouse({
          "name": this.houseName,
          "location": this.location,
          "description": this.description,
          "numBed": this.numBed,
          "numBath": this.numBath,
          "image": downloadURLs,
          "user": this.handle,
          "numlikes": 0,
          "mRent":this.mRent,
          "area":this.selectedArea
        }).then((result) => {
          console.log("House uploaded successfully");
          this.fetchHouses();
        }).catch((error) => {
          console.error("Error uploading house: ", error);
        });
      }).catch((error) => {
        console.error("Error uploading images: ", error);
      });
    },
    deleteHouse(id){
      console.log(id);
      const functions = getFunctions(app);
      const deleteHouse = httpsCallable(functions, 'deleteHouse');
      deleteHouse({houseId:id}).then((result) => {
        console.log(result.data);
        if(result.data == "Document successfully deleted")
          this.fetchHouses();
      }); // To refresh the client
    },
  },
};
</script>

<style scoped>
.form-control , .input-group-text, .form-select, .whatever {
  height: 25px;
}

.popup {
  display: none;
  position: fixed;
  padding: 10px;
  object-fit: fill;
  left: 50%;
  top: 50%;
  width: 700px;
  transform: translateY(-20%) translateX(-50%);
  margin-top: -60px;
  background: #FFF;
  border: 3px solid #F04A49;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 0 10px 5px   rgba(240,74,73,.7);
}
#popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 15;
}
#popup:after {
  position: fixed;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  z-index: -2;
}
#popup:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FFF;
  z-index: -1;
}
.btn.mainColour:hover {
  opacity: .5;
}
.container {
  margin: 20px;
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.titleDiv {
  margin-bottom: 10px;
  text-align: center;
}

.dispDiv {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(255,253,208, 1);
  padding: 20px;
  border: 2px solid #FFFDD0;
}

.form-row {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.form-label {
  flex: 1;
  margin-right: 0;
}

.form-input {
  flex: 2;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
}

button[type="submit"] {
  padding: 6px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0069d9;
}

</style>