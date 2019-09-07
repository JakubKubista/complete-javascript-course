import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
    this.results = null;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '6db1bb8c66a79e6fe93c780b254a23bd';
    try {
      const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      this.results = res.data.recipes;
    } catch (error) {
      alert(error)
    }
  }
}