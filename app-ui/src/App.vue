<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body {
  margin: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  background-image: linear-gradient(#1E1E2E, #1E1E25);
  background-size: cover;
  height: 100vh;
}

@media only screen and (max-width: 600px) {
  #app {
    height: 100%;
  }
}
</style>
