<template>
  <div id="app">
    <twitter-header></twitter-header>
    <router-view/>
  </div>
</template>

<script>
import TwitterHeader from './components/TwitterHeader'
export default {
  name: 'App',
  components : {
    TwitterHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
