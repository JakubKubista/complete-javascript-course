import Search from './models/Search';
import * as searchView from './views/searchView';
import base from './utils/base';
import * as loader from './views/loader';
import Recipe from './models/Recipe';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    loader.render(base.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();
      loader.clear();

      // 5) Render results on UI
      searchView.renderResults(state.search.recipes);

    } catch (error) {
        console.log(error);
        loader.clear();
    }
  }
}

base.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

base.searchResPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    // Prepare UI for changes
    // recipeView.clearRecipe();
    // renderLoader(elements.recipe);

    // Highlight selected search item
    // if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
        // Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        loader.render(base.recipeRes);

        // Render recipe
        loader.clear();
        // recipeView.renderRecipe(
        //     state.recipe,
        //     state.likes.isLiked(id)
        // );

    } catch (error) {
        console.log(error);
        loader.clear();
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
