<template>
  <h1>Welcome to my new Blog page</h1>
  <p>This is my very first blog entry</p>
  <div>
    <input type="file" id="photo" />
    <button id="upload" onclick="uploadImage()">Upload Image</button>
  </div>
  <div class="container">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" v-model="handle" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
      <textarea class="form-control" v-model="comment" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="mb-3 right">
      <button type="button" @click="postComment" class="btn btn-primary">Post Comment</button>
    </div>
    <div class="mb-3 right">
      <button type="button" @click="getComments" class="btn btn-primary">Show Comments</button>
    </div>
    <div v-if="commentsArray.length > 0">
      <ul id="array-rendering">
       <li v-for="comment in commentsArray">
         <b>{{ comment.data.comment }}</b>
         <button type="button" @click="deleteComment(comment.id)" class="btn btn-primary">Delete Comment</button>
       </li>
      </ul>
    </div>
  </div>

</template>
<script>
import firebase from '../api/firebase';
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
export default {
  data() {
    return {
      handle: '',
      comment: '',
      commentsArray:[]
    }
  },
  methods : {
    postComment() {
      const functions = getFunctions(app);
      const postComment = httpsCallable(functions, 'postcomment');
      postComment({"handle": this.handle, "comment": this.comment}).then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        this.getComments();
      });
    },
    getComments() {
      const functions = getFunctions(app);
      const getComments = httpsCallable(functions, 'getcomments');
      getComments().then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        this.commentsArray = result.data;
      });
    },
    deleteComment(id){
      const functions = getFunctions(app);
      const deleteComment = httpsCallable(functions, 'deletecomment?id='+id);
      deleteComment().then((result) => {
        if(result.data === "Document successfully deleted")
          this.getComments();
      }); // To refresh the client
    }
  }
}
console.log(firebase);
function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];
  const name = +new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        alert('image uploaded successfully');
        document.querySelector("#image").src = url;
      })
      .catch(console.error);
}
</script>
<style scoped>
.right{
  text-align: right;
}
#photo{
  margin-top: 200px;
  margin-left: 450px;
}
#upload{
  margin-top: 20px;
  margin-left: 450px;
}
</style>