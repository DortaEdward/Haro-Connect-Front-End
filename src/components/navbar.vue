<template>
  <nav class="navbar navbar-dark bg-dark nav nav-container">
    <router-link to="/" class="nav-link">
        <img class='nav-logo' src="../../public/logo.png" alt="">
    </router-link>
    <ul v-if='!loggedIn' class="nav justify-content-end">
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          Log In
        </router-link>
      </li>
      <li class="nav-item" >
        <router-link to="/signup" class="nav-link">
            Sign Up
        </router-link>
      </li>
    </ul>
    <ul v-if='loggedIn' class="nav justify-content-end logged-in">
      <!-- <li class="nav-item">
        <img
          src="https://drive.google.com/uc?id=17qamwkPahosjPPVqvSbLcmKzOKifQRon"
          alt=""
          class='profile-picture-icon'
        >
      </li> -->
      <li class="nav-item">
        <h5 class='nav-welcome'>Welcome, {{userData.username}}</h5>
      </li>
      <li class="nav-item" @click="clearToken" >
        <router-link to="/login" class="nav-link log-out">
            Log Out
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const loggedIn = computed(() => store.state.loggedIn);
    const userData = computed(() => store.state.userData);
    const clearToken = () => {
      store.state.loggedIn = false;
      localStorage.removeItem('tokken');
    };

    return {
      loggedIn,
      userData,
      clearToken,
    };
  },
};

</script>

<style lang='scss'>
.nav-logo{
    width:50px;
  }
.nav-container{
  padding:1rem 2rem;
}
li{
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item{
  display: flex;
  justify-content: center;
  align-items: center;
}
.username-display{
  display:flex;
  justify-content: center;
  align-items: center;
}
.nav-welcome{
  margin:0 0.5rem 0 0.5rem;
  color:white;
  transform: scale(0.98);
  font-size: 20 px;
}
.nav-item{
  font-weight: bold;
  .nav-link{
    color:white;
    transform: scale(0.98);
    font-size: 20 px;
  }
  .nav-link:hover{
    color:rgb(16, 211, 39);
    transform: scale(1);
  }
}
.profile-picture-icon{
  height:2.5rem;
  border-radius: 50%;
  transform:scale(0.9);
}
.profile-picture-icon:hover{
  cursor:pointer;
  transform:scale(1);
}
@media screen and (max-width: 375px){
  .nav-logo{
    width:35px;
  }
  .logged-in{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .log-out{
    font-weight: bold;
  }
}
@media screen and (max-width: 414px){
  .nav-logo{
    width:40px;
  }
  .logged-in{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .log-out{
    font-weight: bold;
  }
}
</style>
