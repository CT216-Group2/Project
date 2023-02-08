<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" />
      </div>
      <div>
        <label for="college">College:</label>
        <input type="text" id="college" v-model="form.college" />
      </div>
      <div>
        <label for="course">Course:</label>
        <input type="text" id="course" v-model="form.course" />
      </div>
      <div>
        <label for="year">Year of Study:</label>
        <input type="number" id="year" v-model="form.year" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        college: "",
        course: "",
        year: "",
        email: ""
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Form Submitted!");
      console.log(this.form);
    }
  }
};
</script>



<style scoped>

</style>