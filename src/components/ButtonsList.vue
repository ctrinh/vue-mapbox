<template>
  <div class="button-group">
    <p>Color Pipe by:</p>
    <button :class="{'active': colorBy === 'none'}" @click="updateState('none')">Default</button>
    <button :class="{'active': colorBy === 'year'}" @click="updateState('year')">Year</button>
    <button :class="{'active': colorBy === 'diameter'}" @click="updateState('diameter')">Diameter</button>
    <button :class="{'active': colorBy === 'material'}" @click="updateState('material')">Material</button>

    <p>Color a random pipe’s year between 1960 - 2020</p>
    <button @click="updateRandomPipeYear()">Random Year</button>
  </div>
</template>

<script>
import { useMap } from './../shared';

export default {
  name: 'ButtonsList',
  setup() {
    let { colorBy, updateState, updateRandomPipeYear } = useMap();

    return { colorBy, updateState, updateRandomPipeYear };
  }
}
</script>

<style scoped>
.button-group {
  margin: 1em 0;
  text-align: center;
}

p {
  margin-bottom: 0.25em;
}

button {
  margin: 0 0.5em 1em 0.5em;
  padding: 0.5em 1em;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  cursor: pointer;
}

button:hover, button.active {
  background: #ccc;
}
</style>
