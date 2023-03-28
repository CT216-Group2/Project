<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form ref="form" v-model="valid">
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
          <v-btn color="#790404" @click="register" :disabled="!valid"><a class="mainFont text-white">Sign Up</a></v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <div class="alert alert-danger alert-dismissible fade show"  id="createPopup" role="alert">
    <strong>Authentication Failed!</strong> USer already exists please check details
    <button type="button" class="close" data-dismiss="alert" @click="hide('createPopup')" aria-label="Close">
    </button>
  </div>
</template>

<script>
import {getFunctions, httpsCallable} from "firebase/functions";
import app from "@/api/firebase";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

export default {
  data(){
    return{
      valid: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 25 || "Name must be less than 25 characters"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be at least 6 characters"
      ]
    };
  },
  methods: {
    show(id) {
      document.getElementById(id).style.display = 'block';
    },
    hide(id) {
      document.getElementById(id).style.display = 'none';
    },
    postOwner() {
      const functions = getFunctions(app);
      const postOwner = httpsCallable(functions, 'postowner');
      postOwner({"name": this.name, "email": this.email}).then((result) => {
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
// ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            this.show('createPopup');
          });
    }
  }
};
</script>

<style scoped>
.alert{
  display: none;
}
</style>