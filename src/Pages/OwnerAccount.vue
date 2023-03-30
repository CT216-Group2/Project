<template>

  <div class="fullPage">
    <div  class="display-box" id="displayedAcc">
      <div class="text-center" id="title-div">
        <h2>Your Account</h2>
      </div>
    </div>
    <div class="popup-background" id="popup-background">
      <div class="popup" id="createPopup">
        <form>
          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Location</label>
            <input  class="form-control" id="size" v-model="location" placeholder="Enter the Address">
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
          <button type="submit" id="submit" class="btn btn-primary" @click.prevent="addHouse();hide('createPopup');hide('popup-background')">Submit</button>
          <button type="button" id="cancel" class="btn btn-secondary" @click.prevent="hide('createPopup');hide('popup-background')">Cancel</button>
        </form>
      </div>
    </div>

    <div class="popup-background2" id="popup-background2">
      <div class="popup" id="createLikesPopup">
        <form>
          <div class="text-center" id="title-div">
            <h3><u>Likes</u></h3>
          </div>
          <button  @click.prevent="hide('createLikesPopup');hide('popup-background2');" id="closeButt"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg></button>
          <div v-if="groups.length>0">
            <ul>
              <li v-for="group in groups" :key="group.id">

                <div class="groupCard">
                  <div class="group-card-body">
                    <div style="position: absolute;   left: 50%; transform: translateX(-50%); color: blue"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                    </svg></div>
                    <div style="padding-top: 15px">
                      <p class="card-text"><b>Area:&nbsp; </b><span>{{group.data.area}}</span></p>
                      <p class="card-text"><b>Size:&nbsp; </b><span>{{group.data.size}}</span></p>
                      <a id="link" @click.prevent="shareContactDetails(group.id)">Share Details</a>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>

    <div v-if="houses.length>0">
      <ul>
        <li v-for="(House , index)  in houses" :key="index">
          <div class="dispDiv">
          <span>
            <div class="card" style="width: 18rem;">
              <div class="carousel slide" :id="carouselIndex(index)" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, imageIndex) in House.image" :key="imageIndex"
             :class="['carousel-item', {active: imageIndex === House.index}]">
          <img v-bind:src=image alt="Error Loading Image" class="d-block w-100"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel' + index"
              @click="showImage(House.index -  1, House)">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" :data-bs-target="'#carousel' + index"
              @click="showImage(House.index + 1, House)">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
            </div>
              <div class="card-body">
                <h5 class="card-title text-center"><span>{{ House.area }}</span></h5>
                <p style="background-color: #f0f0f0; margin:5px;  padding: 5px;border-radius: 4px" class="card-text"><b>Description: <br></b><span>{{ House.description }}</span></p>
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text"><b>Number of Beds: </b><span>{{ House.numBed }}</span></p>
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text"><b>Number of Bathrooms: </b><span>{{ House.numBath }}</span></p>
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text"><b>Rent (Monthly): </b>€<span>{{ House.mRent }}</span></p>
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text"><b>Location: <br></b><span>{{ House.location }}</span></p>
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text" ><b>Likes: </b><span>{{House.numlikes}}</span></p>

                <div class="viewDel" style="display: flex; flex: 1;">
                <button id="seeLikes" style="margin-right: 15px; margin-left: 5px" class="btn btn-primary" @click.prevent=" fetchLikes(House.id);show('createLikesPopup');show('popup-background2'); this.currenthouseId=House.id">See Likes</button>
              <br>
              <button id="delHouse" class="btn btn-danger" @click.prevent=" deleteHouse(House.id);" >Delete House</button>
              </div>
  </div>
</div>
          </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="divBig">
      <div style="display: flex; justify-content: center; align-items: center;">
        <button type="button" id="logoutButt" class="btn btn-success" @click="logout()"><p class="mainFont"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg> <b>Logout</b></p></button>

        <button id="addButt" type="button" class="btn btn-success" @click="show('createPopup'); show('popup-background')">
          <p class="mainFont">
            <b>Add New House</b>
          </p>
        </button>

      </div>
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
  computed: {
    carouselIndex() {
      return (index) => {
        return `${'carousel'}${index}`;
      };
    },
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
        this.houses = result.data
        console.log(this.houses);
      });
    },
    showImage(index, House) {
      const length = House.image.length;
      //console.log(House.image.length);
      if (index == -1){
        House.index = length -1;
      }else {
        House.index = Math.abs(index) % length;
      }
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
        this.fetchHouses();
      }); // To refresh the client
    },
  },
};
</script>

<style scoped>
.form-control , .input-group-text, .form-select, .whatever   {
  height: 35px;
}
.mb-3{
  margin-bottom: 1px;
}
.fullPage{
  font-size: .75em;
}
#displayedAcc {
  display: table;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: white;
  width: fit-content;
}
#addButt, #logoutButt {
  margin: 10px 20px;
}
#closeButt {
  position: absolute;
  top: 10px;
  right: 10px;
}
#closeButt:hover {
  color: red;
}
.mainFont{
  margin-bottom: 0;
}
#logoutButt, #addButt {
  background-color: white;
  border: 2px solid green;
  color: green;
  transition: all 0.25s ease-in-out;
}
.groupCard{
  margin: 8px;
  padding: 3px;
  background-color: white;
  border: 2px solid grey;
  border-radius: 5px;
}
#seeLikes:hover {
  background-color: white;
  border: 2px solid blue;
  color: blue;
}
#delHouse {
  background-color: #87dec7;
  border: 2px solid white;
  color: white;
  transition: all 0.25s ease-in-out;
}
#delHouse {
  background-color: red;
  border: 2px solid white;
  color: white;
  transition: all 0.25s ease-in-out;
}
#delHouse:hover {
  background-color: white;
  border: 2px solid red;
  color: red;
}
#delHouse {
  background-color: red;
  border: 2px solid white;
  color: white;
  transition: all 0.25s ease-in-out;
}
#link{
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
#link:hover{
  text-decoration: none;
}
#logoutButt:hover, #addButt:hover {
  background-color: green;
  border: 2px solid green;
  color: white;
}
.divBig {
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 10px 0;
}
.fullPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  padding-bottom: 70px; /* Add some padding to the bottom */
  font-size: .75em;
  font-family: Roboto Slab, serif;
}
.popup {
  display: none;
  position: fixed;
  padding: 10px;
  object-fit: fill;
  left: 50%;
  top: 50%;
  width: 700px;
  transform: translateY(-21%) translateX(-50%);
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
#popup-background2 {
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
input[type="file"] {
  appearance: none;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  color: #555;
}
.carousel-item.active {
  display: block;
}
.carousel-item:not(.active) {
  display: none;
}
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.carousel-item {
  max-width: 300px;
  max-height: 160px;
}
p{
  margin-bottom: 0;
}
li {
  width: fit-content;
  object-fit: contain;
  display: inline-block;
  margin: 10px;
}
ul {
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
}
img {
  border-radius: .25em;
}
.card {
  padding: 5px;
  margin: 5px;
}
.carousel-control-prev, .carousel-control-next {
  background-color: #10bd90; /* replace with your desired color */
  border-color: #10bd90; /* replace with your desired color */
}
</style>