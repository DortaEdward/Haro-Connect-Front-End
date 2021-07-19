<template>
  <div class="user-form-container">
    <div class='log-in-container'>
      <form @submit.prevent="logInReq" class='user-form'>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
        v-model='username'
        type="username"
        class="form-control"
        placeholder="Enter Username">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">
          Password
        </label>
        <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();
    const userData = computed(() => store.state.userData);

    const logInReq = async () => {
      const loginUrl = `${process.env.VUE_APP_BASE_APIURL}/auth/login`;
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });
      const { tokken } = await response.json();
      if (response.ok) {
        localStorage.tokken = tokken;
        store.state.loggedIn = true;
        router.push({ name: 'Home' });
      }
    };

    return {
      username,
      password,
      logInReq,
      userData,
    };
  },
};
</script>
<style lang='scss'>
.user-form-container{
  margin: 0 auto;
  width: 40vw;
}
.form-group{
  margin:1rem 0;
}
.user-form{
  margin:3.5rem 0;
}
</style>
