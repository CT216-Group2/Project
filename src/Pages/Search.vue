<template>
  <div class="fullPage">
    <div class="searchArea">
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">Area</label>
        <select class="form-select" id="inputGroupSelect01" v-model="selectedArea">
          <option value="" disabled>Please select an area</option>
          <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <select class="form-select" id="inputGroupSelect02" v-model="selectedSize">
          <option value="" disabled>Please select a size</option>
          <option v-for="size in sizes" :key="size" :value="size">{{ size }} or more bedrooms</option>
        </select>
        <label class="input-group-text" for="inputGroupSelect02">Group Size</label>
      </div>
      <div>
        <button class="btn btn-outline-secondary" id="searchButt" type="button" @click="getHouse"
                style="background-color: rgb(121,4,4); color: white; margin: 0; padding: 3px 10px">Search
        </button>
      </div>
    </div>
    <div v-if="houseArray.length > 0">
      <ul>
        <li v-for="(House , index)  in houseArray" :key="index">
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
                <p style="background-color: #f0f0f0; padding: 5px;border-radius: 4px" class="card-text"><b>Description: <br></b><span>{{ House.description }}</span></p>
                <p style="background-color: #f0f0f0; padding: 5px;border-radius: 4px" class="card-text"><b>Number of Beds: </b><span>{{ House.numBed }}</span></p>
                <p style="background-color: #f0f0f0; padding: 5px;border-radius: 4px" class="card-text"><b>Number of Bathrooms: </b><span>{{ House.numBath }}</span></p>
                <p style="background-color: #f0f0f0; padding: 5px;border-radius: 4px" class="card-text"><b>Rent (Monthly): </b>€<span>{{ House.mRent }}</span></p>
                <p style="background-color: #f0f0f0; padding: 5px;border-radius: 4px" class="card-text"><b>Location: <br></b><span>{{ House.location }}</span></p>


        <div v-if="likeArray.includes(House.id)"><a class="btn btn-danger" @click="removeLike(House.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg></a></div>
   <div v-else><a class="btn btn-danger" @click="addLikes(House.id)"> <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                           height="16" fill="currentColor"
                                                                           class="bi bi-heart" viewBox="0 0 16 16">
  <path
      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg></a></div>



  </div>
</div>
          </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import 'firebase/storage';
import {ref, getStorage, getDownloadURL} from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  props: {
    images: Array,
    index: Number,
  },
  computed: {
    carouselIndex() {
      return (index) => {
        return `${'carousel'}${index}`;
      };
    },
  },
  data() {
    return {
      filePath: '',
      image: '',
      houseArray: [],
      Liked: '',
      handle: "",
      user: null,
      likeArray: [],
      areas: ["Knocknacarra", "Rahoon", "Dangan", "Newcastle", "Shantalla", "Salthill", "Claddagh", "TerryLand", "WellPark", "Ballybane", "Murrough", "Ballybrit", "Roscam", "Doughiska"],
      sizes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectedArea: null,
      selectedSize: null,
      currentIndex: 0,
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
        this.getLikes();
      } else {
        console.log("No user found")
        // User is not signed in
      }
    });
    //window.setInterval(this.getComments, 1000);
  },
  methods: {
    getHouse() {
      const functions = getFunctions(app);
      const getHouse = httpsCallable(functions, 'gethouse');
      getHouse().then((result) => {
        let index = 0;
        if (this.selectedSize == null && this.selectedArea == null) {
          this.houseArray = result.data.map(house => ({...house, index: 0}));
        } else if (this.selectedSize == null) {
          this.houseArray = result.data.filter(house => house.area === this.selectedArea).map(house => ({...house, index: 0}));
        } else if (this.selectedArea == null) {
          this.houseArray = result.data.filter(house => house.numBed <= this.selectedSize).map(house => ({...house, index: 0}));
        } else {
          this.houseArray = result.data.filter(house => house.area === this.selectedArea && house.numBed >= this.selectedSize).map(house => ({...house, index: 0}));
        }
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
        try {
          console.log(getDownloadURL(storageRef))
          return getDownloadURL(storageRef);
        } catch (error) {
          console.error(error);
          return null;
        }
      })
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
    addLikes(houseId) {
      const functions = getFunctions(app);
      const addLikes = httpsCallable(functions, 'addLikes')
      addLikes({houseId: houseId, user: this.handle})
          .then(result => {
            console.log(result.data)
            this.getLikes();
          })
          .catch(error => {
            console.error(error)
          })
    },
    getLikes() {
      const functions = getFunctions(app);
      const getLikes = httpsCallable(functions, 'getgrouplike');
      getLikes({user: this.handle}).then((result) => {
        this.likeArray = result.data;
        console.log(this.likeArray);
        this.getHouse();
      }).catch((error) => {
        console.error(error);
      });
    },
    removeLike(houseId) {
      const functions = getFunctions(app);
      const removeLike = httpsCallable(functions, 'removelike')
      removeLike({houseId: houseId, user: this.handle})
          .then(result => {
            console.log(result.data);
            this.getLikes();
          })
          .catch(error => {
            console.error(error);
          })
    }
  }
}
</script>

<style scoped>

#searchButt {
  left: 50%;
  transform: translateX(-50%);
}

.card {
  padding: 5px;
  margin: 5px;
}

.fullPage {
  font-family: Roboto Slab, serif;
  font-size: .75em;
}

.searchArea {
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 15px;
  position: relative;
  left: 50%; /* center the div horizontally */
  transform: translateX(-50%) translateY(0%);
  width: 80vw;
}

img {
  border-radius: .25em;
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

.carousel-control-prev, .carousel-control-next {
  background-color: #10bd90; /* replace with your desired color */
  border-color: #10bd90; /* replace with your desired color */
}

#likeButt {
  left: 50%;
  transform: translateX(-50%);
}

</style>