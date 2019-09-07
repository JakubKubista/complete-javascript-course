import { constants } from '../utils/constants';

export const render = parent => {
  const loader = `
    <div class="${constants.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
}

export const clear = () => {
  const loader = document.querySelector(`.${constants.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
}