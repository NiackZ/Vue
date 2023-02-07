<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar_bnts">
      <my-button style="margin-left: 15px" @click="$router.push('/')">Главная</my-button>
      <my-button style="margin-left: 15px" @click="$router.push('/posts')">Посты</my-button>
      <my-button style="margin-left: 15px" @click="$router.push('/store')">Посты Vuex</my-button>
      <my-button style="margin-left: 15px" @click="$router.push('/about')">О сайте</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import router from "@/router/router";

export default {
  methods: {
    router() {
      return router
    }
  },
  components: {MyButton}

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: deepskyblue;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
}
.navbar_bnts{
  margin-left: auto;
}
</style>