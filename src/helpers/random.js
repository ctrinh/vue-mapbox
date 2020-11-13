// generate random number by set the max and min
// min and max included
export const randomNumber = (min, max)=> {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
