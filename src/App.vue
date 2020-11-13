<template>
  <ButtonsList />
  <MapView />
</template>

<script>
import MapView from './components/MapView.vue'
import ButtonsList from './components/ButtonsList.vue'

export default {
  name: 'App',
  components: {
    ButtonsList,
    MapView,
  }
}
</script>

<style>
/* Reset */
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Gloabl Style */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
