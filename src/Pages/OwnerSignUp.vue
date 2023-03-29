<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form ref="form" v-model="valid">
          <h1 style="text-align: center;">Owner Sign Up</h1>
          <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
          ></v-text-field>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (showPassword = !showPassword)"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              required
          ></v-text-field>
          <v-text-field
              v-model="area"
              :rules="areaRules"
              label="Area"
              required
          ></v-text-field>

          <v-btn color="#790404" @click="register" :disabled="!valid"><a class="mainFont text-white">Sign Up</a></v-btn>
          <br>
          <span class="login-link" @click="this.$router.push({path: '/OwnerLogin'})">Already have an account? Log In Here!</span>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getFunctions, httpsCallable} from "firebase/functions";
import app from "@/api/firebase";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from "firebase/auth";

export default {
  data(){
    return{
      valid: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
      area: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be at least 6 characters"
      ],
      areaRules: [
        v => !!v || "Area name is required",
        v => v.length <= 20 || "Area name must be less than 20 characters"
      ]
    };
  },
  methods: {
    postOwner() {
      const functions = getFunctions(app);
      const postOwner = httpsCallable(functions, 'postowner');
      postOwner({"name": this.name, "email": this.email, "area": this.area}).then((result) => {
      });
    },
    register(){
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
// Signed in
            const user = userCredential.user;
            console.log(user)
            this.postOwner();
            this.$router.push({path: '/OwnerAccount'})

            sendEmailVerification(user)
            .then(() => {
             // Email verification sent!
            // ...
             });
// ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
// ..
          });
    }
  }
};
</script>

<style scoped>
.login-link{
  color: rgb(16, 152, 197);
  text-decoration: underline;
  cursor: pointer;
}

.login-link:hover{
  text-decoration: none;
}
</style>