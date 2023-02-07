<template>
  <div>
    <my-input v-focus v-model="searchQuery"
              placeholder="Поиск..."
    />
    <div class="app_btns">
      <my-button @click="show = true">
        Создать пост
      </my-button>
      <v-select v-model="selectedSort"
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

export default {
  components: {MyInput, VSelect, MyButton, VDialog, PostForm, PostList},
  data() {
    return {
      posts: [],
      title: "",
      body: "",
      show: false,
      postLoading: true,
      selectedSort: "",
      page: 0,
      limit: 10,
      totalPage: 0,
      options: [
        { value: 'title', name: "По названию" },
        { value: 'body', name: "По содержимому" }
      ],
      searchQuery: ""
    }
  },
  methods:{
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(item => item.id !== post.id)
    },
    async loadMorePosts(){
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data]
        this.postLoading = false;
      }
      catch (e){
        alert(e);
      }
    }
  },
  mounted() {
    this.loadMorePosts();
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
    sortedPosts() {
      return [...this.posts].sort((p1, p2) => p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
    }
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