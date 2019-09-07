import { constants } from './constants';

export const elements = {
  searchForm: document.querySelector(`.${constants.search}`),
  searchInput: document.querySelector(`.${constants.searchField}`),
  searchRes: document.querySelector(`.${constants.results}`),
  searchResList: document.querySelector(`.${constants.resultsList}`)
};
