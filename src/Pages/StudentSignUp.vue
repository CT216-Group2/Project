<template>


  <v-container class="fullPage">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form ref="form" v-model="valid">
          <h1 style="text-align: center;">Student Sign Up</h1>
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
              v-model="collegeName"
              :rules="collegeNameRules"
              label="College Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="courseName"
              :rules="courseNameRules"
              label="Course Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="yearOfStudy"
              :rules="yearOfStudyRules"
              label="Year of Study"
              required
          ></v-text-field>
          <v-btn color="#790404" @click="register" :disabled="!valid"><a class="text-white ">Sign Up</a></v-btn>
          <br>
          <span class="login-link" @click="this.$router.push({path: '/StudentLogin'})">Already have an account? Log In Here!</span>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from "firebase/auth";
export default{
  name: "StudentSignUp",
  data() {
    return {
      valid: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
      collegeName: "",
      courseName: "",
      yearOfStudy: "",
      studentArray:[],
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
      collegeNameRules: [
        v => !!v || "College name is required",
        v => v.length <= 20 || "College name must be less than 20 characters"
      ],
      courseNameRules: [
        v => !!v || "Course name is required",
        v => v.length <= 20 || "Course name must be less than 20 characters"
      ],
      yearOfStudyRules: [
        v => !!v || "Year of study is required",
        v => /^[0-9]+$/.test(v) || "Year of study must be a number"
      ]
    };
  },
  methods: {
    postStudent() {
      const functions = getFunctions(app);
      const postStudent = httpsCallable(functions, 'poststudent');
      postStudent({"name": this.name, "email": this.email, "collegeName": this.collegeName, "courseName":this.courseName, "Year": this.yearOfStudy}).then((result) => {
      });
    },
    register(){
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
// Signed in
            const user = userCredential.user;
            console.log(user)
            this.postStudent();
            this.$router.push({path: '/StudentAccount'})

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
    },


  }}
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
.fullPage{
  font-family: Roboto Slab, serif;
}
</style>