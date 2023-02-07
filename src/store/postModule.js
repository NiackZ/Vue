import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((p1, p2) => p1[state.selectedSort]?.localeCompare(p2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.includes(state.searchQuery))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.postLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async loadMorePosts({state, commit}){
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setPage', state.page + 1)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            }
            catch (e){
                alert(e);
            }
            finally {
                commit('setLoading', false)
            }
        }
    },
    namespaced: true

}