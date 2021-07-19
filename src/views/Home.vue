<template>
  <div class="home">
    <div v-if='!userLoggedIn'>
      <h2 class='landing-title py-4'>Haro Connects</h2>
      <div class="content-container py-2">
        <div class="not-logged-in">
          <div class="landing-img">
            <img
            src="@/../public/landingPicture.png"
            alt="landing page img"
            class='landing-page-img'>
          </div>
          <div class="landing-content">
            <p>Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              Morbi tempus iaculis urna id. Nec dui nunc
              mattis enim ut tellus elementum sagittis.
              Cursus mattis molestie a iaculis at erat
              pellentesque.</p>
            <router-link to="/login" class="">
              <button type="button" class="btn btn-success">Log In</button>
            </router-link>
            <router-link to="/signup" class="">
              <button type="button" class="btn btn-warning">Sign Up</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if='userLoggedIn' class='container'>
      <div class="create-post-container">
        <form @submit.prevent="createPost">
          <div class="form-group">
            <input
            v-model="postContent"
              class="form-control"
              rows="2"
              placeholder="What's on your mind" />
            <button type="submit" class="btn btn-primary mt-2">Submit</button>
          </div>
        </form>
      </div>
      <div
        v-for='post in posts'
        :key='post._id'
        class="card post-card">
        <p class='card-text post-text'>{{post.content}}</p>
        <p class='card-subtitle mt-2 post-author'>Author: {{post.author || 'none'}}</p>
        <div
          class="options"
          v-if="post.author === userData.username">
          <router-link
          :to="{
          name:'PostUpdate',
          params:{postId:post._id}
          }">
          <small class='update-btn'>Update Post</small>
          </router-link>
          <small @click="deletePost(post._id)" class='delete-btn'>Delete Post</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  computed,
  ref,
} from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const postContent = ref('');
    const store = useStore();
    const userLoggedIn = computed(() => store.state.loggedIn);
    const posts = computed(() => store.state.posts);
    const userData = computed(() => store.state.userData);

    onBeforeMount(() => {
      if (localStorage.tokken) {
        store.state.loggedIn = true;
      }
    });
    onMounted(() => {
      store.dispatch('getPosts');
      store.dispatch('getUserData');
    });
    const deletePost = async (id) => {
      const createUrl = `${process.env.VUE_APP_BASE_APIURL}/api/v1/posts/delete/${id}`;
      const response = await fetch(createUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.tokken}`,
          'content-type': 'application/json',
        },
      });
      if (response.ok) {
        store.dispatch('getPosts');
      }
    };
    const createPost = async () => {
      const createUrl = `${process.env.VUE_APP_BASE_APIURL}/api/v1/posts/create`;
      const response = await fetch(createUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.tokken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          content: postContent.value,
        }),
      });
      if (response.ok) {
        store.dispatch('getPosts');
        postContent.value = '';
      }
    };

    return {
      posts,
      userLoggedIn,
      postContent,
      createPost,
      userData,
      deletePost,
    };
  },
};
</script>
<style lang='scss'>
.home{
  padding-top:1rem;
}
.not-logged-in{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.landing-page-img{
  height: 45vh;
}
.landing-content{
  width:45vw;
  .btn{
    transform:scale(0.9);
  }
  .btn:hover{
    transform:scale(1);
  }
}
.landing-img, .landing-content{
  margin: 0 1rem;
  padding: 0 1rem;
}
.btn-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  button{
    margin: 0 2rem;
    width:8rem;
  }
}
.create-post-container{
  border:1px solid black;
  display: flex;
  flex-direction: column;
  input{
    text-align: center;
  }
}
.create-post-container, .post-card {
  background-color:white;
}
.post-card{
  margin:0.4rem 0;
  padding:1rem 0;
  text-decoration: none;
  color:black;
}
.post-card:hover{
  color:black;
}
.post-text{
  font-size: 20px;
  font-weight: 450;
}
.options{
  margin:0.4rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-btn, .update-btn{
  padding:0.5rem;
  border: 1px solid;
  border-radius:10px;
}
.delete-btn{
  border: 1px solid red;
  color:red;
}
@media screen and (max-width: 375px) {
  .not-logged-in {
    display: flex;
    flex-direction: column;
    .landing-title{
      margin:1rem auto;
    }
    .landing-page-img{
      width:90px;
      height:90px;
      margin-bottom:2rem;
    }
    .landing-content{
      width:350px;
    }
  }
}
@media screen and (max-width: 414px) {
  .not-logged-in {
    display: flex;
    flex-direction: column;
    .landing-title{
      margin:1rem auto;
    }
    .landing-page-img{
      width:90px;
      height:90px;
      margin-bottom:2rem;
    }
    .landing-content{
      width:350px;
    }
  }
}
</style>
