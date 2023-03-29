<template>
  <div class="fullPage" style="font-family: Roboto Slab, serif;">

  <div>
    <div  class="display-box" id="displayedGroups">
      <div class="text-center" id="title-div">
        <h2>Discover the Right Group for <u>You </u></h2>
      </div>
<div class="popup-background" id="popup-background">
  <div class="popup" id="createPopup">
    <form>
      <div class="text-center">
        <h2 style="color: #666666;">Create a Group</h2>
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01" style="color: #666666;">Area</label>
        <select class="form-select" id="inputGroupSelect01" v-model="area" style="color: #666666;">
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
      <div class="form-group">
        <label for="size" style="color: #666666;">Size</label>
        <input  class="form-control" id="size" v-model="size" placeholder="Number of members">
      </div>
      <button id="submitButt" class="btn btn-primary" @click.prevent="create();hide('createPopup');hide('popup-background')">Submit</button>
      <button id="cancelButt" type="button" class="btn btn-secondary" @click.prevent="hide('createPopup');hide('popup-background')">Cancel</button>
    </form>
  </div>
</div>
    </div>


  <div v-if="groupsArray.length > 0">
    <ul>
      <li v-for="Group in groupsArray" style="display: inline-block">


        <div class="card">
          <div class="card-body">
            <h5 class="card-title" v-if="Group.data.size <= Group.data.Maxsize" ><b>Status: </b><span style="color: green">Open</span></h5>
            <h5 class="card-title" v-else><b>Status: </b><span style="color: red">Closed</span></h5>
            <p class="card-text"><b>Area:&nbsp; </b><span>{{Group.data.area}}</span></p>
            <p class="card-text"><b>Size:&nbsp; </b><span>{{Group.data.Maxsize}}</span></p>
            <div v-if="Array.from(Group.data.members).includes(this.handle)">
              <button id="leaveButt" @click="leavegroup(Group.id,Group.data.size)" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-x-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"/>
              </svg> Leave Group</button>
            </div>
            <div v-else-if="Group.data.size <= Group.data.Maxsize">
              <button id="joinButt" @click="joingroup(Group.id,Group.data.size)" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
              </svg> Join Group</button>
            </div>
            <div v-else class="fullBanner">
              <div >
                <p style="margin-bottom: 0">Sorry! This Group is Full.</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  </div>

  <div class="divBig">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <button type="button" id="createGButt" class="btn btn-success" @click="show('createPopup');show('popup-background')">
        <p class="white mainFont"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg>Create Group</p>
      </button>
      <div>
        <p>Cant find the right Group? Make One!</p>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import {getFunctions, httpsCallable} from "firebase/functions";
import app from "@/api/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  data() {
    return {
      area: "",
      size: "",
      groupsArray:[],
      handle:"",
      user: null
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
    this.getGroups();
  },
  methods: {
    show(id) {
      document.getElementById(id).style.display = 'block';
    },
    hide(id) {
      document.getElementById(id).style.display = 'none';
    },
    create() {
      const functions = getFunctions(app);
      const create = httpsCallable(functions, 'create');
      create({"area": this.area, "Maxsize": this.size, "members": [this.handle]}).then((result) => {
      console.log(result.data);
      this.getGroups();
      });
    },
    getGroups() {

      const functions = getFunctions(app);
      const getGroups = httpsCallable(functions, 'getgroups');
      getGroups().then((result) => {
        console.log(result.data);
        this.groupsArray = result.data;
      });
    },
    joingroup(id,size){
      const functions = getFunctions(app);
      const joingroup = httpsCallable(functions, 'joingroup?id=' + id);
      joingroup({ member : this.handle ,size: size }).then((result) => {
        this.getGroups();
      });
    },

    leavegroup(id,size){
      const functions = getFunctions(app);
      const leavegroup = httpsCallable(functions, 'leavegroup?id=' + id);
      leavegroup({ member : this.handle, size: size }).then((result) => {
        this.getGroups();
      });
    },

  }
  }
</script>

<style scoped>

.fullPage{
  height: 80vh;
}
.white{
  margin-bottom: 0;
}
.divBig{
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
}

.card{
  margin: 8px;
  background-color: white;
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
.display-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  background-color: white;
  width: fit-content;
}
#displayedGroups {
  display: table;
  margin: 10px auto;
}
.fullBanner {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
}
#displayedGroups{

}
#joinButt {
  background-color: white;
  border: 2px solid blue;
  color: blue;
  transition: all 0.25s ease-in-out;
}

#joinButt:hover {
  background-color: blue;
  border: 2px solid blue;
  color: white;
}
#submitButt:hover {
  background-color: #198754;
  border: 2px solid #198754;
  color: white;
}
#submitButt{
  background-color: white;
  border: 2px solid #198754;
  color: #198754;
  transition: all 0.25s ease-in-out;
  margin: 5px;
}

#cancelButt{
  background-color: white;
  border: 2px solid #6c757d;
  color: #6c757d;
  transition: all 0.25s ease-in-out;
  margin: 5px;
}
#cancelButt:hover {
  background-color: #6c757d;
  border: 2px solid #6c757d;
  color: white;
}
#leaveButt {
  background-color: white;
  border: 2px solid red;
  color: red;
  transition: all 0.25s ease-in-out;
}

#leaveButt:hover {
  background-color: red;
  border: 2px solid red;
  color: white;
}

#joinButt:hover {
  background-color: blue;
  border: 2px solid blue;
  color: white;
}

.popup {
  display: none;
  position: fixed;
  padding: 10px;
  object-fit: fill;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  margin-top: -100px;
  background: #FFF;
  border: 3px solid #F04A49;
  border-radius: 5px;
  z-index: 20;
  box-shadow: 0 0 10px 5px   rgba(240,74,73,.7);
}

</style>