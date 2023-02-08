<template>
  <body>
  <div class="head">
    <h1 class="mainFont " style="text-align: center">Our Goal at Accommodate<a class="secondaryColour">Me</a> is to bring landlords and students together on one platform.</h1>
  </div>
  </body>


</template>

<script>
export default {
  name: "Home.vue"
}
</script>

<style scoped>
body {
  background-image: url("src/components/icons/House.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  margin: -2.5vw;
}
.head{
  background: #FFFFFFcc;
  margin-top: 0%;
  padding-top: 0%;
  top: 32px;
  left: 0;
  position: absolute;
}
</style>