<template>
<div class="fullPage">
  <div class="align-content-center"  style=" position: absolute; box-sizing: border-box; width: 500px;
              height: 500px; background: white; border-radius: 15px; margin:10px;
              border-width: 10px; border-color: #00bd7e; " >

    <form class="login">
      <div>
        <h1 style="color: black; font-size: 40px; font-family: Roboto Slab ;  " class="h2 mb-3 mt-5 fw-normal">STUDENT LOGIN</h1>
      </div>
      <hr style="width:50%; height: 10px; border: 5px cadetblue"/>

      <input class="inputone" v-model="email" type="email" placeholder="Email" required autofocus >

      <input class="inputone" v-model="password" style="margin-top: 15px; margin-bottom: 15px;" type="password" placeholder="Password">





      <button  @click.prevent="login()" class="btn btn-lg btn-primary btn-block mt-5">LOG IN</button>
      <br>
      <span class="forgot-password-link" @click.prevent="sendPasswordEmail()">Forgot Password?</span>
      <span class="sign-up-link" @click="this.$router.push({path: '/StudentSignUp'})">Don't have an account? Sign Up Here!</span>


    </form>
  </div>
</div>

</template>
<script>
import app from "../api/firebase"
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {getFunctions, httpsCallable} from "firebase/functions";
export default {
  name: "StudentLogin",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
// Signed in
        let user = userCredential.user;
        console.log(user);
        this.checkEmail();
      }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    },
    checkEmail(){
      const functions = getFunctions(app);
      const checkEmail = httpsCallable(functions, 'checkEmail');
      checkEmail().then((result) => {
        console.log(result.data);
        if(result.data.includes(this.email)){
          this.$router.push({path: 'StudentAccount'});
        }else{
          console.log("Wrong Login Page");
        }
      });
  },
    sendPasswordEmail(){
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
          .then(() => {
            // Password reset email sent!
            // ..
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }
  }
}
</script>
<style>
input[type="checkbox"]{
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 36px;
  background-color: #cccccc;
  border-radius: 50px;
  position:absolute;
  margin:auto;
  top:0;
  bottom:0;
  left:0;
  right:0;
  cursor: pointer;
  outline:none;
  transition: 0.3s;
}
input[type="checkbox"]:before{
  content:"";
  position: absolute;
  height:16px;
  width:16px;
  background-color:#f2f2f2;
  border-radius: 50%;
  left:2px;
  top:2px;
  transition: 0.3s;
}
input[type="checkbox"]:after{
  content:"";
  position: absolute;
  color: #f2f2f2;
  left:38px;
  bottom: -5px;
  transition: 0.3s;
}
input[type="checkbox"]:checked{
  background-color: #790404;
}
input[type="checkbox"]:checked:before{
  background-color: #f2f2f2;
  left:18px;
}
input[type="checkbox"]:checked:after{
  content:"";
  color:#790404;
}
.fullPage{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login{
  max-width: 480px;
  margin: auto;
  display: flex;
  flex-direction:column;
  align-items: center;
}
.inputone{
  border: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 3px;
  width: 250px;
  outline: none;
  background:
      linear-gradient(90deg, #ccc,#ccc) left bottom/100% 2px no-repeat,
      linear-gradient(90deg, #fafafa, #fafafa) left bottom/100% no-repeat;
}
.inputone:focus::placeholder {
  color: transparent;
}
.inputone::placeholder {
  color: #222;
  transition: color 0.3s ease;
}
.grid{
  display: grid;
  place-items: center;
}
label{
  display: inline-block;
}
.btn-block{
  display: block;
  width:250px;
}
.btn-primary{
  background-color: #790404;
  border-color: #790404;
}
.toggle span{
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  display: block;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  transition: all .2s ease;
}
.toggle span:before {
  content: "";
  position: absolute;
  display: block;
  margin: -18px;
  width: 56px;
  height: 56px;
  background: rgba(255, 123, 176, 0.5);
  border-radius: 50%;
  transform: scale(0);
  opacity: 1;
  pointer-events: none;
}
.forgot-password-link {
  color: rgb(16, 152, 197);
  text-decoration: underline;
  cursor: pointer;
}
.forgot-password-link:hover {
  text-decoration: none;
}
.sign-up-link{
  color: rgb(16, 152, 197);
  text-decoration: underline;
  cursor: pointer;
}
.sign-up-link:hover{
  text-decoration: none;
}
</style>