<template>
  <div id="map"></div>
</template>

<script>
import {  onMounted, watch } from 'vue'
import * as mapboxgl from 'mapbox-gl'
import { useMap } from './../shared';

export default {
  name: 'MapView',
  setup() {
    // set token for mapbox
    mapboxgl.accessToken = "pk.eyJ1IjoiZnJhY3RhdGVzdHMiLCJhIjoiY2tnaWd3NW10MDAzNDJzcnJuNzVrNGd5cSJ9.6pV_QFxNJE22pj4-uKCjpQ";

    let { colorBy, pipes, load, mapbox } = useMap();
    // let mapbox = null;

    /* Exmaple of async and wait for loading api */
    // onMounted(async () => { await load()});

    // When vue mounted add mapbox
    onMounted(() => {
      mapbox.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
        center: {lng: -122.2697585, lat: 37.5575135}, // starting position [lng, lat]
        zoom: 10 // starting zoom
      });

      // load pipe data. we can await for fetch data
      load()
    });

    // pipe color logic
    const colorLogic = (params)=> {
      // build array mapbox logic case
      const condition = ["case"];

      // set color logic to diamter.
      // the color get darker to light
      // base on the sort order
      // Year = old to new
      // diameter = small to big
      // merial = small number to big
      pipes.value.features.map((item)=> {
        return item.properties[params];
      }).filter((v, i, s)=> s.indexOf(v) === i).sort()
      .forEach((item, i, s)=> {
        condition.push(["==", ["get", params], item], `rgba(255,0,255,${(i+1)/s.length})`,)
      });
      condition.push("rgba(0,0,0,1)");

      console.log('params: ', params)
      // return array
      return condition;
    }

    // Add soruce data to mapbox
    const mapboxPipesSourceAdd = (newValue)=> {
      // add polygone to map
      mapbox.value.addSource('pipes', {
        'type': 'geojson',
        'data': newValue
      });

      // Get bound and fit the bound
      const bounds = new mapboxgl.LngLatBounds();
      newValue.features.forEach((item)=> {
        item.geometry.coordinates[0].forEach((coord)=> {
          bounds.extend(coord);
        })
      });
      mapbox.value.fitBounds(bounds, {
        padding: 20
      });

      // Default color style
      mapbox.value.addLayer({
          'id': 'line-pipes',
          'type': 'line',
          'source': 'pipes',
          'paint': {
            'line-color': '#aaa',
            'line-width': 4,
          }
      });
    }

    // watch when pipes data is update
    watch(pipes, (newValue)=>{
      const source = mapbox.value.getSource('pipes')

      if(source) { // if there are pipes source data in mapbox
        source.setData(newValue);

        // update color when add more date
        if(colorBy.value === 'year') {
          colorByType('year');
        }
      } else {

        if(mapbox.value.loaded()) { // if mapbox laoded
          mapboxPipesSourceAdd(newValue)
        } else {
          // mapbox not load it yet wait till mapbox load
          // and create source and apply layer
          mapbox.value.on('load', ()=>{
            mapboxPipesSourceAdd(newValue)
          });
        }
      }
    })

    // watch colorBy value changing
    watch(colorBy, (newValue) => {
      colorByType(newValue);
    })

    // apply the color by type
    const colorByType = (type)=> {
      switch(type) {
        case "year":
          mapbox.value.setPaintProperty('line-pipes', 'line-color', colorLogic('year') );
          break;
        case "diameter":
          mapbox.value.setPaintProperty('line-pipes', 'line-color', colorLogic('diameter') );
          break;
        case "material":
          mapbox.value.setPaintProperty('line-pipes', 'line-color', colorLogic('material_type_code') );
          break;
        default:
          mapbox.value.setPaintProperty('line-pipes', 'line-color', '#aaa');
          break;
      }
    }

    return { colorBy }
  }
}
</script>

<style scoped>
#map {
  height: 300px;
}
</style>
