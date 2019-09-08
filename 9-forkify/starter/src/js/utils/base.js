import constants from './constants';

export default {
  searchForm: document.querySelector(`.${constants.search}`),
  searchInput: document.querySelector(`.${constants.searchField}`),
  searchRes: document.querySelector(`.${constants.results}`),
  searchResList: document.querySelector(`.${constants.resultsList}`),
  searchResPages: document.querySelector(`.${constants.resultsPages}`),
  recipeRes: document.querySelector(`.${constants.recipe}`)
};