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
  background-image: url("src/components/icons/img.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 150vw;
  height: 150vh;
  margin: -2.5vw;
}
.head{
  width: 100vw;
  background: #FFFFFFcc;
  margin-top: 0;
  padding-top: 0;
  top: 100px;
  left: 0;
  position: absolute;
}
</style>