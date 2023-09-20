<template>
  <div class="login">
    <img src="../assets/icon.png" alt="App Icon" class="header-icon">
    <h2>Please sign in</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="doLogin">Sign in</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <footer> Codeway © 2021 </footer>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async doLogin() {
      const result = await this.login({ email: this.email, password: this.password });
      if (result.success) {
        this.$router.push({ path: '/configurations' });
      } else {
        this.errorMessage = result.message;
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 20rem;
}

h2 {
  color: #32325D;
  font-weight: lighter;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
}

input {
  border: 1px solid #E14DCA;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  background-image: linear-gradient(#1E1E2E, #1E1E25);
  width: 20rem;
  color: #FFFF;
}

button {
  margin: 10px;
  padding: 10px 40px;
  width: 20rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-image: linear-gradient(45deg, #3A4FBE, #5E78F9);
  color: #FFFF;
  font-weight: bold;
}

footer {
  margin-top: 20px;
  color: #69727A;
  font-size: small;
}</style>

  