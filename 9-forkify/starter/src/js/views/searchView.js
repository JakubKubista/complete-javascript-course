import base from '../utils/base';
import * as pagination from './components/pagination';

export const getInput = () => base.searchInput.value;

export const clearInput = () => base.searchInput.value = '';

export const clearResults = () => {
  base.searchResList.innerHTML ='';
  base.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];

    // create array from string via split
    title.split(' ').reduce((accumulator, element) => {
      // adding whole words instead of cut string sentense
      if (accumulator + element.length <= limit) newTitle.push(element);
      return accumulator + element.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

// // Another approach how to show titles
// const limitRecipeTitleDots = (title, limit = 17) => {
//   return title.length > limit ? title.substring(0, limit) + '...' : title;
// }

const renderRecipe = recipe => {
  const markup = `
  <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
  `;
  base.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (recipes, page = 1, count = 10) => {
  const start = (page - 1) * count;
  const end = page * count;
  recipes.slice(start, end).forEach(renderRecipe);
  pagination.renderButtons(page, recipes.length, count);
}

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(element => element.classList.remove('results__link--active'));
  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}