import { ref, reactive, toRefs} from 'vue'
import pipesData from './../assets/pipes.json'
import { randomNumber } from './../helpers';

/* Set Init State */
const state = reactive({
  colorBy: 'none',
  pipes: null,
})

// Store mapbox object in case other componenets need to access it
const mapbox = ref(null);

export function useMap() {

  /* Example of api Call */
  // const load = async ()=> {
  //   try {
  //     let res = await fetch("https://restcountries.eu/rest/v2/all");
  //     return res.json();
  //   } catch(err) {
  //     console.error('useMap load: ', err);
  //   }
  // }

  /* Load the pipes json data file.
    This is where you can replace api call
  */
  const load = ()=> {
    state.pipes = pipesData;
  }

  // Update state type for color
  const updateState = (type)=> {
    state.colorBy = type;
  }

  // update a random pipe's year between 1960 to 2020
  const updateRandomPipeYear = ()=> {
    const data = state.pipes;
    const randomYear = randomNumber(1960, 2020);
    const randomPipes = randomNumber(0, state.pipes.features.length-1);
    data.features[randomPipes].properties.year = randomYear;
    state.pipes = Object.assign({}, state.pipes, data);
  }

  return {
    ...toRefs(state),
    mapbox,
    load,
    updateState,
    updateRandomPipeYear,
  };
}
