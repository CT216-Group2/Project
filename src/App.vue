<template>
  <router-view></router-view>
  <NavBar />
</template>

<script>
import NavBar from "@/components/Nav-bar";
export default {
  components: {NavBar}
}

</script>

<style scoped>
header{
  line-height: 10;
  color: #790404;
}

footer{
  line-height: 10;
  color: #790404;
}
</style>
