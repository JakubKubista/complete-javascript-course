
import axios from 'axios';

async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = 'f1a5ebbe9bf13dd92e1f27cd9aa97af3';
  try {
    const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`)
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error)
  }
}
getResults('pizza');