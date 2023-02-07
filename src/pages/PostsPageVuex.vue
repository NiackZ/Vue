<template>

  <div>
    <my-input v-focus
              :model-value="searchQuery"
              @update:model-value="setSearchQuery"
              placeholder="Поиск..."
    />
    <div class="app_btns">
      <my-button @click="show = true">
        Создать пост
      </my-button>
      <v-select :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="options"
      />
    </div>
    <v-dialog v-model:show="show">
      <post-form @create="createPost"></post-form>
    </v-dialog>
    <post-list v-if="!postLoading"
               :posts="sortedAndSearchedPosts"
               @removePost="removePost"></post-list>
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer">

    </div>
  </div>
</template>

<script>
import PostList from "@/components/VPostList/PostList.vue";
import PostForm from "@/components/VPostForm/PostForm.vue";
import VDialog from "@/components/UI/VModal.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import VSelect from "@/components/UI/VSelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {MyInput, VSelect, MyButton, VDialog, PostForm, PostList},
  data() {
    return {
      show: false,
    }
  },
  methods:{
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(item => item.id !== post.id)
    },

  },
  watch: {
    // instead of computed way
    // selectedSort(newVal) {
    //   this.posts.sort((p1, p2) => {
    //     return p1[newVal]?.localeCompare(p2[newVal])
    //   });
    // },
    'show': function(newVal) {
      console.log(newVal)
    }

  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      postLoading: state => state.post.postLoading,
      selectedSort: state => state.post.selectedSort,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPage: state => state.post.totalPage,
      options: state => state.post.options,
      searchQuery: state => state.post.searchQuery
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts"
    })

  }
}
</script>

<style>

.app_btns {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}
.observer {
  height: 30px;
  background: #000;
}
</style>