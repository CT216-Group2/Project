<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <router-view></router-view>
  <body>
    <header id="header">
      <NavBar/>
    </header>
    <div id="content-wrap">

    </div>
    <footer id="footer">
      <Footer/>
    </footer>
  </body>
</template>

<style scoped>

</style>
