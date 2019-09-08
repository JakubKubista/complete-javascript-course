import axios from 'axios';
import config from '../utils/config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `${config.apiProxy}https://www.food2fork.com/api/get?key=${config.apiKey}&rId=${this.id}
      `);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    const periods = Math.ceil(this.ingredients.length / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(element => {
      // 1) Uniform units - all of them should be the same
      let ingredient = element.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el => units.includes(el));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // '4 1/2 cups' => arrCount: [4, 1/2]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          // eval = evaluate string as js code
          // e.g. 4+1/2 = 4,5
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex+1).join(' ')
        }

      } else if (parseInt(arrIng[0],10)) {
        // No unit, but 1st el is a number
        objIng = {
          count: parseInt(arrIng[0],10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // No unit
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}