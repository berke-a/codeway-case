<template>
  <header>
    <img src="./assets/icon.png" alt="App Icon" class="header-icon">
  </header>
  <ConfigurationsTable/>
</template>

<script>
import ConfigurationsTable from './components/ConfigurationsTable.vue'

export default {
  name: 'App',
  components: {
    ConfigurationsTable
  }
}
</script>

<style>
body { margin: 0 !important; }
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header-icon {
  width: 3vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  background-image: linear-gradient(#1E1E2E,#1E1E25)
}
</style>
