import {createStore} from "vuex";
import {postModule} from "@/store/postModule";

export default createStore({
    state: {
        likes: 1
    },
    getters: {

    },
    mutations: {
        like(state){
            state.likes += 1;
        },
        dislike(state){
            state.likes -= 1;
        }
    },
    actions: {

    },
    modules: {
        post: postModule
    }
})