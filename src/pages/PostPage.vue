<template>
  <div>
    ID = {{$route.params.id}}
    Likes = {{$store.state.likes}}
    <my-button @click="$store.commit('like')">Like</my-button>
    <my-button @click="$store.commit('dislike')">Dislike</my-button>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton}

}
</script>

<style scoped>

</style>