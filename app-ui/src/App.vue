<template>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 200px;
  background-image: linear-gradient(#1E1E2E,#1E1E25)
}
</style>
