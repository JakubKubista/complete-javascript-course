import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './utils/base';
import * as loader from './views/loader';

/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    loader.render(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();
    loader.clear();

    // 5) Render results on UI
    searchView.renderResults(state.search.results);
  }
}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
  }
});