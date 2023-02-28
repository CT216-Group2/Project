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

          <v-btn color="#790404" @click="submit()" :disabled="!valid"><a class="mainColour mainFont">Sign Up<</a></v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
    submit() {
      this.$refs.form.validate();
      if (this.valid) {

        }
      }
    }
}
</script>

<style scoped>

</style>