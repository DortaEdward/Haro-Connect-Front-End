<template>
  <div class='sign-up-container' v-if="!logIn">
      <form @submit.prevent="createUser" class='user-form'>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email"
          v-model="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email">
          <small
          id="emailHelp"
          class="form-text text-muted">
          We'll never share your email with anyone else.
          </small>
        </div>
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
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');

    const signUpReq = async () => {
      const signUpUrl = `${process.env.VUE_APP_BASE_APIURL}/auth/signup`;
      const response = await fetch(signUpUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json);
      }
    };

    return {
      email,
      username,
      password,
      signUpReq,
    };
  },
};
</script>

<style lang='scss'>
.sign-up-container{
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
