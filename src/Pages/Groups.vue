<template>
<div>
  <button type="button" class="btn mainColour mainFont" @click="show('createPopup')"><p class="white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
  </svg>
    Create Group</p>
  </button>
  <div class="popup" id="createPopup">
    <form>
      <div class="form-group">
        <label for="groupName">Group Area</label>
        <input  class="form-control" id="groupName" v-model="area" placeholder="Enter desired area if any">
      </div>
      <div class="form-group">
        <label for="size">Size</label>
        <input  class="form-control" id="size" v-model="size" placeholder="Number of members">
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="create();hide('createPopup')">Submit</button>
    </form>
  </div>
</div>
  <div v-if="groupsArray.length > 0">
    <ul>
      <li v-for="Group in groupsArray">
        <div>
          <p>Area:<span>{{Group.data.area}}</span></p>
          <p>Size:<span>{{Group.data.size}}</span></p>
        </div>
        <div >
          <button type="button"  @click="leavegroup(Group.id)" class="btn btn-primary">Leave Group</button>
        </div>
        <div >
          <button type="button"  @click="joingroup(Group.id)" class="btn btn-primary">Join Group</button>
        </div>
      </li>
    </ul>
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
      likedEmailsArray:[],
      groupMembers:[],
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
    this.getGroupMembers();
    this.displayGroupLikes();
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
      create({"area": this.area, "size": this.size, "user": this.handle}).then((result) => {
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

    /*getGroupMembers(){
      this.getGroups().then((result) => {
    // Filter data to store only group members in a new array
    this.groupMembers = result.data.map((group) => {
       this.groupMembers = group;
    });
    });

    console.log(groupMembers);
  },*/

  getGroupMembers() {

    const functions = getFunctions(app);
    const getGroupMembers = httpsCallable(functions, 'getgroupmembers');
    getGroupMembers().then((result) => {
    console.log(result.data);
    this.groupMembers = result.data;
});
},


    joingroup(id){
      const functions = getFunctions(app);
      const joingroup = httpsCallable(functions, 'joingroup?id=' + id);
      joingroup({ members : this.handle }).then((result) => {
        this.getGroups();
      });
    },
    leavegroup(id){
      const functions = getFunctions(app);
      const leavegroup = httpsCallable(functions, 'leavegroup?id=' + id);
      leavegroup({ members : this.handle }).then((result) => {
        this.getGroups();
      });
    },

    getEmailOfLikes(){
      const functions = getFunctions(app);
      const getEmailOfLikes = httpsCallable(functions, 'getemailoflikes');
      getEmailOfLikes().then((result) => {
        console.log(result.data);
        this.likedEmailsArray = result.data;
      });
    },

    
    

    displayGroupLikes(){
      this.getEmailOfLikes();
      this.getGroupMembers();
      for(let i = 0; i < this.groupMembers; i++){
        if(this.likedEmailsArray[i] === this.groupMembers[i]){
          console.log(this.groupMembers[i] + " liked this house");
        }
        else{
          console.log("No group members have liked a house");
        }
      }
    }

  }
  }
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

</style>