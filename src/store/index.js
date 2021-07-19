import { createStore } from 'vuex';

export default createStore({
  state: {
    loggedIn: false,
    userData: null,
    posts: null,
  },
  getters: {
    // postsByDate(state) {
    //   return state.posts.sort((a,b) => a-b),
    // }
  },
  actions: {
    async getUserData({ state }) {
      if (localStorage.tokken) {
        const url = `${process.env.VUE_APP_BASE_APIURL}/`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.tokken}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          state.userData = await json.user;
        }
      }
    },
    async getPosts({ state }) {
      if (localStorage.tokken) {
        const url = `${process.env.VUE_APP_BASE_APIURL}/api/v1/posts`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.tokken}`,
          },
        });
        const json = await response.json();
        state.posts = json.posts;
      }
    },
  },
});
