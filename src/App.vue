<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <body>
    <header id="header">
      <NavBar/>
    </header>
    <div id="content-wrap">
      <router-view></router-view>
    </div>
    <footer id="footer">
      <Footer/>
    </footer>
  </body>
</template>

<style scoped>

#content-wrap{

}
</style>
