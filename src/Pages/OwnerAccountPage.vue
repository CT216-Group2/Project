<template>
  <div class="account-page">
    <h1>My Account</h1>
    <div class="details">
        <div class="detail_left">
            <div class = "pd-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
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
    <button type="button" class="btn btn-success" @click="show('createPopup')">
      <p class="white mainFont">
      Add New House
    </p>
    </button>
    <div class="popup" id="createPopup">
      <form>
        <div class="form-group">
          <label for="groupName">House Name</label>
          <input  class="form-control" id="groupName" v-model="houseName" placeholder="Location...">
        </div>
        <div class="form-group">
          <label for="size">Location</label>
          <input  class="form-control" id="size" v-model="location" placeholder="Number of members...">
        </div>
        <div class="form-group">
          <label for="size">Description</label>
          <input  class="form-control" id="size" v-model="description" placeholder="Add a description...">
        </div>
        <div class="form-group">
          <label for="size">Number of Bedrooms</label>
          <input  class="form-control" id="size" v-model="numBed" placeholder="eg. 4...">
        </div>
        <div class="form-group">
          <label for="size">Number of Bathrooms</label>
          <input  class="form-control" id="size" v-model="numBath" placeholder="eg. 2...">
        </div>
        <div>
          <input type="file" id="file" multiple="multiple" v-on:change="fileArray=$event.target.files" >
          hello
        </div>
        <br>
        <button type="submit" class="btn btn-primary" @click.prevent="addHouse();hide('createPopup')">Submit</button>
        <button type="button" class="btn btn-secondary" @click.prevent="hide('createPopup')">Cancel</button>
      </form>
    </div>
    <form v-if="showHouseForm">
      <h2>
        Add a New House
      </h2>
    </form>




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
              <p class="card-text" >Likes: {{numLikes}}</p>
              <a href="/" target="_blank" style="#0f8fef : white">See More</a>

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
      numLikes: [],
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
      counter:-1,
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
    show(id) {
      document.getElementById(id).style.display = 'block';
    },
    hide(id) {
      document.getElementById(id).style.display = 'none';
    },
    fetchHouses() {
      const functions = getFunctions(app);
      const gethouses = httpsCallable(functions, 'gethouses');
      gethouses({"user" : this.handle}).then((result) => {
        this.houses = result.data;
        console.log(this.houses);
      });

    },
    fetchLikes(houses) {
      const functions = getFunctions(app);
      const getLikes = httpsCallable(functions, 'getLikes');
      for(let j=0;j<houses.length;j++) {
        getLikes({"houseId": houses[j].houseId}).then((result) => {
          const likes = result.data;
          this.numLikes.push(likes.length);
          console.log(this.likes);
        });
      }
    },
    addHouse() {
      const functions = getFunctions(app);
      const uploadHouse = httpsCallable(functions, 'uploadHouse');
      const pictureURLArray = [];
      const length = this.fileArray.length;

      for (let i = 0; i < length; i++) {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg'
        };
        this.filePath = "images/";
        const fileName = this.fileArray[i].name;
        this.filePath += fileName;
        const storageRef = ref(storage, this.filePath);
        const uploadTask = uploadBytesResumable(storageRef, this.fileArray[i], metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //  console.log('upload is ' + progress + '% done');
            },
            (error) => {
              console.error("Error uploading file: ", error);
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               // console.log('File available at', downloadURL);
                pictureURLArray.push(downloadURL);
              });
            }
        );
      }

      // Wait for all the getDownloadURL promises to resolve before calling the uploadHouse function
      Promise.all(pictureURLArray).then(() => {
       // console.log("pictureURLArray is full");
        uploadHouse({
          "name": this.houseName,
          "location": this.location,
          "description": this.description,
          "numBed": this.numBed,
          "numBath": this.numBath,
          "image": pictureURLArray,
          "user": this.handle,
        }).then((result) => {
         // console.log("House uploaded successfully");
          this.fetchHouses();
        }).catch((error) => {
          console.error("Error uploading house: ", error);
        });
      });
    },


    saveSettings() {
      // make an API request to save the updated account settings
      // update this.name, this.email, and this.password with the new values
    },

    updatepicURL(id){

    }
  },
};
</script>

<style scoped>
.popup {
  display: none;
  position: fixed;
  padding: 10px;
  width: 280px;
  left: 50%;
  margin-left: -150px;
  height: 180px;
  top: 50%;
  margin-top: -100px;
  background: #FFF;
  border: 3px solid #F04A49;
  z-index: 20;
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

.details{
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>


