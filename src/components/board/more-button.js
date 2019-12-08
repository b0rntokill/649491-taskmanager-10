import {createElement} from './../../utils.js';

const createBoardMoreButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class MoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
