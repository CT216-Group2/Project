<template>

  <div class="fullPage">
    <div v-if="this.group">
    <div  class="display-box" v-i id="displayedLikes">
    <div class="text-center" id="title-div">
      <h2>Your Likes</h2>
    </div>
    </div>
    <div v-if="likedHouseArray.length > 0">
      <ul>
        <li v-for="(House , index)  in likedHouseArray" :key="index">
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
                <p style="background-color: #f0f0f0; margin:5px; padding: 5px;border-radius: 4px" class="card-text"><b>Landlord Email: <br></b><span>{{ House.email }}</span></p>
  </div>
</div>
          </span>
          </div>
        </li>
      </ul>
    </div>

    </div>
    <div v-else-if="!this.group">
      <div class="warningMessage">
        <div class="text-center" id="message-title">
          <h2><b>ATTENTION</b></h2>
          <div class="text-center">
            <p class="message-message">
              You are <u>not</u> in a group. <br>
              In order to <i>'Like'</i> Houses you must be in a group <br>
              Join a Group or Create a Group <br>
              <a href="/groups" id="link">Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="divBig">
      <div class="container">
        <button type="button" id="logoutButt" class="btn btn-success" @click="logout()"><p class="mainFont"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg> <b>Logout</b></p></button>
        <div class="links">
          <a  id="link" href="/groups">Change Group</a>
        </div>
        <div class="links">
          <a id="link" href="/search">Search for House</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from "@/api/firebase";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
export default {
  data(){
    return{
      handle: "",
      user: null,
      likedHouseArray:[],
      group: false
    }
  },
  computed: {
    carouselIndex() {
      return (index) => {
        return `${'carousel'}${index}`;
      };
    },
  },
  created() {
    // Check for logged in user
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User", user);
        this.user = user;
        this.handle = user.email;
        this.getGroup();
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
      getGroupLikes({ user: this.handle }).then((result) => {
        let index = 0;
        this.likedHouseArray = result.data.map(house => ({...house, index: 0}));
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
    logout(){
      signOut(getAuth(app)).then(() => {
// Send them back to the home page!
        this.$router.push("/");
      });
    },
    getGroup(){
      const functions = getFunctions(app);
      const getGroup = httpsCallable(functions, "checkgroup");
      getGroup({ user: this.handle }).then((result) => {
        this.group = result.data;
      });
    }
  }
};
</script>
<style scoped>
.warningMessage{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(45%);
  height: 200px;
  width: 500px;
  border: 2px solid red;
  box-shadow: 0 0 20px rgba(245,67,55,0.5);
  border-radius: 5px;
  font-size: 1.5em;
}
#message-title{
  color: red;
}
.message-message{
  color: black;
  padding: 10px;
}
#logoutButt, .links{
  margin: 0 20px;

}

.card {
  padding: 5px;
  margin: 5px;
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
  min-height: 100%;
  padding-bottom: 70px; /* Add some padding to the bottom */
  font-size: .75em;
  font-family: Roboto Slab, serif;
}

img {
  border-radius: .25em;
}
#displayedLikes {
  display: table;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: white;
  width: fit-content;
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

select {
  background-color: #f0f0f0;
  color: #888;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout {
  margin-right: 20px;
}

.links {
  border: 2px solid blue;
  padding: 8px 2px;
  border-radius: 5px;
}

.links a {
  margin-bottom: 0;
  font-weight: bold;
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
#logoutButt {
  background-color: white;
  border: 2px solid green;
  color: green;
  transition: all 0.25s ease-in-out;
}

#logoutButt:hover {
  background-color: green;
  border: 2px solid green;
  color: white;
}
.carousel-control-prev, .carousel-control-next {
  background-color: #10bd90; /* replace with your desired color */
  border-color: #10bd90; /* replace with your desired color */
}

#link{
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
#link:hover{
  text-decoration: none;
}
</style>