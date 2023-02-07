<template>
  <v-navbar></v-navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import VNavbar from "@/components/VNavbar/VNavbar.vue";

export default {
  components: {VNavbar}
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
form {
  display: flex;
  flex-direction: column;
}
.app{
  padding: 10px;;
}
</style>