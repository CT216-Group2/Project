
<template>
  <h1>Welcome to my blog page</h1>
  <p>This is my blog page for my SaaS app</p>
  <div class="container">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" v-model="handle" class="form-control" id="exampleFormControlInput1"
             placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
      <textarea class="form-control" v-model="comment" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
  <div class="mb-3 right">
    <button type="button" @click="postComment" class="btn btn-primary">Post comment</button>
  </div>
  </div>
</template>

<script>
import app from '../api/firebase'
import { getFunctions, httpsCallable } from "firebase/functions";

export default {
  name: "Blog",
  data() {
    return{
      handle:"",
      comment:""
    }
  },
  methods : {
    postComment(){
      console.log(this.handle);
      console.log(this.comment);
    }
  }
}
</script>