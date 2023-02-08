<template>
  <v-header>
    <v-toolbar color="#790404">
      <v-toolbar-title>AccomodateMe</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-header>


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
          <v-text-field
           v-model="area"
           :rules="areaRules"
           label="Area"
           required
          ></v-text-field>

          <v-btn color="primary" @click="submit" :disabled="!valid">Sign Up</v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
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
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        // send data to server
      }
    }
  }
};
</script>