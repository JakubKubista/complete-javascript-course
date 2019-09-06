import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'f1a5ebbe9bf13dd92e1f27cd9aa97af3';
    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      this.results = res.data.recipes;
    } catch (error) {
      alert(error)
    }
  }
}