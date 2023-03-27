<template>
  <div class="account-page">
    <h1>My Account</h1>
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
          <!-- <img :src="house.data.image[0]" class="card-img-top" alt="...">-->
            <div class="card-body">
              <p class="card-text">Name:  {{ house.data.name }}</p>
              <p class="card-text">Location: {{ house.data.location }}</p>
              <p class="card-text">Description: {{ house.data.description }}</p>
              <p class="card-text">Bedrooms: {{ house.data.numBed }}</p>
              <p class="card-text">Bathrooms: {{ house.data.numBath }}</p>
              <a href="/" target="_blank" style="#0f8fef : white">See More</a>
            </div>
          </div>

      </li>
    </ul>
    </div>
    <h2>My Likes</h2>
    <ul>
      <li v-for="like in likes" :key="like.id">
        {{ like.property.address }}
      </li>
    </ul>
    <h2>Account Settings</h2>
    <form @submit.prevent="saveSettings">
      <label>
        Name:
        <input type="text" v-model="name">
      </label>
      <label>
        Email:
        <input type="email" v-model="email">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
      <button type="submit">Save</button>
    </form>
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

    };
  },
  created() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log("User", user);
        this.user = user;
        this.handle = user.email;
        this.fetchHouses();
        // User is signed in
      } else {
        console.log("No user found")
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
      console.log('hello')
      const functions = getFunctions(app);
      const gethouses = httpsCallable(functions, 'gethouses');
      gethouses({"user" : this.handle}).then((result) => {
        this.houses = result.data;
        console.log(this.houses);
      });
    },
    fetchLikes() {
      // make an API request to fetch likes data
      // update this.likes with the response data
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
              console.log('upload is ' + progress + '% done');
            },
            (error) => {
              console.error("Error uploading file: ", error);
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                pictureURLArray.push(downloadURL);
              });
            }
        );
      }

      // Wait for all the getDownloadURL promises to resolve before calling the uploadHouse function
      Promise.all(pictureURLArray).then(() => {
        console.log("pictureURLArray is full");
        uploadHouse({
          "name": this.houseName,
          "location": this.location,
          "description": this.description,
          "numBed": this.numBed,
          "numBath": this.numBath,
          "image": pictureURLArray,
          "user": this.handle
        }).then((result) => {
          console.log("House uploaded successfully");
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
</style>


