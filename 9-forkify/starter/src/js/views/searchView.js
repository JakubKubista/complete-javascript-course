import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => elements.searchResList.innerHTML ='';

const limitRecipeTitleDots = (title, limit = 17) => {
  return title.length > limit ? title.substring(0, limit) + '...' : title;
}

const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];

    // create array from string via split
    title.split(' ').reduce((count, element) => {
      // adding whole words instead of cut string sentense
      if (count + element.length <= limit) newTitle.push(element);
      return count + element.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

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
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => recipes.forEach(renderRecipe);