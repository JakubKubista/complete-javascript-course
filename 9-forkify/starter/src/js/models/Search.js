import axios from 'axios';
import config from '../utils/config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(`
        ${config.apiProxy}https://www.food2fork.com/api/search?key=${config.apiKey}&q=${this.query}
      `);
      this.recipes = res.data.recipes;
    } catch (error) {
      console.log(error);
    }
  }
}