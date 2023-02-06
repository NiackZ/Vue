<template>
  <div class="app">
    <my-input v-model="searchQuery"
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
    <div class="page_wrapper">
      <div v-for="pageNumber in totalPage"
           :key="pageNumber" class="page"
           :class="{
              'current_page': pageNumber === page
            }"
           @click="changePage(pageNumber)"
      >{{pageNumber}}</div>
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
      page: 1,
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
    changePage(pageNum) {
      this.page = pageNum;
    },
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(item => item.id !== post.id)
    },
    async fetchPosts(){
      try {
        this.postLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      }
      catch (e){
        alert(e);
      }
      finally {
        this.postLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts()
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
    },
    'page': function(){
      this.fetchPosts();
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
.app_btns {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}
.page_wrapper{
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid pink;
padding: 5px;
}
.current_page {
  background-color: dimgray;
}
</style>