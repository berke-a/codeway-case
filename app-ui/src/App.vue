<template>
  <header>
    <img src="./assets/icon.png" alt="App Icon" class="header-icon">
  </header>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body { margin: 0 !important; }
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.header-icon {
  width: 2rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  background-image: linear-gradient(#1E1E2E,#1E1E25);
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
