<template>
  <div id="app">
    <Bar />
    <router-view/>
  </div>
</template>

<script>
import Bar from "@/components/Bar.vue"

export default {
  components: {
    Bar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 60px 0;
}
</style>
