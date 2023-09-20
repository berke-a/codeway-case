<template>
    <div>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
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
  </style>

  